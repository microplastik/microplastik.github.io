const axios = require('axios');
const config = require("../config.json")
const auth_url = `${config.api_host}`

export default class Auth {
  constructor (props) {
    this.props = props
    this.auth = {
        name:"",
        picture:""
    }
    this.auth_promise = new Promise(resolve=>{
        this.auth_promise_resolve = resolve
    })
    this.loggedIn = () => {
    	if(this.auth.name != "") return true;
    	return false;
    }
    this.register = (ops) => new Promise((resolve, reject)=>{
        axios({
            url:`${auth_url}/register/email`, 
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials:true,
            method:"POST",
            data:{email:ops.login, name:ops.name}
        }).then((res)=>{
            resolve(res.data)
        }).catch(reject)
    })
    this.login = () => {
    	return this.props.showAuthModal().then(options=>this.processLogin(options))
    }
    this.processLogin = (options) => new Promise((resolve, reject)=>{
        const afterLogin = (d) => {
            resolve(d)
        }
        if(options.type == "fb") {
            FB.login((res)=>{
                this.FBInfoInit(res).then((data)=>{
                    afterLogin(this.auth)
                })
            },{
                scope: 'public_profile, email', 
                return_scopes: true
            });
        }
        if(options.type == "email") {
            this.loginEmail(options).then(user=>afterLogin(this.auth)).catch(reject)
        }
    })
    
    this.resetPassword = (options) => new Promise(resolve=>{
        return axios({
            url:`${auth_url}/reset_password`, 
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials:true,
            method:"POST",
            data:{email:options.login}
        }).then((res)=>resolve(res.data))
    })

    this.checkLogin = (login) => {
        return axios.get(`${auth_url}/checkEmail/${login}`)
        .then((res)=>{
            return res.data
        })
    }
    this.loginEmail = (options) => new Promise((resolve, reject)=>{
        axios({
            url:`${auth_url}/login`,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials:true,
            method:"POST",
            data:options
        })
        .then((_d)=>this.setResponseParams(_d.data).then(resolve))
        .catch(err=>{
            reject(err)
            console.error(err);
        })
    })
    this.logout = () => {
    	return new Promise(resolve=>{
	    	this.auth = {"name":""}
            this.props.disableAppNav()
            FB.logout()
            axios({
                url:`${auth_url}/logout`,
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials:true,
                method:"GET"
            }).then(()=>{
                resolve(this.auth)
            })
    	})
    }
    this.waitForFB = (reset) => {
        if(this.FBwait) return this.FBwait
        const waitt = () => {
            return new Promise(resolve=>{
                if(this.did_resolve_fb) return;
                if(window.FB) {
                    this.did_resolve_fb = 1;
                    return resolve(true)
                }
                setTimeout(()=>waitt().then(resolve), 300);
            })
        }
        this.FBwait = new Promise(resolve=>{
            waitt().then(resolve)
        })
        return this.FBwait;
    }
    this.checkForRouteReload = () => {
        // console.log("checkForRouteReload",this.props.v.$router);
    }
    this.setResponseParams = (data) => new Promise(resolve=>{
        this.props.app_auth = data; 
        this.db_auth = data; 
        this.auth.url = data.email_name
        this.auth.name = data.displayName || data.name
        this.auth.picture = data.avatar
        if(this.auth_promise_resolve) this.auth_promise_resolve()
        this.props.couch.init()
        this.updateProfileUI()
        return resolve(this.auth)
    })
    this.initAppData = (d) => {
        this.props.appDataPromise = new Promise(resolve=>{
            axios({
                url:`${auth_url}/register/fb_token/${d.authResponse.accessToken}`,
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials:true
            })
            .then((d)=>{
                console.info("=== response === ", d)
                return resolve(this.setResponseParams(d.data))
            })
            .catch(err=>{
                console.error(err);
            })
        })
        return this.props.appDataPromise
    }
    this.FBInfoInit = (d) => {
        return new Promise((resolve, reject)=>{
            console.info("INIT PROFILE", d);
            const workStatus = (_d) => {

                if(_d && _d.authResponse && _d.authResponse.accessToken) {
                    this.auth.fb_id = _d.authResponse.userID
                    this.initAppData(_d)
                    .then(()=>{
                        console.info("logged in")
                        resolve(this.auth)
                    })
                    return;
                }
                console.info("NO STATUS")
                resolve({})
            }
            if(d.authResponse) return workStatus(d)
            FB.getLoginStatus((d)=>{
                console.info('FB Response', d)
                workStatus(d)
            })
        })
    }
    this.checkApiInfo = () => {
        return axios.get(auth_url+"/me").then(res=>this.setResponseParams(res.data))
    }
    this.FBPromise = new Promise((resolve)=>{
        this
        .checkApiInfo()
        .then(resolve)
        .catch((err)=>{
            console.error(err)
            this.waitForFB()
            // .then(this.FBInfoInit).then(resolve)
        })
    })
    this.updateProfileUI = ()=> {
        // this.props.nav_profile.dispatchData(this.auth)
        // this.props.enableAppNav()
    }
  }
} 