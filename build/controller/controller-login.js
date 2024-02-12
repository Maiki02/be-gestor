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
exports.registerWithGoogle = exports.registerUser = exports.loginUser = void 0;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = process.env.JWT_SECRET || '';
console.log(jwtSecret);
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*const { email, password } = req.body;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password, });
      console.log(data)

      if(error?.status==400){
        return res.status(400).json({ message: 'Credenciales incorrectas' });
      }
      
  
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error });
    }*/
    try {
        // Aquí puedes manejar la autenticación por email, como verificar credenciales, etc.
        // Una vez que el usuario se autentica correctamente, puedes generar tokens JWT y refresh tokens.
        // Generar token JWT
        const token = jwt.sign({ usuario: req.body.email }, 'tu_secreto', { expiresIn: '1h' });
        // Generar refresh token (si es necesario)
        // Devolver tokens al cliente
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error durante la autenticación por email' });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*    const { email, password } = req.body;
        try {
            const response = await supabase.auth.signUp({ email, password });
    
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error });
        }*/
});
exports.registerUser = registerUser;
const registerWithGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Aquí puedes manejar la autenticación por Google.
        // Una vez que el usuario se autentica correctamente, puedes generar tokens JWT y refresh tokens.
        // Generar token JWT
        const token = jwt.sign({ usuario: req.body.googleIdToken }, 'tu_secreto', { expiresIn: '1h' });
        // Generar refresh token (si es necesario)
        // Devolver tokens al cliente
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error durante la autenticación por Google' });
    }
});
exports.registerWithGoogle = registerWithGoogle;
