import mysqlPromise from "mysql2/promise"
import { connectionString } from "../config/dbConfig"
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export const makeConnection = async () => {
    let connection = null
    try {
        connection = await mysqlPromise.createConnection(connectionString)
    }
    catch (e : unknown) {
        if (e instanceof Error)
        {
            console.log(e.message);
        }
    }

    return connection;
}

export async function queryDatabase(query: string, params: any[]) : Promise<any> {
    var result = null;
    const connection = await makeConnection();
    if (connection != null) {

        try {
            result = await connection.execute(query, params)
        }
        catch (e : unknown) {
            if (e instanceof Error)
            {
                console.log(e.message);
            }
        }
    }
        
    return result;
}


export default {makeConnection, queryDatabase};
