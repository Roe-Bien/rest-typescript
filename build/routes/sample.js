"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sample_1 = __importDefault(require("../controllers/sample"));
const router = (0, express_1.default)();
router.get('/ping', sample_1.default.healthCheck);
exports.default = router;
