import express from 'express';
import diaryRouter from './routes/diares';
import userRouter from './routes/users';
import contractRouter from './routes/contract';

const app = express();
// add a middleware to transform req.body to json
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('ping-----');

  res.send('pong');
});

app.use('/api/diaries', diaryRouter);
app.use('/api/users', userRouter);
app.use('/api/contract', contractRouter);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
