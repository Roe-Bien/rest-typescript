import express from 'express';
import controller from '../controllers/user';

const router = express();

router.get('/validate', controller.validateToken);
router.get('/registers', controller.register);
router.get('/login', controller.login);
router.get('/users', controller.getAllUsers);

export = router;
