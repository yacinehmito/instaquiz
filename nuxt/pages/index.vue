<template>
  <section class="container">
    <h1>Instaquiz</h1>
    <p v-if="serverMessage">
      The server sends from HTTP: {{ serverMessage }}
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      serverMessage: ''
    }
  },
  created() {
    this.$axios.get('/hello').then(response => {
      this.serverMessage = response.data.message
    })
  }
}
</script>

<style>
</style>
