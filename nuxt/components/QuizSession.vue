<template>
  <div>
    <template v-if="this.socketState === 'connecting'">
      Connecting
    </template>
    <template v-else-if="this.socketState === 'open'">
      <quiz-question
        :locked="!answering"
        :question="question"
        :answers="answers"
        @lock="onLock"
        @change="onChange"
      >
      </quiz-question>
      <div v-if="result">
        <h3>{{ result.success ? 'Bravo' : 'You\'ll do better next time' }}</h3>
      </div>
      <button v-if="answering" @click="answering = false">
        Send answers
      </button>
      <template v-else>
        <button @click="tryAgain()">
          Retry
        </button>
      </template>
      <h2>Server messages</h2>
      <ul>
        <li v-for="(msg, index) of serverMessages" :key="index">
          <pre>{{ msg }}</pre>
        </li>
      </ul>
    </template>
    <template v-else-if="this.socketState === 'closing'">
      Closing
    </template>
    <template v-else-if="this.socketState === 'closed'">
      Closed
    </template>
    <template v-else>
      Nothing
    </template>
  </div>
</template>

<script>
import QuizQuestion from '@/components/QuizQuestion'
import VueWebSocket from '@/components/VueWebSocket'

const allAnswers = [
  { id: 'a', text: 'Answer A' },
  { id: 'b', text: 'Answer B' },
  { id: 'c', text: 'Answer C' },
  { id: 'd', text: 'Answer D' },
  { id: 'e', text: 'Answer E' }
]

export default {
  components: {
    QuizQuestion
  },
  data() {
    return {
      ws: null,
      serverMessages: [],
      answering: true,
      question: '',
      answers: [],
      result: null,
      socketState: undefined
    }
  },
  created() {
    if (process.browser) {
      this.ws = new VueWebSocket('ws://localhost:3000')
      this.ws.on('state-change', state => (this.socketState = state))
      this.ws.onData('echo', () => undefined)
      this.ws.on('unknown-type', data => {
        console.log('Unknown type', data)
      })
      this.ws.on('data', msg => this.serverMessages.push(msg))

      this.ws.onData('result', payload => (this.result = payload))

      this.ws.open()
    }
  },
  mounted() {
    this.randomizeData()
  },
  methods: {
    onChange(answers) {
      this.ws.send('select', answers)
    },
    onLock(answers) {
      this.ws.send('submit', answers)
    },
    randomizeData() {
      this.question = 'What are the right answers? (tip: They are A and B)'
      const answers = []
      const nAnswers = 3 + Math.floor(Math.random() * 3)
      for (let i = 0; i < nAnswers; i++) {
        answers.push(allAnswers[i])
      }
      this.answers = answers
    },
    tryAgain() {
      this.answering = true
      this.result = null
      this.randomizeData()
    }
  }
}
</script>

<style>

</style>
