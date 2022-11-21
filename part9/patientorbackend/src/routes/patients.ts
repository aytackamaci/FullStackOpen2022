import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNoSssn());
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;