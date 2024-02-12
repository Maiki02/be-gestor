import { Request, Response } from "express";
import { Tokens } from "../interfaces/auth";
import { handleError } from "./controller";
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || '';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '';

export const loginWithEmail = async (req: Request, res: Response) => {
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
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error durante la autenticación por email' });
  }
}

export const registerWithEmail = async (req: Request, res: Response) => {
  try{


  } catch (error) {
    handleError(res, error, 'Error al registrar el usuario');
  }
};

export const registerWithGoogle = async (req: Request, res: Response) => {
  try {
    // Aquí puedes manejar la autenticación por Google.
    // Una vez que el usuario se autentica correctamente, puedes generar tokens JWT y refresh tokens.

    // Generar token JWT
    const token = jwt.sign({ usuario: req.body.googleIdToken }, 'tu_secreto', { expiresIn: '1h' });

    // Generar refresh token (si es necesario)

    // Devolver tokens al cliente
    res.json({ token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error durante la autenticación por Google' });
  }
}

export const getTokenAndRefreshToken = async (req: Request, res: Response) => {
  try{

  } catch (error) {
    handleError(res, error, 'Error al obtener el token');
  }
}

// Función para generar un token JWT
function generarToken(payload: any): string {  
  return jwtSecret==''? '': jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

// Función para generar un refresh token con una expiración más larga
function generarRefreshToken(): string {
  return refreshTokenSecret==''? '': jwt.sign({}, refreshTokenSecret, { expiresIn: '7d' }); // Generar refresh token con expiración de 7 días
}

// Función para verificar un token JWT
function verificarToken(token: string, clave:string): any {
  try{
    if(clave=='') return null;
    return jwt.verify(token, clave);
  } catch (error) {
    return null; // Token inválido
  }
}

// Función para actualizar un token JWT y devolver un nuevo refresh token
function actualizarToken(refreshToken: string, payload: any): Tokens | null {
  if (verificarToken(refreshToken, refreshTokenSecret)) {
      const newAccessToken = generarToken(payload); // Generar nuevo token JWT
      const newRefreshToken = generarRefreshToken(); // Generar nuevo refresh token
      return { accessToken: newAccessToken, refreshToken:newRefreshToken };
  } else {
      return null; // Refresh token inválido
  }
}