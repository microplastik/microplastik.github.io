<template>
<div class="sys-container">
  <!-- <transition name="slideUp"> -->
    <div class="artist-page-container" v-if="loaded">
      <div class="col-12 col-lg-4" style="height:400px;">
      	<div 
      	:class="artistclass" 
      	:style="artistImage">
      		<div class="sys-artist-title">
      			<p>{{name}}</p>
      			<div :class="playButtonclass" @click={play}></div>
      		</div>
      	</div>
      </div>
      <div class="col-12 col-lg-4 artist-text">
        {{text}}
      </div>
    </div>
  <!-- </transition> -->
</div>
</template>

<script>


export default {
  name: 'artist',
  props:{slug:String, app:Object},
  computed:{
    artistImage() {
      return `background-image:url(${this.image})`
    },
    artistclass() {
      if(this.is_playing) return "sys-artist col-lg-4 col-xs-12 is_playing"
      return "sys-artist"
    },
    playButtonclass() {
      if(this.is_playing) return "play-button paused"
      return "play-button"
    },
  },
  methods:{
    play() {

    },
    getData() {
      const app = this.app.app || this.app
      const id = this.$route.params.slug
      const type = "artist"
      app.blog.get({type, id})
      .then(data=>{
        this.name = data.name
        this.image = data.image
        this.text = data.text
        this.loaded = true;
      })
    }
  },
  data () {
    this.getData()
    return {
      d:0,
      name:false,
      image:false,
      loaded:false
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.artist-page-container {
  position: fixed;
  width: calc(100% - 200px);
  left: 200px;
  top: 120px;
  color: #fff;
  display:flex;
  text-align:left;
}
.sys-artist-title {
  font-family: "CODE BOLD";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    bottom: 0;
    opacity: 0;
    left: 0;
    padding: 5px 15px;
    // background: rgba(0,0,0,0.25);
    width: 100%;
    height: 100%;
    padding-left:20px;
    font-size: 18px;
    color: white;
}
.sys-artist-title p {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    margin-top:-250px;
    line-height: 700px;
    padding:20px;
    font-size:48px;
    padding-left:0;
    text-transform: uppercase;
    -webkit-transition: 300ms margin-top ease;
    -o-transition: 300ms margin-top ease;
    transition: 300ms margin-top ease;
}
.sys-artist > .sys-artist-title > p,
.sys-artist.is_playing > .sys-artist-title > p {
  margin-top:0;
}
.sys-artist > .sys-artist-title,
.sys-artist.is_playing > .sys-artist-title {
    bottom: 0;
    opacity: 1;
    transition: all 250ms ease-in-out;
}
.sys-artist-detail-image {
    width: 50%;
    height: 100%;
    background: transparent;
    background-size: cover;
    background-color: black;
    background-repeat: no-repeat;
    background-position: top;
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
    padding: 0;
    /*cursor: pointer;*/
    min-height: 800px;
}
.sys-artist-detail-title {
    position: absolute;
    top:50px;
    left:50px;
    font-size:32px;
}
.sys-artist-detail-text {
    width: 42%;
    left: 58%;
    height: 100%;
    position: fixed;
    top: 0;
    color: white;
    padding: 100px 50px;
}
.sys-artist {
    background: transparent;
    background-size: cover;
    background-color: black;
    background-repeat: no-repeat;
    background-position: top;
    padding: 0;
    cursor: pointer;
    min-height: 400px;
    opacity: 1;
    overflow: hidden;  
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
    /*border:2px solid transparent;*/
}
.artist-text {
  padding-top:0px;
}
.artist-page-container {
  padding:0;
}
@media only screen and (max-width: 900px) {

  .sys-artist-title p {
    font-size:32px;
  }
  .artist-page-container {
    position: fixed;
    width: calc(100% - 40px);
    left: 20px;
    top: 20px;
    color: #fff;
    text-transform: "uppercase";
    flex-flow:wrap;
    overflow:scroll;
    height:100%;
  }
  .artist-text {
    margin-top:0;
  }
}
</style>

