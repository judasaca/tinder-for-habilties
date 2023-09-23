import { Router } from 'express';
import authenticateToken from '../middlewares/securityMiddlewares';
import { retrieveActiveAtransactions } from '../services/transactionServices';

const router = Router();

router.get('/active', authenticateToken, (req, res) => {
  const { username } = req.body.verified_user;

  retrieveActiveAtransactions(username)
    .then(transactions => {
      res.status(200).json({
        active_transactions: transactions,
      });
    })
    .catch(e => {
      res.status(400).json({
        message: e.message,
      });
    });
});

export default router;
