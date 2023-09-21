import express from 'express';
import { createUser } from '../services/userServices';
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

export default router;
