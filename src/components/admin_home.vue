<template>
  <div class="admin-page-container">
    <AppHeader />
    <div class="admin-table-container" v-if="loaded">
      <div class="admin-item-editor">
        <div 
        class="item-editor-item"
        v-for="item in keys"
        :key="item">
          <div class="item-editor-content" v-if="item != 'background_image'">
            <label>{{item}}:</label>
            <textarea v-model="items[item]" />
          </div>
          <div v-else class="item-editor-uploader">
            <label>{{item}}:</label>
            <ImageLoader :app="app" v-model="items[item]" parent_type="home" />
          </div>
        </div>
        <div class='save-button' @click="saveItem" v-if="not_uploading">
          Сохранить
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import ImageLoader from './ImageLoader'

export default {
  name: 'admin_home',
  props:{app:Object},
  components:{AppHeader, ImageLoader},
  computed:{
  },
  methods:{
    getData() {
      const app = this.app.app.app || this.app.app
      app.blog.mget({type:"settings"})
      .then(data=>{
        this.keys = Object.keys(data)
        this.items = data
        this.loaded = true;
      })
    },
    saveItem() {
      const app = this.app.app.app || this.app.app
      this.not_uploading = false;
      app.blog.edit({type:"settings", new_data:this.items})
      .then(()=>{
        this.not_uploading = true;
      })
    }
  },
  data () {
    this.getData()
    return {
      d:0,
      data:[],
      keys:["facebook_link", "next_page", "button_svg", "background_image", "ticket_text_big", "ticket_text_small", "ticket_event", "ticket_token", "ticket_sale_on"],
      settings:false,
      loaded:false,
      not_uploading:true
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

