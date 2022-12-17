<template>
<div class="sys-container">
  <transition name="slideUp" v-if="loaded"
      <div class="sys-intro">
        <div v-if="video_mode === true" class="sys-intro-bg video-event">

        </div>
        <div v-if="event_mode === true" class="sys-intro-bg" :style="bg_img" @click="openFacebook"/>
          
          <div 
            class="buy" 
            id="buybutton"  
            :style="button__svg"
            :data-tc-event="ticket_event"
            :data-tc-token="ticket_token"
            v-if="ticket_sale_on === false"
          />
          
          <a :href="facebook_link" ref="link" target="_blank">
            <div class="index-event-info">
              <h2>
                WEBSITE 
                <br> 
                RE-RE-RE-RE-LAUNCH  
                <br>
                PARTY
              </h2>
            </div>
          </a>

          <div class="sys-intro-arrow" @click="openEvents">
            <span class="chevron bottom"></span>
          </div>

        </div>

  </transition>
</div>
</template>

<script>
import index_info from '@/constant/index_page.json';
import config from '@/constant/config.json';
import pace from 'pace-js';
export default {
  name: 'index',
  props:["app", 'isMobile'],
  computed:{
    bg_img:function(){
      return `background-image:url(${this.background_image})`
    },
    button__svg:function() {
      return `background-image:url(${this.button_svg})`
    }
  },
  mounted() {
    window.addEventListener('mousewheel', this.onScroll);
    window.addEventListener('touchmove', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel', this.onScroll);
    window.removeEventListener('touchmove', this.onScroll);
  },
  methods:{
    openFacebook() {
      this.$refs.link.click()
    },
    openEvents() {
      // if(this.mobile) return this.$router.push("/event/1")
      return this.$router.push("/contacts")
    },
    onScroll() {
      if(this.blockedScroll) return;
      this.blockedScroll = true;
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(this.openEvents, 100)
    },
    loadData() {
      const app = this.app.app || this.app
      app.showNav()
      app.blog.mget({type:"settings"}).then((settings)=>{
          this.facebook_link =  "https://www.instagram.com/p/CmOkSXirWDm/?igshid=Zjc2ZTc4Nzk%3D" //settings.facebook_link, 
          this.ticket_text_big = "CHAPTER 1" //|| settings.ticket_text_big, 
          this.ticket_text_small = "THE HOTLINE" //|| settings.ticket_text_small,
          this.background_image = settings.background_image,
          this.button_svg = settings.button_svg,
          this.next_page = settings.next_page,
          this.ticket_event = settings.ticket_event, 
          this.ticket_token = settings.ticket_token, 
          this.ticket_sale_on = true || settings.ticket_sale_on,
          this.loaded = true;
      })
    }
  },
  watch: {
    $route(to, from) {
      // console.info(to,from)
    }
  },
  data () {
    this.loadData()
    var {
      facebook_link, 
      ticket_text_big, 
      ticket_text_small,
      background_image,
      button_svg,
      next_page,
    } = index_info
    const {
      ticket_event, 
      ticket_token, 
      ticket_sale_on,
    } = config

    setTimeout(()=>{
      this.blockedScroll = false
    }, 1000);
    return {
      blockedScroll:true,
      mobile:window.innerWidth < 800,
      loaded:false,
      video_mode:true,
      event_mode:false,
      ticket_event, 
      ticket_token, 
      facebook_link, 
      ticket_text_big, 
      ticket_text_small,
      background_image,
      ticket_sale_on,
      button_svg,
      next_page,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.system108_ui .buy,
#buybutton {/*
  background-image: url(/static/svg/button-01.svg);*/
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 220px;
  height: 55px;
  display: block;
  left: calc(50% - 110px);
  bottom: 20%;
  cursor: pointer;
}
.index-event-info h2 {
  font-size:48px;
}
.sys-intro-bg {
  width: 100%;
  height: calc(100% - 100px);
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
  position: absolute;
}
.index-event-info {
  font-family: "CODE BOLD";
  top: calc(50% - 50px);
  left: 0;
  width:100%;
  position: fixed;
}

@media only screen and (max-width: 900px) {
  .sys-intro-bg {
    height: 100%;
  }
}
</style>
