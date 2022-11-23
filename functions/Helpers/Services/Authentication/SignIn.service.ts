import { Restaurants } from "../../Modals/RestaurantsEnum"
import { User } from "../../Modals/User"
import { getUserByName } from "../../Repositories/User.repository"
import { generateJwtToken, isPasswordValid } from "./AuthenticationService"

export const signInService = async (enteredName: string, enteredPassword: string, enteredRestaurant: Restaurants) => {
    const user: User = await getUserByName(enteredName)

    const {id, name, password, roles, restaurantRoles, selectedRestaurant, salt} = user
    const isSelectedRestaurantValid = user.restaurantRoles.includes(enteredRestaurant) ? true : false

    if (!await isPasswordValid(enteredPassword, salt, password) || !isSelectedRestaurantValid){
        return {
            statusCode: 400,
            body: 'Invalid Credentials',
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Content-Type": "Application/json"
            }
        }
    }

    return {
        name,
        id,
        roles,
        restaurantRoles,
        selectedRestaurant,
        token : generateJwtToken(id, name, roles, restaurantRoles, selectedRestaurant)
    }

 }