import { AirtableTables, AirtableUserFields, getAirtableTable } from "./AirtableConfig";
import { User } from "../Modals/User";
import { AddUserDto } from "../Modals/AddUser.dto";

export const getAllUsers = async () => {
    const userTable = getAirtableTable(AirtableTables.USERS);
    let users: User[] = [];

    await userTable
        .select({
        fields: [AirtableUserFields.ID, AirtableUserFields.NAME, AirtableUserFields.ROLES, AirtableUserFields.RESTAURANT_ROLES]
        })
        .eachPage((records, next) => {
        records.forEach((record) => {
            users.push(record._rawJson.fields)
        });
        next()
        })
        .catch((error) => {
        return {
            statusCode: 500,
            body: error.message,
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Content-Type": "Application/json"
            }
        }
        })

    return users;
}

export const getUserByName = async (name: string) => {
    const userTable = getAirtableTable(AirtableTables.USERS);

    const record = await userTable
        .select({
            fields: [AirtableUserFields.ID, AirtableUserFields.NAME, AirtableUserFields.ROLES, AirtableUserFields.RESTAURANT_ROLES],
            filterByFormula: `SEARCH("${name}",{name})` // To select when `name` === `name`
        })
        .all()

    if(record.length === 0) {
        return {
            statusCode: 404,
            body: 'User not found',
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Content-Type": "Application/json"
            }
        }
    }

    return record[0]._rawJson.fields
}

export const addUser = async (newUser: AddUserDto, salt: string, newPassword: string) => {
    const userTable = getAirtableTable(AirtableTables.USERS);

    const record = await userTable
        .create([
            {
                fields: {
                    ...newUser,
                    salt,
                    password: newPassword
                }
            }
            ],
            {typecast: true} // If typecast is enabled, a new choice will be created if one does not exactly match.
        )
        .catch((error) => {
            return {
                statusCode: 500,
                body: error.message,
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Content-Type": "Application/json"
                }
            }
        })

    return {
        id: record[0].fields.id,
        name: record[0].fields.name,
        roles: record[0].fields.roles,
        restaurantRoles: record[0].fields.restaurantRoles,
        selectedRestaurant: record[0].fields.selectedRestaurant,
    }
}