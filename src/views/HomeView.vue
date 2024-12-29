<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <header class="hero-section">
      <h1 class="display-4">Práctica 2</h1>
      <p class="lead">Práctica 2 del módulo VUE del diplomado en FullStack</p>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
