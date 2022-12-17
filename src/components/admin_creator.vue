<template>
<div class="admin-page-container">
  <AppHeader />
  <div class="admin-table-container" v-if="loaded">
    <div class="admin-item-editor">
      <div 
      class="item-editor-item"
      v-for="item in keys"
      :key="item">
          <div class="item-editor-content" v-if="item != 'image'">
            <label>{{item}}:</label>
            <textarea v-model="items[item]" />
          </div>
          <div v-else class="item-editor-uploader">
            <label>{{item}}:</label>
            <ImageLoader :app="app" v-model="items[item]" parent_type="home" />
          </div>
      </div>
      <div class='save-button' @click="saveItem">
        Сохранить
      </div>
    </div>
  </div>
</div>
</template>

<script>

import ImageLoader from './ImageLoader'
import AppHeader from './AppHeader'

export default {
  name: 'admin_creator',
  props:{app:Object, type:String, id:String},
  components:{AppHeader, ImageLoader},
  computed:{
  },
  methods:{
    getData() {
      const app = this.app.app.app || this.app.app
      const type = this.$route.params.type
      const id = this.$route.params.id
      app.blog.getspec({type})
      .then(data=>{
        this.items = data;
        this.keys = Object.keys(data).filter(i=>{
          if(i != "id") return i;
        })
        this.loaded = true;
      })
    },
    saveItem() {
      console.info('==== new model ====')
      console.info(this.items)
      const app = this.app.app.app || this.app.app
      const type = this.$route.params.type
      app.blog.create({type, new_data:this.items}).then(()=>{
        // this.$router.push(`/admin/${type}s`)
      })

    }
  },
  data () {
    this.getData()
    return {
      d:0,
      name:false,
      items:false,
      image:false,
      loaded:false
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

