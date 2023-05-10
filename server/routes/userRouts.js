import express from 'express'
import { signupUser,loginUser,logoutUser,updateUserRole,deleteUser,getAllUser,getCurrentUser } from '../controllers/userController.js';
import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';

const router=express.Router();

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/getCurrUser').get(getCurrentUser);
// router.route('/admin/users').get(isAuthenticatedUser,isAdmin('admin'),getAllUser);
// router.route('/admin/user/:id').patch(isAuthenticatedUser,isAdmin('admin') ,updateUserRole)
//                                 .delete(isAuthenticatedUser,isAdmin('admin'),deleteUser);


export default router;   