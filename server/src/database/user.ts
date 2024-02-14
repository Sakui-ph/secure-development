import db from "./db"

class UserDB {
    find = async (projection : string, searchBy : Object) => {
        let searchParams : string = Object.keys(searchBy).map((key) => {
            var whereString = `${key} = '${searchBy[key as keyof Object]}'` 
            return whereString;
        }).join(" AND ");

        let result = await db.queryDatabase(`SELECT ${projection} FROM users WHERE ${searchParams}`, [])
        return result[0][0];
    }
}

export default new UserDB();


