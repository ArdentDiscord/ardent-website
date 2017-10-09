import express from 'express';
import authRouteHandler from './auth';

const router = express.Router();

router.get('/auth', authRouteHandler);
