import mysqlPromise from "mysql2/promise"
import { databaseConfig } from "../config/dbConfig"
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export const makeConnection = async () => {
    const connection = await mysqlPromise.createConnection(databaseConfig)
    return connection;
}

export async function queryDatabase(query: string, params: any[]) : Promise<any> {
    const connection = await makeConnection();
    var result = await connection.execute(query, params)
    return result;
}

export default {makeConnection, queryDatabase};
