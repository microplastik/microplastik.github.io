<template>
<div class="sys-container">
  <div
      class="artists">
    <div 
      v-for="item in items"
      :key="item.id"
    > 
    <router-link :to="item.url">
      <p>{{item.name}}</p>
    </router-link>
    </div>
  </div>
</div>
</template>

<script>

import artist from './artist.vue';

export default {
  name: 'slide',
  props:["app"],
  components:{artist},
  methods:{
    nextPage:function(){
      this.$router.push("/contacts")
    },
    scrollNext:function(){
      if(this.blockedScroll) return;
      this.blockedScroll = true;
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(this.nextPage, 100)
    },
    getData(){
      const app = this.app.app || this.app
      const type = "artist"
      app.blog.mget({type}).then((data)=>{
        this.items = data;
        this.loaded = true;
      })
    }
  },
  mounted() {
    if(this.not_mobile)window.addEventListener('mousewheel', this.scrollNext);
    if(this.mobile)window.addEventListener('touchmove', this.scrollNext);
  },
  beforeDestroy() {
    if(this.not_mobile)window.removeEventListener('mousewheel', this.scrollNext);
    if(this.mobile)window.removeEventListener('touchmove', this.scrollNext);
  },
  data () {
    this.getData()
    setTimeout(()=>{
      this.blockedScroll = false
    }, 1000);
    return {
      blockedScroll:true,
      mobile:window.innerWidth < 800,
      not_mobile:window.innerWidth > 800,
      items: [], 
      loaded:false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sys_artist * {
  font-family: "CODE BOLD";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}
.artists_mobile,
.artists {
  font-family: "CODE BOLD";
  position: fixed;
  width: 240px;
  left: calc(50% - 120px);
  top: calc(50% - 100px);
  color: #fff;
  font-size:24px;
  text-transform: "uppercase";
}
.artists_mobile p,
.artists p {
  padding: 5px 15px;
  font-size: 32px;
}

.sys-events,
.sys-artists,
.sys-blog {
    display: flex;
    flex-flow: wrap;
    /*max-width: 1150px;*/
    /*bottom: 0;*/
    opacity: 1;
    /*top: 50%;*/
    /*transform: translate(-50%, 0%);*/
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
    left: calc(120px);
    width: calc(100% - 217px);
    overflow: hidden;
    /*transition: top 0.3s ease-in-out;*/
}

</style>
