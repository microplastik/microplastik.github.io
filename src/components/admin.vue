<template>
  <div class="admin-container">
    <router-view :app={app}></router-view>
  </div>
</template>

<script>


export default {
  name: 'login',
  props:{app:Object},
  data () {
    this.app.app.hideNav()
    return {}
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background:#fff !important;
}
.admin-container, main {
  width:100%;
  height:100%;
  position:fixed;
  z-index:200;
  background:#fff;
}
.admin-table-container {
  position: fixed;
  width: calc(100% - 40px);
  left: 20px;
  top: 120px;
  color: black;
  display:flex;
  text-align:left;
  overflow:scroll;
  height: 600px;
  z-index:2000000000;
}
.item-editor-item textarea {
  padding: 5px 10px;
  height:120px;
  margin:10px;
  margin-left:0;
  width:500px;
  display:flex;
  flex-flow:grid;
}
.save-button {
  width: 200px;
  padding: 10px;
  line-height: 50px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  font-size: 24px;
}
.create-item {
  position: absolute;
  right: 10px;
  margin-top: 22px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  cursor:pointer;
  z-index:1000;
}
.item-editor-item label {
  border-bottom:1px solid black;
}
.table-edit-item {
  cursor:pointer;
  text-decoration:underline;
}
</style>

