import { Router } from 'express';
import authenticateToken from '../middlewares/securityMiddlewares';
import {
  createContract,
  retrieveContracts,
  toNewContractEntry,
} from '../services/contractServices';

const router = Router();

router.post('/', authenticateToken, (req, res) => {
  const { username } = req.body.verified_user;
  const contractEntry = toNewContractEntry(req.body);
  if (contractEntry.boss !== username) {
    res.status(400).json({
      message: 'Only bosses are allowed to make a contract.',
    });
    return;
  }
  createContract(contractEntry)
    .then(newContract => {
      res.status(200).json(newContract);
    })
    .catch(e => {
      res.status(400).json({ message: e.message });
    });
});

router.get('/', authenticateToken, (req, res) => {
  const { username } = req.body.verified_user;
  retrieveContracts(username)
    .then(c =>
      res.status(200).json({
        contracts: c,
      }),
    )
    .catch(e => {
      res.status(400).json({ message: e.message });
    });
});

export default router;
