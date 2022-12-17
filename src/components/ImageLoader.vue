<template>
<div class="image-loader-container">
  <Modal v-if="editorOpen">
    <div slot="header">
      <h4>Загрузить новое изображение</h4>
    </div>
    <div slot="body">
      <b-button 
        style="width:100%"
        v-if="!selectedItem"
        @click="selectItem" 
        variant="outline-success">
        Выбрать
      </b-button>
      <input type="file" class="hidden" ref="hidden_file" @change="fileChange" />
    </div>
    <div slot="footer">
      <b-button 
        @click="closeModal" 
        variant="outline-warning">
        Закрыть
      </b-button>
    </div>
  </Modal>
  <div class="image-loader-preview" :style="bg_img">
    <div class="image-loader-edit-button" @click="openModal">
      Загрузить другое изображение
    </div>
  </div>
</div>
</template>

<script>
import Modal from '@/components/modal'
import { blog_id } from '@/services/blog'
export default {
  name: 'ImageLoader',
  props:{app:Object, item:String, parent_type:String},
  components:{Modal},
  computed:{
    bg_img(){
      return `background-image:url(${this.item_url})`
    },
  },
  methods:{
    openModal() {
      this.editorOpen = true;
    },
    closeModal() {
      this.editorOpen = false;
    },
    selectItem() {
      this.$refs.hidden_file.click()
    },
    fileChange() {
      const file = this.$refs.hidden_file.files[0]
      if(file.size > 907200){
         alert("File is too big!");
         this.$refs.hidden_file.value = "";
         console.info('=====')
         return;
      };
      const app = this.app.app.app || this.app.app
      app.blog.uploadFile({file, type:this.parent_type})
      .then((doc)=>{
        this.item_url = `https://new.system108.com/data/${blog_id}/${doc.id}/${file.name}`
        this.$parent.saveItem()
      })
    }

  },
  data () {
    return {
      item_url:this.$attrs.value,
      editorOpen:false, 
      selectedItem:false,
    }
  },
  watch: {
    item_url(to, from) {
      this.$emit('input', to)
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.image-loader-container {
  height:400px;
  width:300px;
  margin-bottom:20px;
}
.image-loader-preview {
  width:100%;
  height:100%;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  position:relative;
}
.image-loader-edit-button {
  position:absolute;
  bottom:0px;
  left:0;
  width:100%;
  height:40px;
  line-height:40px;
  text-align:center;
  cursor:pointer;
  border: 2px solid #000;
  background:#fff;
}
</style>

