import { Restaurants } from "./RestaurantsEnum"
import { Roles } from "./RolesEnum"

export interface AddUserDto {
    name: string
    password: string
    roles: Roles[]
    restaurantRoles: Restaurants[]
    selectedRestaurant: Restaurants
}