import express from 'express'
const router=express.Router()
import userController from '../controller/usercontroller.js'


router.post('/checkEmail',userController.UserLogin)
router.post('/verifyOTP',userController.Verification)
router.get('/getUserData',userController.ViewCard)


export default router;