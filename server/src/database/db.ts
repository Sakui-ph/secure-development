import mysqlPromise from 'mysql2/promise';
import { connectionString } from '../config/dbConfig';
import { LogError, LogType } from '../utils/logger';

export const makeConnection = async () => {
    let connection = null;
    if (connectionString !== undefined) {
        try {
            connection = await mysqlPromise.createConnection(
                connectionString as string,
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                LogError(
                    'Error connecting to database',
                    e,
                    LogType.TRANSACTION,
                );
            }
        }
    } else {
        throw new Error('Connection string is undefined');
    }

    return connection;
};
//TODO: fix this if you feel like it lol its 3 funcs that do p much the same thign
// if you don't want to return anything and the params need to be supplied
export async function executeDatabase(
    query: string,
    params: any[],
): Promise<any> {
    const connection = await makeConnection();
    if (connection != null) {
        try {
            await connection.execute(query, params);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return e.message;
            }
        }
    }
}

// if you don't want to return anything and the params don't need to be supplied
export async function queryDatabase(query: string, params: any): Promise<any> {
    const connection = await makeConnection();
    if (connection != null) {
        try {
            // query db and return the result
            await connection.query(query, params);
            return false; // idk why its false but im too scared to change it
        } catch (e: unknown) {
            if (e instanceof Error) {
                return e.message;
            }
        }
    }
}

// if you want to return something
export async function readFromDatabase(
    query: string,
    params: any,
): Promise<any> {
    const connection = await makeConnection();
    if (connection != null) {
        try {
            const result = await connection.query(query, params);
            return result[0];
        } catch (e: unknown) {
            if (e instanceof Error) {
                return e.message;
            }
        }
    }
}

export default {
    makeConnection,
    executeDatabase,
    queryDatabase,
    readFromDatabase,
};
