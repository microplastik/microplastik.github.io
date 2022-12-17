<template>
  <div id="app" :class="container_class">
    <navigation v-if="showNav" />
    <main>
        <video v-if="isMobile === false" src="/static/video/control.mp4" autoplay muted loop class="main-video" />
        <labyrinth v-else />
        <div v-if="isMobile === false" class="renderer-switch" @click="enableMobile">
          <h2>ENABLE 3D</h2>
        </div>
        <router-view :app={app} :isMobile={isMobile}></router-view>
    </main>
  </div>
</template>

<script>

require('vue2-animate/dist/vue2-animate.min.css')
import ApplicationService from '@/services/app'
import navigation from '@/components/navigation'
import labyrinth from '@/components/labyrinth'

export default {
  name: 'app',
  computed:{
    container_class() {
      return "full_black"
    }
  },
  methods:{
    enableMobile() {
      this.isMobile = true;
    },
    handleScroll:function() {
      console.info('scroll')
    },
    hideNav() {
      this.showNav = false;
    },
    openNav() {
      this.showNav = true;
    }
  },
  components:{navigation, labyrinth},
  data() {
    const app = new ApplicationService(this)
    app.hideNav = this.hideNav
    app.showNav = this.openNav
    const isMobile = window.innerWidth < 900
    return {
      showNav:true,
      isMobile,
      app
    }
  }
}
</script>

<style>
@font-face {
    font-family: "CODE BOLD";
    src: url("/static/CODE_Bold.otf") format("opentype");
}
.main-video {
  width:100%;
  height:100%;
  position:fixed;
  left:0;
}
.full_black {
  background:black;
  width:100%;
  height:100%;
}
.hidden {
  display:none;
}
.pace {
  -webkit-pointer-events: none;
  pointer-events: none;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.pace-inactive {
  display: none;
}

.pace .pace-progress {
  background: white;
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 100%;
  width: 100%;
  height: 4px;
}

#app {
  font-family: "CODE BOLD";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
  position: fixed;
  height: 100%;
  width: 100%;
  top:0;
  left:0;
}
body {
  background-color:black;
}
main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 0px;
  top:0;
  box-sizing: border-box;
  position: fixed;
  height: 100%;
  width: 100%;
  top:0;
  background:black;
  left:0;
}
a:hover,
a {
  color: white;
  text-decoration: none;
  outline: none;
}
body, html,
.system108_bg,
.system108_bg > canvas,
.system108_ui,
.system108_sign_up,
.system108_final,
.system108_buy_form,
.system_108_beauty_buy_form,
.system108_ui_fx,
.fullscreen-bg__video,
.sys-intro,
.sys-events,
.sys-artists,
.sys-mashkov,
.sys-mujuice,
.sys-blog,
#widget {
  top:0;
  left:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  position: fixed;
  width: 100%;
  height: calc(100% - 25px);
  padding: 0;
  margin: 0;
  box-sizing: border-box;
    overflow-y:scroll;
    -webkit-overflow-scrolling:touch;
    overflow-x: hidden;
}
.sys-intro,
.sys-events,
.sys-artists,
.sys-mashkov,
.sys-mujuice {
  height: calc(100% - 30px);
  overflow: hidden;
}

.sys-container {
  background:black;
  width:100%;
  height:100%;
}
.sys-events,
.sys-artists,
.sys-blog {
    display: flex;
    flex-flow: wrap;
    opacity: 1;
    /*transform: translate(-50%, 0%);*/
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
    left: calc(120px);
    width: calc(100% - 217px);
    overflow: hidden;
}

.sys-blog,
.sys-mashkov,
.sys-mujuice,
.sys-events,
.sys-artists {
    /*left: calc(50% + 120px);*/

    height: calc(100%);
    width: calc(100% - 217px);

}

.sys-intro-arrow {
  position: absolute;
  bottom: 120px;
  width: 100%;
  text-align: center;
  font-size: 32px;
  cursor: pointer;
  display: none;
}
.sys-intro .sys-intro-arrow {
  right: 0;
  display:block;
}

.chevron::before {
  border-style: solid;
  border-width: 2px 2px 0 0;
  content: '';
  display: inline-block;
  height: 0.45em;
  left: 0.15em;
  position: relative;
  top: 0.15em;
  transform: rotate(-45deg);
  vertical-align: top;
  border-color: white;
  width: 0.45em;
}

.chevron.right:before {
  left: 0;
  transform: rotate(45deg);
}

.chevron.bottom:before {
  top: 0;
  transform: rotate(135deg);
}

.chevron.left:before {
  left: 0.25em;
  transform: rotate(-135deg);
}

.sys-intro-arrow {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size: 32px;
    cursor: pointer;
    display: block;
}
.renderer-switch {
  position:fixed;
  bottom:20px;
  right:20px;
  color: #fff;
  cursor:pointer;
  z-index:1000000;
}
@media only screen and (max-width: 900px) {

    .main-video {
      width:auto;
      height:100%;
      left: 0;
      right: 0;
    }
    .sys-intro-arrow {
      display: block;
      bottom: 20px;
    }
    .sys-intro-bg {
      background: url(/bg_celko.jpg) no-repeat;
      background-size: 100%;
      background-position: center top;
    }
    .sys-event {
      background-position: top center;
    }
}

</style>
