import {Request, Response} from 'express';
import {User} from '../models/User';
import UserDB from '../database/user';


module.exports = {
    createUser: async (req: Request, res: Response) : Promise<any> => {
        const prefix_id : number = req.body.prefix_id? req.body.prefix_id : 101;

        const newUser : User = {
            prefix_id: prefix_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            profile_picture: req.body.profile_picture
        }

        try {
            const result = await UserDB.create(newUser);
            res.send(result).status(200);
        }
        catch (e) {
            console.log("Error creating user");
            res.status(500).send("Error creating user");
        }
    },
    getUser: (projection : string[], searchBy : string[]) => {
        return async (req : Request, res : Response) : Promise<any> => {
            if (req.query.email === undefined && req.body.email === undefined) {
                res.status(500).send("Email is undefined");
                return;
            }
            
            if (projection === undefined) {
                res.status(500).send("Projection is undefined");
                return;
            }

            let searchObject : Record<string, any> = {};
            
            searchBy.forEach((key) => {
                if (req.query[key] !== undefined) {
                    searchObject[key] = req.query[key];
                }
            })

            console.log(searchObject)
            
            UserDB.find(projection, searchObject).then((result) => {
                res.send(result).status(200);
            })
        }
    },
    updateUser: (projection : string[], searchBy : string[]) => {
        return async (req : Request, res : Response) : Promise<any> => {
            // TODO: Add check for if email they want to change to exists
            projection.forEach((key) => {
                if (req.body[key] === undefined || req.body[key] === null || req.body[key] === "") {
                    projection.splice(projection.indexOf(key), 1);  
                }
            })

            let searchObject : Record<string, any> = {};
            
            searchBy.forEach((key) => {
                if (req.body[key] !== undefined) {
                    searchObject[key] = req.body[key];
                }
            })

            const updateUser : User = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                phone_number: req.body.phone_number,
                profile_picture: req.body.profile_picture
            }
            
            const result = await UserDB.update(updateUser, projection, searchObject);
            res.send(result).status(200);  
        }
    },
}

export default module.exports;