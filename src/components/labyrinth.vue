<template>
  <div class="sys-container">
    <div id="labapp" />
  </div>
</template>

<script>
import { LabyrinthItem } from '@/services/labyrinth'
export default {
  name: 'labyrinth',
  methods:{

  },
  mounted() {
    console.info('===== labyrinth mounted =====', LabyrinthItem)
    this.item_l = new LabyrinthItem()
  },
  beforeDestroy() {
  },
  data () {
    return {}
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
#labapp {
  width:100%;
  height:100%;
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
  }
  .sys-icon {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
}
</style>
