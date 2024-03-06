import { User } from '../models/User';

export function buildUpdateQuery(
    user: User,
    allowedKeys: string[],
    queryBy: string,
): string {
    const keys = Object.keys(user);

    const query: string = `UPDATE users SET `;

    const values: string[] = keys.reduce(
        (accumulator: string[], key: string) => {
            const val = user[key as keyof User];
            if (val !== undefined && allowedKeys.includes(key)) {
                accumulator.push(`${key} = '${val}'`);
            }
            return accumulator;
        },
        [],
    );

    return query + values.join(', ') + ` WHERE ${queryBy}`;
}

export function convertSearchByToString(searchBy: object) {
    const searchParams: string = Object.keys(searchBy)
        .map((key) => {
            const whereString = `${key} = '${searchBy[key as keyof object]}'`;
            return whereString;
        })
        .join(' AND ');

    return searchParams;
}
