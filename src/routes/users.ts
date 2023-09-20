import express from 'express';
import { createUser } from '../services/userServices';
import toNewUser from '../utils/usersUtils';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const newUserInfo = toNewUser(req.body);
    createUser(newUserInfo)
      .then(() => res.send('created'))
      .catch(e => {
        console.log(e);
      });
  } catch {
    res.sendStatus(401);
  }
});

export default router;
