"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callBackGoogle = exports.registerWithGoogle = exports.registerUser = exports.loginUser = void 0;
const app_1 = require("../app");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { data, error } = yield app_1.supabase.auth.signInWithPassword({ email, password, });
        console.log(data);
        if ((error === null || error === void 0 ? void 0 : error.status) == 400) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const response = yield app_1.supabase.auth.signUp({ email, password });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.registerUser = registerUser;
const registerWithGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = app_1.supabase.auth.signInWithOAuth({ provider: 'google' }).then(resG => {
            var _a;
            console.log(resG);
            res.redirect((_a = resG.data.url) !== null && _a !== void 0 ? _a : '');
        });
        console.log(response);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.registerWithGoogle = registerWithGoogle;
const callBackGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = app_1.supabase.auth.getSession();
        console.log(response);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.callBackGoogle = callBackGoogle;
/* Ruta de redireccionamiento de Supabase OAuth
app.get('/auth/callback', async (req, res) => {
  const { error, user, session } = await supabase.auth.api.getUserByCookie(req);

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  if (user) {
    return res.status(200).json({ user, session });
  }

  return res.status(400).json({ message: 'No se pudo completar la autenticación' });
});*/ 
