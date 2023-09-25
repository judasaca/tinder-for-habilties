import express from 'express';
import { authenticateUser, createUser } from '../services/userServices';
import toNewUser from '../utils/usersUtils';

const router = express.Router();

router.post('/', (req, res) => {
  const newUserInfo = toNewUser(req.body);
  createUser(newUserInfo)
    .then(() =>
      res
        .json({
          status: 'created',
        })
        .status(200),
    )
    .catch(e => {
      console.log(e);
      res
        .json({
          status: 'failed',
        })
        .status(400);
    });
});

router.post('/login', (req, res) => {
  const userInfo = toNewUser(req.body);
  authenticateUser(userInfo)
    .then(token => {
      res.json({
        status: 'success',
        token,
      });
    })
    .catch(error => {
      res.status(400).json({
        status: 'failed',
        message: error.message,
      });
    });
});

export default router;
