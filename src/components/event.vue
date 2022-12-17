<template>
<!-- <transition name="slideUp" mode="in-out"> -->
<!-- <div> -->
  <!-- <div :class="container_class"> -->
    <div 
    v-if="loaded"
    :class="classNames"
    :style="bg_img" 
    @click="openEventFacebook">
      <div class="sys-event-border">
      </div>
      <div v-if="not_component" class="sys-intro-arrow" @click="nextPage">
        <span class="chevron bottom"></span>
      </div>
    </div>
  <!-- </div> -->

<!-- 
  <div 
  v-else
  v-if="loaded"
  :class="classNames"
  :style="bg_img" 
  @click="openEventFacebook">
    <div class="sys-event-border">
    </div>
    <div v-if="not_component" class="sys-intro-arrow" @click="nextPage">
      <span class="chevron bottom"></span>
    </div>
  </div>
 -->
<!-- </div> -->
<!-- </transition> -->
</template>

<script>

import events from '@/constant/events.json';

export default {
  name: 'event',
  props:{image:String, fb:String, is_component:Boolean, className:String, app:Object},
  created(){
    if(this.is_component) {
      this.bg_img = `background-image:url(${this.image})`
    }
    else {
      this.not_component = true;
    }
    if(!this.className || this.className == "") this.classNames = "sys-container sys-event col-xs-12"
    else this.classNames = this.className;
  },
  computed: {

    container_class() {
      if(!this.is_component) return "sys-container"
      return this.className
    },
  },
  methods:{
    openEventFacebook(index) {
      const href = this.fb || this.fb_link
      window.open(href, "_blank")
    },
    nextPage(e){
      try {
        var touchobj = e.changedTouches[0]
        var elapsedTime, allowedTime = 300, threshold = 100, restraint = 100, swipedir, startX = 0, startY = 0, startTime = 0; 
        var distY = touchobj.pageY - this.startY
        var distX = touchobj.pageX - this.startX
        
        if (Math.abs(distY) >= threshold) swipedir = (distY > 0)? 'up' : 'down' 

        e.preventDefault()
      } catch(err) {
        console.error(err)
      }
      if(!swipedir) {
        setTimeout(()=>this.blockedScroll = false, 300)
        return;
      }
      var rid = parseInt(this.$route.params.e_id)
          rid += (swipedir === "down")? 1 : -1;
      if(rid < 1) return this.$router.push(`/`)
      if(Object.keys(this.events).length >= rid) return this.$router.push(`/event/${rid}`)
      return this.$router.push("/artists")
    },
    touchstart(e) {

        var touchobj = e.changedTouches[0]
        this.startX = touchobj.pageX
        this.startY = touchobj.pageY
        this.startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    },
    scrollNext(e){
      if(this.blockedScroll) return;
      this.blockedScroll = true;
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(this.nextPage, 500, e)
    },
    getData(rid) {

      const app = this.app.app || this.app
      app.blog.mget({type:'event'}).then((events)=>{
        this.events  = events
        this.fb_link = events[rid].fb
        this.bg_img  = `background-image:url(${events[rid].image})`
        this.loaded = true;
      })

    }
  },
  mounted() {
    if(this.is_component) return;
    if(!this.isMobile) window.addEventListener('mousewheel', this.scrollNext);
    else {
      window.addEventListener('touchstart', this.touchstart);
      window.addEventListener('touchend', this.scrollNext);
    }
  },
  beforeDestroy() {
    if(this.is_component) return;
    if(!this.isMobile) window.removeEventListener('mousewheel', this.scrollNext);
    else {
      window.removeEventListener('touchstart', this.touchstart);
      window.removeEventListener('touchend', this.scrollNext);
    }
  },
  data () {
    const rid = parseInt(this.$route.params.e_id)
    if(this.image) return {d:0, loaded:true}
    this.getData(rid)
    return {
      isMobile:window.innerWidth < 800 || window.innerHeight < 700,
      loaded:false
    }
  },
  watch: {
    $route(to, from) {
      const rid = parseInt(to.params.e_id)
      this.loaded = false
      this.getData(rid)
      this.blockedScroll = true;
      setTimeout(()=>{this.blockedScroll = false}, 300);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.system_slide {
  position: fixed;
  top:0;
  right: 0;
  width: 100%;
  height: 100%;
  background: black;
}
.sys-event.col-sm-6.col-lg-4.col-xs-12.full-screen {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  max-width: 800px;
  z-index: 1000;
}
.sys-event::after {
  background: rgba(255,255,255,0.4);
  width: 100%;
  content: "More info";
  position: absolute;
  bottom: 0;
  height: 30px;
  text-align: center;
  line-height: 30px;
  text-transform: uppercase;
  bottom: -30px;
  display: none;
  transition: bottom 0.3s ease-in-out;
}
.sys-event {
    background: transparent;
    background-size: contain;
    background-color: black;
    background-repeat: no-repeat;
    background-position: center;
    padding: 0;
    cursor: pointer;
    min-height: 800px;
    opacity: 1;
    transition: opacity 0.4s ease-in-out;
}
.slideUp-enter-active, .slideUp-leave-active {
  transition: opacity .5s;
}
.slideUp-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media only screen and (max-width: 900px) {
    .sys-event {
      background-position: top center;
      background-size: contain;
      height: 100%;
    }
    .sys-events, .sys-artists {
      width: 100%;
      left:50%;
    }
}
</style>
