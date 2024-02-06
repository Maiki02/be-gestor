import { Request, Response } from "express";
import { supabase } from "../app";

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password, });
      console.log(data)

      if(error?.status==400){
        return res.status(400).json({ message: 'Credenciales incorrectas' });
      }
      
  
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error });
    }
}

export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const response = await supabase.auth.signUp({ email, password });

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const registerWithGoogle = async (req: Request, res: Response) => {
    try {
        const response = supabase.auth.signInWithOAuth({ provider: 'google' }).then(resG=>{
            console.log(resG)
            
            res.redirect(resG.data.url ?? '')
        });
        console.log(response)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const callBackGoogle = async (req: Request, res: Response) => {
    try {
        const response = supabase.auth.getSession();
        console.log(response)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

  
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