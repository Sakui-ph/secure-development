import {User} from "../models/User";

export function buildUpdateQuery(user : User, allowedKeys : string[], queryBy : string) : string {
    let keys = Object.keys(user);

    const query : string = `UPDATE users SET `

    let values : string[] = keys.reduce((accumulator : string[], key : string) => {
        let val = user[key as keyof User];
        if (val !== undefined && allowedKeys.includes(key)) {
            accumulator.push(`${key} = '${val}'`);
        }
        return accumulator;
    }, [])

    return query + values.join(", ") + ` WHERE ${queryBy}`;
}

export function convertSearchByToString(searchBy : Object) {
    console.log(searchBy)
    console.log("Keys = " + Object.keys(searchBy))
    let searchParams : string = Object.keys(searchBy).map((key) => {
        var whereString = `${key} = '${searchBy[key as keyof Object]}'` 
        return whereString;
    }).join(" AND ");

    return searchParams;
}