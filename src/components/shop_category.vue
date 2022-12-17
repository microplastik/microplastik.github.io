<template>

<transition name="slideUp">
  <div class="system_shop_category">
    <div class="shop_title">
    {{group_title}}
    </div>
    <div class="system_category_image" :style="group_img" />
    <div class="buy_button" @click="buyItem">
    BUY
    </div>
  </div>
</transition>
</template>

<script>

export default {
  name: 'system_shop_category',
  methods:{
    buyItem:function() {
      return document.getElementById("shop_pay_button").click()
    }
  },
  data () {
    var categories = {
      merch:[{
        image:"/static/img/shop/108tshirt.jpg ", 
        title:"Berghasm T-Shirt"
      }],
      records:[{
        image:"/static/img/shop/MUJUICE_XAOC.png", 
        title:"Mujuice XAOC"
      }]
    }
    var image = categories[this.$route.params.category][0].image
    return {
      d:0,
      group_img:`background-image:url(${image})`,
      group_title:categories[this.$route.params.category].title
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.system_shop_category {
  position: fixed;
  top:0;
  right: 0;
  width: 100%;
  height: 100%;
  background: black;
}
.system_category_image {
  width: 600px;
  height: 100%;
  top:0;
  left:calc(50% - 300px);
  position: absolute;
  color: #fff;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.buy_button {
  font-size: 24px;
  color: #fff;
  position: absolute;
  width: 100px;
  text-align: center;
  height: 50px;
  bottom: 20px;
  left: calc(50% - 50px);
  border: 1px solid #fff;
  padding: 7px;
  cursor: pointer;
  background: black;
}
.shop_title {
  font-size: 24px;
  color: #fff;
  position: absolute;
  width: 300px;
  text-align: center;
  height: 50px;
  top: 20px;
  left: calc(50% - 150px);
  padding: 7px;
  cursor: pointer;
}
@media only screen and (max-width: 900px) {
.system_category_image {
  width: 100%;
  height: 100%;
  min-height: 440px;
  top:0;
  left:0;
 } 

}
</style>
