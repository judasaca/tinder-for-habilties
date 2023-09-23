import express from 'express';
import diaryRouter from './routes/diares';
import userRouter from './routes/users';
import contractRouter from './routes/contract';
import transactionRouter from './routes/transactions';

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
app.use('/api/transaction', transactionRouter);
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
