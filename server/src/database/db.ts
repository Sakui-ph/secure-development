import mysqlPromise from 'mysql2/promise';
import { connectionString } from '../config/dbConfig';
import { LogError } from '../utils/logger';

export const makeConnection = async () => {
    let connection = null;
    if (connectionString !== undefined) {
        try {
            connection = await mysqlPromise.createConnection(
                connectionString as string,
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                if (e instanceof Error) {
                    LogError(
                        e.stack ? e.stack : e.message,
                        'Error connecting to database',
                    );
                }
                throw new Error(e.message);
            }
        }
    } else {
        throw new Error('Connection string is undefined');
    }

    return connection;
};

export async function queryDatabase(
    query: string,
    params: any[],
): Promise<any> {
    let result = null;
    const connection = await makeConnection();
    if (connection != null) {
        try {
            result = await connection.execute(query, params);
            console.log(result[1]);
        } catch (e: unknown) {
            if (e instanceof Error) {
                LogError(
                    e.stack ? e.stack : e.message,
                    'Error querying database',
                );
            }
        }
    }

    return result;
}

export default { makeConnection, queryDatabase };
