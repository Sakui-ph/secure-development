import express, {query, Request, Response} from 'express';
import { connectionString } from '../config/dbConfig';
import {User} from '../models/User';
import { makeConnection, queryDatabase } from '../database/db';
import UserDB from '../database/user';
import { buildUpdateQuery } from '../utils/queryBuilder';
import { profile } from 'console';


module.exports = {
    createUser: async (req: Request, res: Response) : Promise<any> => {
        const prefix_id : number = req.body.prefix_id? req.body.prefix_id : 101;

        const newUser : User = {
            prefix_id: prefix_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password, // hash this
            phone_number: req.body.phone_number,
            profile_picture: req.body.profile_picture
        }

        // brb i refactor how client handles stuff
        console.log(req.body)
        console.log(req.body.profile_picture);
        console.log(newUser.profile_picture.type);
        
        try {
            const result = await UserDB.create(newUser);
            res.send(result).status(200);
        }
        catch (e) {
            console.log("Error creating user");
        }
    },
    getUser: (projection : string[], searchBy : string)  => {
        return async (req : Request, res : Response) : Promise<any> => {
            let projectionString : string = projection.join(", ");

            if (req.query.email === undefined && req.body.email === undefined) {
                res.status(500).send("Email is undefined");
                return;
            }
            
            if (projection === undefined) {
                res.status(500).send("Projection is undefined");
                return;
            }

            let email : string = req.query.email || req.body.email;
            
            UserDB.find(projectionString, {email: email}).then((result) => {
                res.send(result).status(200);
            })
        }
    },
    updateUser: async (req: Request, res: Response) : Promise<any> => {
        const columnNames = {
            first_name: "first_name",
            last_name: "last_name",
            email: "email",
            password: "password",
            phone_number: "phone_number",
            profile_picture: "profile_picture"
        }

        const updateUser : User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password, // hash this
            phone_number: req.body.phone_number,
            profile_picture: req.body.profile_picture
        }
        
        const query : string = buildUpdateQuery(updateUser, ["first_name", "last_name", "phone_number", "profile_picture"], "email");
        console.log(query);
        
        const result = await queryDatabase(query, []);
    },
}

export default module.exports;