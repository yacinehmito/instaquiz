import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import router from './router'

const app = express()

app.use(cors())
app.use(logger('dev'))

app.use('/api', router)

export default app
