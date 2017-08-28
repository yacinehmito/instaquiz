// A nice abstraction using Vue event system
// TODO find a better place to put this (mixin? plugin? something else?)

import Vue from 'vue'

// String mode sends and receives raw data
// JSON mode send and receives JSON with a type and a payload
const implementedModes = ['string', 'json']

// TODO handle errors properly
// TODO allow removing handlers

function VueWebSocket(url, mode = 'json') {
  if (!implementedModes.includes(mode)) {
    throw Error(`Mode ${mode} unimplemented`)
  }

  function createSocket() {
    this.ws = new window.WebSocket(url)
    globalBus.$emit('state-change', 'connecting')

    this.ws.onopen = event => {
      globalBus.$emit('state-change', 'open', event)
    }

    this.ws.onclose = event => {
      globalBus.$emit('state-change', 'close', event)
    }
  }

  const dataBus = new Vue()
  const globalBus = new Vue()

  globalBus.$on('state-change', (state, ...args) => {
    globalBus.$emit(state, ...args)
  })

  // Available events are:
  // - 'state-change' when the state of the sockets changes
  // - 'connecting' when the socket is connecting
  // - 'open' when the socket is opened
  // - 'closing' when the socket is closing
  // - 'closed' when the socket is closed
  // - 'data' when the socket receives a message
  // - 'unknown-type' when the socket receives a message that has a type without handlers (json mode only)
  this.on = function(type, handler) {
    globalBus.$on(type, handler)
  }

  this.close = function() {
    globalBus.$emit('state-change', 'closing')
    this.ws.close()
  }

  if (mode === 'string') {
    this.open = function() {
      createSocket.call(this)
      this.ws.onmessage = msg => {
        globalBus.$emit('data', msg.data)
      }
    }
    this.onData = function() {
      // TODO handle this properly
      throw Error('onData unavailable in string mode')
    }

    this.send = function(data) {
      this.ws.send(data)
    }
  } else if (mode === 'json') {
    const handledEvents = new Set()
    this.open = function() {
      createSocket.call(this)
      this.ws.onmessage = msg => {
        // TODO find a way to put the metadata somewhere

        // TODO parsing handle failure
        const data = JSON.parse(msg.data)
        if (!data.type || typeof data.type !== 'string') {
          // TODO handle type mismatch gracefuly
          throw Error('Data should have a type property')
        }
        globalBus.$emit('data', data)
        dataBus.$emit(data.type, data.payload)
        if (!handledEvents.has(data.type)) {
          globalBus.$emit('unhandled-type', data)
        }
      }
    }

    // onData matches against the type property in the message data
    // as if it were the event name
    this.onData = function(type, handler) {
      handledEvents.add(type)
      dataBus.$on(type, handler)
    }

    this.send = function(type, payload) {
      // TODO handle serializing failure
      this.ws.send(
        JSON.stringify({
          type,
          payload
        })
      )
    }
  }
}

export default VueWebSocket
