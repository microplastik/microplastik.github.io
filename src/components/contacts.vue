<template>

<div class="sys-container">
<!-- <transition name="slideUp"> -->
<div class="sys-contact">
  <a 
  target="_blank" 
  href="https://www.facebook.com/microplastikrec/"><div class="sys-icon sys-facebook"></div></a>
  <a 
  target="_blank" 
  href="https://www.instagram.com/microplastikrecords/"><div class="sys-icon sys-instagram"></div></a>
  <a 
  target="_blank" 
  href="https://t.me/microplastikrecords"><div class="sys-icon sys-telegram"></div></a>
  <a 
  target="_blank" 
  href="https://soundcloud.com/microplastikrec"><div class="sys-icon sys-soundcloud"></div></a>
</div>

<!-- </transition> -->
</div>
</template>

<script>

export default {
  name: 'slide',
  methods:{
    nextPage:function(){
      this.$router.push("/")
    },
    scrollNext:function(){
      if(this.blockedScroll) return;
      this.blockedScroll = true;
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(this.nextPage, 100)
    }
  },
  mounted() {
    window.addEventListener('mousewheel', this.scrollNext);
    window.addEventListener('touchmove', this.scrollNext);
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel', this.scrollNext);
    window.removeEventListener('touchmove', this.scrollNext);
  },
  data () {
    setTimeout(()=>{
      this.blockedScroll = false
    }, 1000);
    return {
      blockedScroll:true,
      d:0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sys-contact {
  width: 400px;
  display: block;
  height: 100%;
  margin: auto auto;
  text-align: center;
  /*padding-top: 400px;*/


}
.sys-icon {
  background-image: url(/static/img/icons/fb.png);
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
  margin: 20px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.sys-facebook {
  background-image: url(/static/img/icons/fb.png);

}
.sys-instagram {
  background-image: url(/static/img/icons/ig.png);
  
}
.sys-telegram {
  background-image: url(/static/img/icons/tg.png);

}
.sys-soundcloud {
  background-image: url(/static/img/icons/sc.png);
}
.sys-vk {
  background-image: url(/static/img/icons/vk.png);
}
@media only screen and (min-width: 900px) {

  .sys-contact {
    top: calc(50% - 10px);
    left:calc(50% - 200px);
    position: fixed;
  }
}
@media only screen and (max-width: 900px) {
  .sys-contact {
    width: 200px;
      display: grid;
      padding-top: 80px;
      margin-left: inherit;
      margin-right: inherit;
      margin: 0 auto;
    bottom: 20%;
        position: fixed;
    top: 15px;
    left: calc(50% - 100px);
  }
  .sys-icon {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
}
</style>
