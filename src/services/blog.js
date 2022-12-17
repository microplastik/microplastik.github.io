import axios from "axios"
import * as uuid from "uuid"

export const blog_id = "microplastic"
const blog_ns = "blog"

const BlogApp = function(props) {
	this.props = props
	this.getBlogData = () => {
		return this.props.couch.get(blog_ns, blog_id)
	}
  	this.mget = ({type}) => new Promise((resolve, reject)=>{
		this.getBlogData().then((data)=>{
	  		return resolve(data[type])
	  	})
	})
	this.getById = ({type, id}) => new Promise((resolve, reject)=>{
		if(typeof +id == "number") {
			this.mget({type}).then((data)=>{
				resolve(data[id])
			})
			return;
		}
	})
	this.get = ({type, id}) => new Promise(resolve=>{
		if(type == "artist" && typeof id == "string") {
			const str = `/artist/${id}`
			this.mget({type})
			.then(data=>Object.keys(data).reduce((a,i)=>{ 
				console.info(data[i])
				data[i].image = data[i].image
				if(data[i].url === str) return data[i]
				return a;
			}, null))
			.then((item)=>resolve(item))
			return
		}
		return this.getById({type, id})
	})
	this.edit = ({type, id, new_data}) => new Promise(resolve=>{
		this.props.couch.get(blog_ns, blog_id).then(data=>{
			if(type === "settings") data[type] = new_data
			else data[type][id] = new_data
			return this.props.couch.set(blog_ns, blog_id, data)
		}).then(resolve)
	})

	this.mset = ({type, new_data}) => new Promise(resolve=>{
		this.props.couch.get(blog_ns, blog_id).then(data=>{
			data[type] = new_data
			return this.props.couch.set(blog_ns, blog_id, data)
		}).then(resolve)
	})

	this.create = ({type, id, new_data}) => new Promise(resolve=>{
		this.props.couch.get(blog_ns, blog_id).then(data=>{
			let k = Object.keys(data[type])
			let id = k[k.length-1]+1
			data[type][id] = new_data
			return this.props.couch.set(blog_ns, blog_id, data)
		}).then(resolve)
	})
	this.getspec = ({type}) => new Promise((resolve, reject)=>{
		if(type === 'artist') return resolve({
			"name":"",
			"url":"/artist/",
			"image":"",
			"text":""
		})
		if(type === "event") return resolve({
			"image":"",
			"fb":"",
			"title":"Новое мероприятие",
			"date":"01.01.1970"
		})
	})
	this.uploadFile = ({file, type}) => new Promise((resolve, reject)=>{
		const _id = `${type}_${uuid()}`

		this.props.couch.set(_id, blog_id, {_id})
		.then((doc)=>{
			return this.props.couch.attachToDoc({db_id:blog_id, doc, file})
		})
		.then((doc)=>{
			return resolve(doc);
		})
	})
}

export default BlogApp;