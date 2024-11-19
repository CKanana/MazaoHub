import express from 'express';
import { initiateSTKPush, stkPushCallback } from '../controllers/mpesa.controller.js';
import { generateToken } from '../middleware/auth.middleware.js';


export const router = express.Router();
router.post('/stkPush', generateToken, initiateSTKPush);
router.post('/stkPushCallback/:Order_ID', stkPushCallback);