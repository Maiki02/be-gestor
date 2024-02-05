import { Router } from 'express';
import { Response } from '../interfaces/responses';

export const router = Router();

router.get('/', (req,res)=> {
    res.status(200).json(createResponse('ok', 'success'));
})

function createResponse(status:string, message:string, data?:any): Response {
    return {
      status: status,
      message: message,
      data: data
  };
}
