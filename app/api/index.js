import express from 'express';
import sessionsApi from './sessions';
import usersApi from './users';
import messagesApi from './messages';
const router = express.Router();
router.use('/sessions', sessionsApi);
router.use('/users', usersApi);
router.use('/messages', messagesApi);
export default router;
