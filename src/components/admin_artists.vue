<template>
  <div class="admin-page-container">
    <AppHeader />
    <div class="admin-table-container" v-if="loaded">
      <div class="create-item" @click="openCreator">Добавить</div>
      <v-client-table 
      :data="artists" 
      :columns="keys" 
      :options="options" 
      >
        <a 
        slot="edit" 
        slot-scope="props" 
        class="table-edit-item" 
        @click="editItem(props.row)" 
        >
          Редактировать
        </a>
      </v-client-table>
    </div>
  </div>
</template>

<script>

import AppHeader from './AppHeader'

export default {
  name: 'admin_artists',
  props:{app:Object},
  components:{AppHeader},
  computed:{
  },
  methods:{
    getData() {
      const app = this.app.app.app || this.app.app
      const type = "artist"
      app.blog.mget({type})
      .then(data=>{
        
        this.artists = Object.keys(data).map(i=>{
          data[i].id = i;
          return data[i]
        });
        this.loaded = true;
      })
    },
    openCreator() {
      this.$router.push("/admin/create/artist")
    },
    editItem(row) {
      this.$router.push("/admin/edit/artist/"+row.id)
    }
  },
  data () {
    this.getData()
    return {
      d:0,
      name:false,
      image:false,
      loaded:false,
      keys: ["name", "text", "image", "url", "edit"],
      options:{
        headings:{name:"Имя","image":"Картинка","url":"Ссылка", "text":"Текст"},
        perPage: 50 
      },
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

