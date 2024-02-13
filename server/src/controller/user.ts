import express, {query, Request, Response} from 'express';
import { connectionString } from '../config/dbConfig';
import User from '../models/User';
import { makeConnection, queryDatabase } from '../database/db';

module.exports = {
    createUser: async (req: Request, res: Response) : Promise<any> => {
        const newUser : User = {
            prefix_id: 100,
            username: "JohnDoe",
            full_name: "John Doe",
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@gmail.com",
            password: "wew",
            phone_number: "09950135422",
            profile_picture: "test"
        }

        const query : string = "INSERT INTO users (prefix_id, username, first_name, last_name, email, phone_number, profile_picture, password) "
        const values : string = `VALUES ('${newUser.prefix_id}', '${newUser.username}', '${newUser.first_name}', '${newUser.last_name}', '${newUser.email}', '${newUser.phone_number}', '${newUser.profile_picture}', '${newUser.password}')`
        console.log(query + values);
        await queryDatabase(query + values, []);
    },
    getUser: async (req: Request, res: Response) : Promise<any> => {
        const projection : string = "prefix_id, username, first_name, last_name, email, country, phone_number, profile_picture"
        const query : string = `SELECT ${projection} FROM users WHERE username = '${req.query.username}'`
        const result = await queryDatabase(query, []);
        console.log(result)
        res.send(result);
    },
    updateUser: async (req: Request, res: Response) : Promise<any> => {
        const newUser : User = {
            prefix_id: 100,
            username: "JohnDoe",
            full_name: "John Doe",
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@gmail.com",
            password: "wew",
            phone_number: "09950135422",
            profile_picture: "test"
        }
    },
}

export default module.exports;