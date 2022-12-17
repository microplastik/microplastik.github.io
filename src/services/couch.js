const axios = require('axios');
const uuid = require('uuid/v1');

const config = require("../config.json")
const couch_url = `${config.couch_host}`

export default class Couch {
  constructor (props) {
    this.props = props
    this.auth_headers = {}
    this.search = (_q) => {
    	return new Promise(resolve=>{

    	})
    }
    this.get = (type, id) => {
    	return new Promise((resolve, reject)=>{
            axios(
            {
                url:`${couch_url}/${id}/${type}`,
                method:"get",
                withCredentials: true
            })
            .then(res=>resolve(res.data))
            .catch((e, res)=>{
                var err = "500"
                if(e.toString().search("404") > -1) err = 404
                resolve(err)
            })
        })
    }
    this.auth = () => {
        return new Promise((resolve, reject)=>{
            axios({
                url:`${couch_url}/_session`,
                method: "get",
                withCredentials: true
            }).then((res)=>{
                this._session = res.data
                resolve()
            }).catch(reject)
        })
    }
    this.set = (type, id, _data) => {
        return new Promise((resolve, reject)=>{
            const write = () => {
                axios({
                    url:`${couch_url}/${id}/${type}`,
                    method:"put",
                    data:_data,
                    withCredentials: true
                })
                .then(res=>{
                    // console.info('==== after write ====')
                    return resolve(res.data)
                })
                .catch((e, res)=>{
                    var err = "500"
                    if(e.toString().search("404") > -1) err = 404
                    resolve(err)
                })
            }

            this.get(type, id).then((_c)=>{
                if(_c.rev || _c._rev) {
                    _data._rev = _c._rev
                    var dkeys = Object.keys(_c)
                    for (var i = 0; i < dkeys.length; i++) {
                        if(!_data[dkeys[i]]) _data[dkeys[i]] = _c[dkeys[i]]
                    }
                    delete _data._id;
                    delete _data.rev;
                }
                write()
            })
            .catch(()=>write())
        })
    }
    this.del = (type, id) => {
        return new Promise((resolve, reject)=>{
            var _data = {}
            this.get(id,type).then((_c)=>{
                _data._id = _c._id
                _data._rev = _c._rev
                _data._deleted = true
                const _d = {docs:[_data]}
                axios({
                    url:`${couch_url}/${type}/_bulk_docs`,
                    method:"post",
                    data:_d,
                    withCredentials: true
                })
                .then(res=>resolve(res.data))
                .catch((e, res)=>{
                    var err = "500"
                    if(e.toString().search("404") > -1) err = 404
                    reject(err)
                })
            })
        })
    }
    this.createPublicProfile = () => {
        return new Promise(resolve=>{
            if(!this.props.auth.loggedIn()) return resolve()
            this.get("profile", this.props.app_auth.email_name).then((_p)=>{
                resolve()
            })

        })
    }
    this.loadMyCollection = () => {
        return new Promise(resolve=>{

            if(!this.props.app_auth || !this.props.app_auth.email_name) {

                clearTimeout(this.loadCollectionService);
                this.loadCollectionService = setTimeout(()=>{
                    this.loadMyCollection().then(resolve)
                }, 300);
                return;

            }

            this.get("collection", this.props.app_auth.email_name).then((_c)=>{
                if(_c == 404) return this.set("collection", this.props.app_auth.email_name, '{}');
                return _c
            })
            .then(_collection => {
                delete _collection.ok;
                delete _collection._id;
                delete _collection.id;
                delete _collection._rev;
                delete _collection.rev;
                resolve()
            })
        })
    }
    this.loadMySales = () => {
        return new Promise(resolve=>{
            
        })
    }
    this.init = () => {
        if(this.hasRunInit) return;
        this.hasRunInit = 1;
    	return this.auth().then(this.createPublicProfile).then(this.loadMyCollection)
    }
    this.persistCollection = (collection) => {
        return new Promise(resolve=>{
            this.get("collection", this.props.app_auth.email_name).then((_c)=>{

                collection._rev = _c._rev
                collection._id = _c._id

                axios(`${couch_url}/${this.props.app_auth.email_name}/collection`,{
                  method: "put",
                  data: collection,
                  withCredentials: true
                })
                .then((_response)=>resolve(_response.data))
            })
        })
    }

    this.attachToDoc = ({db_id, doc, file}) => {
        return new Promise((resolve,reject) => {
            // const file = new Blob([files[0]], { type: file.mime });// WORKS much better (if you know what MIME type you want.
            console.info({db_id, doc, file})
            const formData = new FormData();
            // formData.append(file.name, file);
            axios.put(`${couch_url}/${db_id}/${doc.id}/${file.name}?rev=${doc.rev}`, file, { 
                withCredentials: true,
                headers:{
                  "Content-Type":file.type   
                }
            }).then((res)=>{
                console.log("===== uploaded file ====")
                console.log(res.data)
                resolve(res.data)
            }).catch((err)=>{
                console.error('====== attach to doc error ====')
                console.error(err)
                console.error('====== attach to doc error ====')
            });
        })
    }
  }	
} 