import express from 'express';
import sessionsApi from './sessions';
import usersApi from './users';
import cookieApi from './cookie-state';
const router = express.Router();
router.use('/sessions', sessionsApi);
router.use('/cookieState', cookieApi);
router.use('/users', usersApi);
export default router;
