"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = (0, express_1.default)();
router.get('/validate', extractJWT_1.default, user_1.default.validateToken);
router.post('/register', user_1.default.register);
router.post('/login', user_1.default.login);
router.get('/users', user_1.default.getAllUsers);
module.exports = router;
