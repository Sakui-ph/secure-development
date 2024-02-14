import mysqlPromise from "mysql2/promise"
import { connectionString } from "../config/dbConfig"
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export const makeConnection = async () => {
    let connection = null
    if (connectionString !== undefined) {
        try {
            connection = await mysqlPromise.createConnection(connectionString as string)
        }
        catch (e : unknown) {
            if (e instanceof Error)
            {
                throw new Error(e.message);
            }
        }
    }
    else { 
        throw new Error("Connection string is undefined")
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
                result = e;
            }
        }
    }
        
    return result;
}


export default {makeConnection, queryDatabase};
