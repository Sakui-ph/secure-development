import express, {query, Request, Response} from 'express';
import { connectionString } from '../config/dbConfig';
import User from '../models/User';
import { makeConnection, queryDatabase } from '../database/db';
import { buildUpdateQuery } from '../utils/queryBuilder';
module.exports = {
    createUser: async (req: Request, res: Response) : Promise<any> => {
        console.log(req.body);
        const newUser : User = {
            prefix_id: 101,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password, // hash this
            phone_number: req.body.phone_number,
            profile_picture: req.body.profile_picture
        }

        const query : string = "INSERT INTO users (prefix_id, first_name, last_name, email, phone_number, profile_picture, password) "
        const values : string = `VALUES 
        ('${newUser.prefix_id}', 
        '${newUser.first_name}', 
        '${newUser.last_name}', 
        '${newUser.email}', 
        '${newUser.phone_number}', 
        '${newUser.profile_picture}', 
        '${newUser.password}')`

        console.log(query + values);
        var result = await queryDatabase(query + values, []);

        if (result instanceof Error) {
            res.status(500).send(result.name);
        }
        else {
            res.send("User created");
        }

        
    },
    getUser: async (req: Request, res: Response) : Promise<any> => {
        const projection : string = "prefix_id first_name, last_name, email, country, phone_number, profile_picture"
        const query : string = `SELECT ${projection} FROM users WHERE username = '${req.query.email}'`
        const result = await queryDatabase(query, []);
        console.log(result)
        res.send(result);
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