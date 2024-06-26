import UserModel from '../model/User.model.js'
import Location from '../model/Location.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';

/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req,res){

    try {
        const { username, password, profile, email,role } = req.body;        

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({ error : "Please use unique username"});

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function(err, email){
                if(err) reject(new Error(err))
                if(email) reject({ error : "Please use unique Email"});

                resolve();
            })
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email,
                                role:role || 0
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error);
    }

}


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req,res){
    
    const { username } = req.params;

    try {
        
        if(!username) return res.status(501).send({ error: "Invalid Username"});

        UserModel.findOne({ username }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());
            // const { password, ...rest } = user;

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }

}


/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req,res){
    try {
        
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ msg : "Record Updated...!"});
            })

        }else{
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}


/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
   if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}


export async function createLocation(req, res) {
    try {
        const { name,longitude, latitude } = req.body;

        // Create a new Location document
        const newLocation = new Location({
            name:name,
            longitude: longitude,
            latitude: latitude
        });

        // Save the newLocation document to the database
        await newLocation.save();

        // Sending a response back indicating success
        res.status(201).json({ message: "Location stored successfully.", location: newLocation });
    } catch (error) {
        // If an error occurs during the process
        console.error("Error storing location:", error);
        // Sending an error response back
        res.status(500).json({ error: "Failed to store location." });
    }
}

export async function getLocationByName(req, res) {
    try {
        const { name } = req.body;

        // Query the database to retrieve locations by name
        const locations = await Location.find({ name: name });

        // Sending the locations back as a response
        res.status(200).json(locations);
    } catch (error) {
        // If an error occurs during the process
        console.error("Error fetching locations:", error);
        // Sending an error response back
        res.status(500).json({ error: "Failed to fetch locations." });
    }
}

export async function updateLocation(req, res) {
    try {
        const { name, longitude, latitude } = req.body;

        // Check if the required parameters are present
        if (!name) {
            return res.status(400).json({ error: "Name parameter is missing in the request body." });
        }

        // Find the location by name
        let location = await Location.findOne({ name: name });

        // If location is not found
        if (!location) {
            return res.status(404).json({ error: "Location not found." });
        }

        // Update the location fields
        if (longitude) {
            location.longitude = longitude;
        }
        if (latitude) {
            location.latitude = latitude;
        }

        // Save the updated location to the database
        await location.save();

        // Sending a response back indicating success
        res.status(200).json({ message: "Location updated successfully.", location: location });
    } catch (error) {
        // If an error occurs during the process
        console.error("Error updating location:", error);
        // Sending an error response back
        res.status(500).json({ error: "Failed to update location." });
    }
}


export async function getUserByUeId(req, res) {
    try {
        const { ue_id } = req.body;

        if (!ue_id) {
            return res.status(400).json({ error: "ue_id parameter is missing in the request." });
        }

        // Query the database to retrieve the user by ue_id
        const user = await UserModel.findOne({ ue_id: ue_id });

        if (!user) {
            return res.status(404).json({ error: "User with the provided ue_id not found." });
        }

        // Sending the user back as a response
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ue_id:", error);
        // Sending an error response back
        res.status(500).json({ error: "Failed to fetch user by ue_id." });
    }
}

/** GET: http://localhost:8080/api/users */
export async function getAllUsers(req, res) {
    try {
        // Query the database to retrieve all users
        const users = await UserModel.find();

        // Sending the users back as a response
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        // Sending an error response back
        res.status(500).json({ error: "Failed to fetch all users." });
    }
}


export async function getAllLocations(req, res) {
    try {
        // Query the database to retrieve all locations
        const locations = await Location.find();

        // Sending the locations back as a response
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching all locations:", error);
        // Sending an error response back
        res.status(500).json({ error: "Failed to fetch all locations." });
    }
}