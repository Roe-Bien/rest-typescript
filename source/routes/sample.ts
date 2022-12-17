import express from 'express';
import controller from '../controllers/sample';

const router = express();

router.get('/ping', controller.healthCheck);

export default router;
