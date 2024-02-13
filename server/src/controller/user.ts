import express, {query, Request, Response} from 'express';
import { connectionString } from '../config/dbConfig';
import User from '../models/User';
import { makeConnection, queryDatabase } from '../database/db';

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
        await queryDatabase(query + values, []);
        res.send("User created");
    },
    getUser: async (req: Request, res: Response) : Promise<any> => {
        const projection : string = "prefix_id first_name, last_name, email, country, phone_number, profile_picture"
        const query : string = `SELECT ${projection} FROM users WHERE username = '${req.query.email}'`
        const result = await queryDatabase(query, []);
        console.log(result)
        res.send(result);
    },
    updateUser: async (req: Request, res: Response) : Promise<any> => {
        const updateUser : User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password, // hash this
            phone_number: req.body.phone_number,
            profile_picture: req.body.profile_picture
        }

        const query : string = `UPDATE users SET`
    },
}

export default module.exports;