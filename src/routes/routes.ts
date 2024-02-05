import { Router } from 'express';
import { ResponseI } from '../interfaces/responses';
import { CREATE_LABEL } from '../const/routes';
import { createLabel } from './controller-label';

export const router = Router();

router.get('/', (req,res)=> {
    res.status(200).json(createResponse('ok', 'success'));
})

router.post(CREATE_LABEL, createLabel);


function createResponse(status:string, message:string, data?:any): ResponseI {
    return {
      status: status,
      message: message,
      data: data
  };
}
