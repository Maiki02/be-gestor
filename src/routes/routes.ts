import { Router } from 'express';
import { CREATE_LABEL, CREATE_REGISTER, DELETE_LABEL, DELETE_REGISTER, GET_LABELS_BY_SECTION, GET_REGISTERS_BY_SECTION, GOOGLE_USER, LOGIN_USER, REGISTER_USER, UPDATE_LABEL, UPDATE_REGISTER } from '../const/routes';
import { createLabel, deleteLabel, getLabelsBySection, updateLabel } from '../controller/controller-label';
import { createRegister, deleteRegister, getRegistersBySection, updateRegister } from '../controller/controller-register';
import { loginUser, registerUser, registerWithGoogle } from '../controller/controller-login';

export const router = Router();

router.get('/', (req,res)=> {
    res.status(200).json({status:'ok', message:'Hello World!'});
})

//--------- LOGIN ---------\\
router.post(LOGIN_USER, loginUser)
router.post(REGISTER_USER, registerUser)
router.get(GOOGLE_USER, registerWithGoogle)


//--------- LABELS ---------\\
router.post(CREATE_LABEL, createLabel);
router.put(UPDATE_LABEL, updateLabel);
router.delete(DELETE_LABEL, deleteLabel);
router.get(GET_LABELS_BY_SECTION, getLabelsBySection);

//--------- REGISTERS ---------\\
router.post(CREATE_REGISTER, createRegister);
router.put(UPDATE_REGISTER, updateRegister);
router.delete(DELETE_REGISTER, deleteRegister);
router.get(GET_REGISTERS_BY_SECTION, getRegistersBySection);