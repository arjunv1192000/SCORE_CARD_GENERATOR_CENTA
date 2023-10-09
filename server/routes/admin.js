import express from 'express'
const router=express.Router()
import adminController from '../controller/admincontroller.js'

router.post('/adminlogin',adminController.AdminLogin)
router.post('/adduserdata',adminController.Adduserdata)
router.get('/userdata',adminController.Getuserdata)
router.post('/gneratecard',adminController.GenerateCard)
router.get('/scorecard',adminController.ViewCard)


export default router;