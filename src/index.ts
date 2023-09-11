import express from 'express'
import diaryRouter from './routes/diares'

const app = express()
// add a middleware to transform req.body to json
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('ping-----')
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
