import BlogService from './blog'
import AuthService from './auth'
import CouchService from './couch'
import {libutils} from './utils'

const ApplicationInstance = function (vueInstance) {
  this.v = vueInstance
  this.blog = new BlogService(this)
  this.auth = new AuthService(this)
  this.couch = new CouchService(this)
  this.test = () => {
    // console.info("APPLICATION INSTANCE RUNNING")
    // console.info(this)
    // console.info("APPLICATION INSTANCE RUNNING")
  }
  // this.test()
}

export default ApplicationInstance;