<template>

  <div class="nav-container">
    <div class="burger-container" @click="toggleBurger">
        <div class="menu-button">
            <div :class="burger_classname">
               <span></span>
               <span></span>
               <span></span>
               <span></span>
            </div>
        </div>
    </div>
		<div :class="nav_classname">
      <router-link to="/"         class="sys-nav-item">NEWS</router-link>
      <!-- <router-link to="/events/1" class="sys-nav-item">EVENTS</router-link> -->
      <router-link to="/artists"  class="sys-nav-item">ARTISTS</router-link>
      <router-link to="/contacts" class="sys-nav-item">CONTACTS</router-link>
      <a href="https://microplastik.bandcamp.com/" class="sys-nav-item" target="_blank">SHOP</a>
		</div>
  </div>
  
</template>

<script>
import config from '@/constant/config.json';

export default {
	name: 'navigation',
  created:function() {
    // console.info(this.$route.params.category)
    if(this.$route.params.category == "merch") this.burger_black = true;
    this.burger_classname = this.get_burger_classname()
  },
	computed:{
		nav_classname:function() {
      if(this.burger_active) return "sys-nav burger_active"
      return "sys-nav"
		},

	},
 	methods:{
  		toggleBurger:function(){
  			this.burger_active = !this.burger_active
        console.info(this.burger_active)
  		},
      openEvents:function() {
        if(this.mobile) return this.$router.push("/event/1")
        return this.$router.push("/events/1")
      },
      get_burger_classname:function() {
      if(this.burger_active) return "menu-icon is-active"
      if(this.burger_active && this.burger_black) return "menu-icon is-active menu-icon-black"
      if(this.burger_black) return "menu-icon menu-icon-black"
      return "menu-icon"
    },
	},
  watch: {
    burger_black:function() {
      this.burger_classname = this.get_burger_classname()
        this.$forceUpdate();
    },
    $route(to, from) {
      if(this.burger_active)this.toggleBurger()
      console.info(to.params.category)
      if(to.params.category == "merch") {
        this.burger_black = true;
        this.burger_classname = this.get_burger_classname()
        this.$forceUpdate();
        console.info("borger-black")
      }
      else {
        if(!this.burger_black) return;
        this.burger_black = false;
        this.burger_classname = this.get_burger_classname()
        this.$forceUpdate();
      }
    }
  },
 	data () {
	    return {
	      d:0,
        mobile:window.innerWidth < 800,
	      tickets_active:true,
	      burger_active:false
	    }
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.sys_navigation {
  position: fixed;
  top:0;
  right: 0;
  z-index:50;
}
.nav-container {
	width: auto;
	height: 100%;
}

.sys-nav {
    position: fixed;
    top: 0;
    left:0;
    width: 180px;
    height: 95px;
    background: rgba(0,0,0,0.3);
    z-index: 1000;
    text-align: left;
    transition: top 0.6s ease-in-out, left 0.4s ease-in-out;
    padding: 10px;
    margin: 15px;
    margin-left: 0;
    margin-top: 0;
    height: 100%;
    color: #fff;
    padding-top:65px;
    padding-left: 42px;
    background-color:transparent;
    background-image: url(/static/img/logo.svg);
    background-position:35px calc(100% - 25px);
    background-repeat: no-repeat;
    background-size: 120px;
    padding-top: 105px;
    filter: invert(100%);
}
.sys-nav.hidden {
    top:-200px;
    display: block;
}

.sys-nav-item {
    line-height: 60px;
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 100px;
    text-align: left;
    cursor: pointer;
    color:#000;
    font-size: 24px;
}

.sys-nav-item:hover,
.sys-nav-item:hover a:hover {
  color:#000;
}
.sys-nav-item::after {
    content: " ";
    width: 0;
    position: absolute;
    height: 0px;
    display: block;
    background: white;
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    bottom: 27px;
    left: -13px;
}

.sys-active::after {
    width: 8px;
    height: 8px;
}

.burger-container {
  position: fixed;
  display: flex;
  align-items: start;
  z-index: 10000000000;
  justify-content: center;
  background-color: transparent;
  min-height: 30px;
  margin: 32px;
  cursor: pointer;
}

.menu-icon {
  position: relative;
  width: 30px;
  height: 30px;
  display: inline-block;
}

.menu-icon span {
  position: absolute;
  height: 0.1875em;
  width: 100%;
  background-color: white;
  transition: all 250ms ease-in-out;
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
}

.menu-icon.menu-icon-black span {
  background: black;
}
.menu-icon span:nth-child(1) {
  top: 0.09375em;
}

.menu-icon span:nth-child(2),
.menu-icon span:nth-child(3) {
  top: 0.9975em;
}

.menu-icon span:nth-child(4) {
  top: 1.875em;
}

.menu-button:hover span,
.menu-button:focus span,
.menu-button:active span {
  background: white;
}

.menu-icon.is-active span:nth-child(1),
.menu-icon.is-active span:nth-child(4) {
  opacity: 0;
}

.menu-icon.is-active span:nth-child(2) {
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

.menu-icon.is-active span:nth-child(3) {
  top: 0.9375em;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}
/*MOBILE MENU*/
@media only screen and (min-width: 900px) {
  .burger-container {
      display:none;
  }
}

@media only screen and (max-width: 900px) {
  .sys-nav {
      left:-100%;
  }
  .sys-nav.burger_active {
      left:0;
  }
}
</style>
