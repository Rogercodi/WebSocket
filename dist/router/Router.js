"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getFrontendController_1 = require("../controllers/getFrontendController");
const router = express_1.default.Router();
const getFrontend = new getFrontendController_1.getFrontendController();
router.get('/', getFrontend.getFrontend.bind(getFrontend));
exports.default = router;
