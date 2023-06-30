import express from 'express';
import { getConfiguration } from '../config/getConfig';
import { getFrontendController } from '../controllers/getFrontendController';

const router = express.Router();

const getFrontend = new getFrontendController()
router.get('/', getFrontend.getFrontend.bind(getFrontend));

export default router;