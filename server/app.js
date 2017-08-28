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

let counter = 0
app.ws('/', (ws, req) => {
  ws.on('message', msg => {
    ws.send(`Server's message n° ${counter}; Client's message n° ${msg}`)
    counter++
  })
})

export default app
