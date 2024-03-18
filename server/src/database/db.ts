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

export async function executeDatabase(
    query: string,
    params: any[],
): Promise<any> {
    const connection = await makeConnection();
    if (connection != null) {
        try {
            await connection.execute(query, params);
            return false;
        } catch (e: unknown) {
            if (e instanceof Error) {
                return e.message;
            }
        }
    }
}

export async function queryDatabase(query: string, params: any): Promise<any> {
    const connection = await makeConnection();
    if (connection != null) {
        try {
            // query db and return the result
            await connection.query(query, params);
            return false;
        } catch (e: unknown) {
            if (e instanceof Error) {
                return e.message;
            }
        }
    }
}

export default { makeConnection, executeDatabase, queryDatabase };
