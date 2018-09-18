<template>
  <div id="app">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Board</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>
    <!-- <nav id="topNav" class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="#"><ion-icon name="stats"></ion-icon> Board</a>
    </nav> -->
    <div class="container">
      <!-- <nav id="topNav" class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1"><ion-icon name="list-box"></ion-icon>{{data.name}}</span>
        <router-link class="nav-link ml-3 btn btn-primary" to="/listform">Add List</router-link>
      </nav> -->
      <!-- <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" v-bind:key="item" v-for="item in boards">
          <li class="nav-item"><router-link class="nav-link" to="/boards/:id">{{item.name}}</router-link></li>
        </ul>
      </div> -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      data: {}
    }
  }
}
</script>
<style lang="scss">
#app{font-size: .875rem;}
@import "~bootstrap/scss/bootstrap";

</style>
