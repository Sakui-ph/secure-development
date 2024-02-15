import db from "./db"
import { buildUpdateQuery } from "../utils/queryBuilder";
import { User } from "../models/User";

class UserDB {
    find = async (projection : string, searchBy : Object) => {
        let searchParams : string = Object.keys(searchBy).map((key) => {
            var whereString = `${key} = '${searchBy[key as keyof Object]}'` 
            return whereString;
        }).join(" AND ");

        let result = await db.queryDatabase(`SELECT ${projection} FROM users WHERE ${searchParams}`, [])
        return result[0][0];
    }

    create = async (user : User) => {
        const query : string = "INSERT INTO users (prefix_id, first_name, last_name, email, phone_number, profile_picture, password) "
        const values : string = `VALUES 
        ('${user.prefix_id}', 
        '${user.first_name}', 
        '${user.last_name}', 
        '${user.email}', 
        '${user.phone_number}', 
        '${user.profile_picture}', 
        '${user.password}')`

        var result = await db.queryDatabase(query + values, []);
        console.log(result)
        return result[0][0];
    }
}

export default new UserDB();


