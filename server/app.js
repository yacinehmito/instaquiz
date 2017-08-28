import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import router from './router'
import expressWs from '@yacinehmito/express-ws'

const app = express()
expressWs(app)

app.use(cors())
app.use(logger('dev'))

app.use('/api', router)

const rightAnswers = ['a', 'b']

// Echo
app.ws('/', (ws, req) => {
  ws.on('message', msg => {
    const dataIn = JSON.parse(msg)
    ws.send(
      JSON.stringify({
        type: 'echo',
        payload: dataIn
      })
    )
    if (dataIn.type === 'submit') {
      const dataOut = {
        type: 'result',
        payload: {
          success:
            JSON.stringify(dataIn.payload) === JSON.stringify(rightAnswers), // Ugly hack for now
          solution: rightAnswers
        }
      }
      ws.send(JSON.stringify(dataOut))
    }
  })
})

export default app
