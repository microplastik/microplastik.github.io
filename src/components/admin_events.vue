<template>
  <div class="admin-page-container">
    <AppHeader />
    <div class="admin-table-container" v-if="loaded">
    <div class="editor-nav create-item">
      <div class="btn btn-success" @click="openCreator">
        Добавить
      </div>
      <div class="btn btn-success" @click="showSorting">
        {{sortText}}
      </div>
    </div>
      <v-client-table
      v-if="!editingSort" 
      :data="events" 
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
      <div class="sort-editor" v-if="editingSort">
        <draggable
          :list="events"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div
            class="list-group-item"
            v-for="(element, index) in events"
            :key="element.image"
          >
            {{ element.image }}
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import * as draggable from "vuedraggable";

import AppHeader from './AppHeader'

export default {
  name: 'admin_events',
  props:{app:Object},
  components:{AppHeader, draggable},
  computed:{
    sortText() {
      if(!this.editingSort) return "Изменить сортировку"
      return "Сохранить сортировку"
    }
  },
  methods:{
    getData() {
      const app = this.app.app.app
      app.blog.mget({type:"event"})
      .then(data=>{
        this.events = Object.keys(data).map(i=>{
          data[i].id = i;
          return data[i]
        });
        this.loaded = true;
      })
    },
    openCreator() {
      this.$router.push("/admin/create/event/")
    },
    editItem(row) {
      this.$router.push("/admin/edit/event/"+row.id)
    },
    async showSorting() {
      if(this.editingSort) {
        console.info(this.events)
        const new_data = {}
        let index = 0;
        this.events.map((i)=>{
          index += 1;
          new_data[index] = i
        })
        await this.app.app.app.blog.mset({type:"event", new_data})
      }
      this.editingSort = !this.editingSort;
    },
  },
  data () {
    this.getData()
    return {
      d:0,
      name:false,
      image:false,
      loaded:false,
      events:[],
      keys: ["id", "image", "fb", "edit"],
      options:{
        headings:{"image":"Картинка","fb":"Ссылка на FB"},
        perPage: 50 
      },
      editingSort:false,
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>

