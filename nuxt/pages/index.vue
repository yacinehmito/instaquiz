<template>
  <section class="container">
    <h1>Instaquiz</h1>
    <p v-if="serverMessage">
      The server sends from HTTP: {{ serverMessage }}
    </p>
    <template v-if="ws">
      <ul v-if="wsMessages.length > 0">
        <li v-for="(msg, index) in wsMessages" :key="index">
          {{ msg }}
         </li>
      </ul>
    </template>
    <button @click="sendMessage()">Send message</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      serverMessage: '',
      wsMessages: [],
      ws: null,
      counter: 0
    }
  },
  created() {
    this.$axios.get('/hello').then(response => {
      this.serverMessage = response.data.message
    })
    if (process.browser) {
      const ws = new window.WebSocket('ws://localhost:3000')
      console.log(ws)
      ws.onopen = () => {
        this.ws = ws
      }
      ws.onmessage = msg => {
        this.wsMessages.push(msg.data)
      }
    }
  },
  methods: {
    sendMessage() {
      if (this.ws) {
        this.ws.send(`${this.counter}`)
        this.counter++
      }
    }
  }
}
</script>

<style>
</style>
