import express, {query, Request, Response} from 'express';
import { connectionString } from '../config/dbConfig';
import User from '../models/User';
import { makeConnection, queryDatabase } from '../database/db';

module.exports = {
    createUser: async (req: Request, res: Response) : Promise<any> => {
        const newUser : User = {
            prefix_id: 100,
            username: "JohnDoe",
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@gmail.com",
            password: "wew",
            country: "CA",
            phone_number: "09950135422",
            profile_picture: "test"
        }

        const query : string = "INSERT INTO users (prefix_id, username, first_name, last_name, email, country, phone_number, profile_picture, password) "
        const values : string = `VALUES ('${newUser.prefix_id}', '${newUser.username}', '${newUser.first_name}', '${newUser.last_name}', '${newUser.email}', '${newUser.country}', '${newUser.phone_number}', '${newUser.profile_picture}', '${newUser.password}')`
        console.log(query + values);
        await queryDatabase(query + values, []);
    },
}

export default module.exports;