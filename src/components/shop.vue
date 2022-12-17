<template>

<transition name="slideUp">
  <div class="system_shop">
<!--     <router-link to="/shop/merch">
    <div class="shop_group shop_merch">
      <div class="shop_group_info">
        <h2>Merch</h2>
      </div>
    </div>
    </router-link>
    <router-link to="/shop/records">
    <div class="shop_group shop_records">
      <div class="shop_group_info">
        <h2>Records</h2>
      </div>
    </div>
    </router-link> -->
  </div>
</transition>
</template>

<script>

export default {
  name: 'system_shop',
  mounted() {
    console.info('= mount shop =')
    window.addEventListener('mousewheel', this.onScroll);
    window.addEventListener('touchmove', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel', this.onScroll);
    window.removeEventListener('touchmove', this.onScroll);
  },
  methods:{
    openEvents:function() {
      if(this.mobile) return this.$router.push("/event/1")
      return this.$router.push("/events/1")
    },
    onScroll:function() {
      console.info("handleScroll")
      if(this.blockedScroll) return;
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(this.openEvents, 100)
    }
  },
  data () {
    return {
      mobile:window.innerWidth < 800,
      d:0,
      items:[{
        image:"",
        name:"",
        url:"",
        price:"",
        artist:""
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.system_shop {
  position: fixed;
  top:0;
  right: 0;
  width: 100%;
  height: 100%;
  background: black;
}
.shop_group {
  width: 50%;
  position: relative;
  float: left;
  height: 100%;
}
.shop_group_info {
  width: 200px;
  height: 200px;
  top:calc(50% - 50px);
  position: absolute;
  color: #fff;
  cursor: pointer;
}
.shop_merch {
  border-right: 1px solid #fff;
}
.shop_merch .shop_group_info {
  left:calc(50% - 100px);
}
.shop_records .shop_group_info {
  right:calc(50% - 100px);
}
.shop_records {
  border-left: 1px solid #fff;
}
</style>
