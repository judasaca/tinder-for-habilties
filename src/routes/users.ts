import express from 'express';
import { authenticateUser, createUser } from '../services/userServices';
import toNewUser from '../utils/usersUtils';
import authenticateToken from '../middlewares/securityMiddlewares';

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
      console.log(error);
      res
        .json({
          status: 'failed',
          message: error,
        })
        .status(400);
    });
});

router.get('/protected_endpoint', authenticateToken, (req, res) => {
  res.json(req.body).status(200);
});

export default router;
