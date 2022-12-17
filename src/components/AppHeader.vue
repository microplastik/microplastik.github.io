<template>
    <div>
      <b-navbar class="nav-header" placement="fixed" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/"></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav class="ml-auto">
            <router-link to="/">
              <li class="nav-item">microplastik.ru</li>
            </router-link>
            <router-link to="/admin/home">
              <li class="nav-item" right>Главная</li>
            </router-link>
            <router-link to="/admin/events">
              <li class="nav-item" right>События</li>
            </router-link>
            <router-link to="/admin/artists">
              <li class="nav-item" right>Артисты</li>
            </router-link>

          </b-navbar-nav>
          
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
  export default {
    name: 'app-header',
    props: {
      title: {
        default: 'Oxcart',
      },
      logo: {
        default: false,
      },
      back: {
        default: true,
      },
      menu: {
        default: true,
      },
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
    },
  }
</script>

<style >
  .nav-header,
  .navbar-brand,
  .form-control,
  .btn {
    font-size:18px !important;
  }
  .nav-header {
    z-index:10;
  }
  .nav-item {
    padding:10px;
  }
  .navbar-brand {
    font-size:24px;
    font-weight:bold;
  }
  .nav-header {
    background:#000
  }
</style>