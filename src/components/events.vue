<template>

<div class="sys-container">
<transition name="slideUp" mode="in-out">
  <div class="sys-events" @wheel="scrollNext" v-if="loaded">
    <event 
    v-for="item in items"
    :key="item.id"
    :fb="item.fb"
    :image="item.image"
    :className="className"
    :is_component="true" />
    <div class="sys-intro-arrow" @click="scrollNext">
      <span class="chevron bottom"></span>
    </div>
  </div>
</transition>
</div>
</template>

<script>
import event from './event.vue';

export default {
  name: 'events',
  components:{event},
  props:['app'],
  created(){
    if(window.innerWidth < 800) return this.$router.push("/event/1")
    this.blockedScroll = true;
    setTimeout(()=>{this.blockedScroll = false}, 1000);
  }, 
  methods:{
    splitIntoChunks(array, chunk, events) {
      var i,j,temparray = [];
      var current = 0;
      for (i=0,j=array.length; i<j; i+=chunk) {
          temparray[current] = array.slice(i,i+chunk).map(k=>{
            events[k].id = k
            return events[k]
          });
          current += 1;
      }
      return temparray
    },
    nextPage(){
      var rid = parseInt(this.$route.params.id)
      
      if(this.next) rid += 1
      else rid += (-1)
      
      if(rid <= 0) return this.$router.push("/")

      if(this.chunks[rid-1]) this.$router.push(`/events/${rid}`)
      else this.$router.push("/artists")
    },
    scrollNext(evt) {
      if(this.blockedScroll) return;
      this.blockedScroll = true;
      this.next = true;
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(this.nextPage, 100)
    },
    getItems(rid) {
      const app = this.app.app || this.app
      app.blog.mget({type:'event'}).then((events)=>{
        const kk = Object.keys(events)
        var items = []
        this.chunks = this.splitIntoChunks(kk, 3, events)
        items = this.chunks[rid-1]
        this.events = events;
        this.items = items;
        this.loaded = true;
      })
    }
  },
  data () {
    var items = []
    this.getItems(parseInt(this.$route.params.id))
    return {
      mobile:window.innerWidth < 800,
      items,
      loaded:false,
      className:"sys-event col-lg-4 col-xs-12"
    }
  },
  watch: {
    $route(to, from) {
      this.loaded = false;
      this.getItems(parseInt(to.params.id))
      this.blockedScroll = true;
      setTimeout(()=>{this.blockedScroll = false}, 500);
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
}
</style>
