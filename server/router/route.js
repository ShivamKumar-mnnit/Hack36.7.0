import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, {isAdmin,isUser,isHospital,isPolice, localVariables } from '../middleware/auth.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
router.route('/adminlogin').post(controller.verifyUser,isAdmin,controller.login); // login in app
router.route('/hospitallogin').post(controller.verifyUser,isHospital,controller.login); // login in app
router.route('/policelogin').post(controller.verifyUser,isPolice,controller.login); // login in app



router.route('/location').post(controller.createLocation); // saving cars locations



/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


router.route('/idLocation').get(controller.getUserByUeId) // user with username
router.route('/getlocation').get(controller.getLocationByName); // register user
router.route('/getalllocation').get(controller.getAllLocations); // register user
router.route('/getallusers').get(controller.getAllUsers); // register user


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password

router.route('/putlocation').put(controller.updateLocation); // register user


export default router;