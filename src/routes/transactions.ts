import { Router } from 'express';
import authenticateToken from '../middlewares/securityMiddlewares';
import {
  acceptTransaction,
  retrieveActiveAtransactions,
} from '../services/transactionServices';

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

router.post('/accept/:transactionId', authenticateToken, (req, res) => {
  const transactionId = req.params.transactionId;
  if (transactionId === null) {
    res.status(400);
    return;
  }
  const realTransactionId = parseInt(transactionId);
  acceptTransaction(realTransactionId, req.body.verified_user.username)
    .then(transaction => {
      res.status(200).json({
        accpeted_transaction: transaction,
      });
    })
    .catch(error => {
      res.status(400).json({
        message: error.message,
      });
    });
});

export default router;
