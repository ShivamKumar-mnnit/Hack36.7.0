import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import UserModel from '../model/User.model.js'


/** auth middleware */
export default async function Auth(req, res, next){
    try {
        
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}


export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}

// export const isAdmin = async (req, res, next) => {
//     try {
//       const user = await UserModel.findById(req.user._id);
//       if (user.role !== 1) {
//         // return res.status(401).send({
//         //   success: false,
//         //   message: "UnAuthorized Access",
//       return res.redirect("/");
     
//       } else {
//         next();
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(401).send({
//         success: false,
//         error,
//         message: "Error in admin middelware",
//       });
//     }
//   };


export const isUser = async (req, res, next) => {
  try {
    const { username } = req.body; // Assuming username is stored in req.user.username
    const user = await UserModel.findOne({ username: username });
    if (!user || user.role !== 0) {
      return res.status(401).send({message:"You are not User"});
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};


export const isAdmin = async (req, res, next) => {
    try {
      const { username } = req.body; // Assuming username is stored in req.user.username
      const user = await UserModel.findOne({ username: username });
      if (!user || user.role !== 1) {
        return res.status(401).send({message:"You are not admin"});
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };
export const isHospital = async (req, res, next) => {
    try {
      const { username } = req.body; // Assuming username is stored in req.user.username
      const user = await UserModel.findOne({ username: username });
      if (!user || user.role !== 2) {
        return res.status(401).send({message:"You are not hospital"});
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };
export const isPolice = async (req, res, next) => {
    try {
      const { username } = req.body; // Assuming username is stored in req.user.username
      const user = await UserModel.findOne({ username: username });
      if (!user || user.role !== 3) {
        return res.status(401).send({message:"You are not Police"});
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };
  