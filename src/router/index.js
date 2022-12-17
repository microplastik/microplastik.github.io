import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import events from '@/components/events'
import event from '@/components/event'
import artist from '@/components/artist'
import shop from '@/components/shop'
import shop_category from '@/components/shop_category'
import contacts from '@/components/contacts'
import artists from '@/components/artists'
const admin = () => import(/* webpackChunkName: "admin" */ "@/components/admin")
const login = () => import(/* webpackChunkName: "login" */ "@/components/login")
const event_list = () => import(/* webpackChunkName: "admin_events" */ "@/components/admin_events")
const artist_list = () => import(/* webpackChunkName: "admin_artists" */ "@/components/admin_artists")
const admin_home = () => import(/* webpackChunkName: "admin_home" */ "@/components/admin_home")
const item_editor = () => import(/* webpackChunkName: "admin_editor" */ "@/components/admin_editor")
const item_creator = () => import(/* webpackChunkName: "admin_creator" */ "@/components/admin_creator")

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/artists/',
      name: 'artists',
      meta: { scrollToTop: true},
      component: artists
    },
    {
      path: '/artist/:slug',
      name: 'artist',
      meta: { scrollToTop: true},
      component: artist
    },
    {
      path: '/events/:id',
      name: 'events',
      meta: { scrollToTop: true},
      component: events
    },
    {
      path: '/event/:e_id',
      name: 'event',
      meta: { scrollToTop: true},
      component: event
    },
    {
      path: '/shop',
      name: 'shop',
      meta: { scrollToTop: true},
      component: shop
    },
    {
      path: '/shop/:category',
      name: 'shop_category',
      meta: { scrollToTop: true},
      component: shop_category
    },
    {
      path: '/contacts',
      name: 'contacts',
      meta: { scrollToTop: true},
      component: contacts
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { scrollToTop: true},
      component: admin,
      children:[
        {
          path: '/',
          name: 'auth',
          component: login,
        },
        {
          path: 'home',
          name: 'admin_home',
          component: admin_home,
        },
        {
          path: 'artists',
          name: 'artists_lists',
          component: artist_list,
        },
        {
          path: 'events',
          name: 'events_list',
          component: event_list,
        },
        {
          path: "edit/:type/:id",
          name: "item_editor",
          component: item_editor
        },
        {
          path: "create/:type",
          name: "item_creator",
          component: item_creator
        },
      ]
    }
  ]
})
