import { AddUserDto } from "../../Modals/AddUser.dto"
import { User } from "../../Modals/User"
import { addUser, getAllUsers, getUserByName } from "../../Repositories/User.repository"
import { generateSalt, hashPassword } from "../Authentication/AuthenticationService"

export const getAllUsersService = async () => {
   return await getAllUsers()
}

export const getUserByNameService = async (name: string) => {
   const user: User = await getUserByName(name)
   return {
      id: user.id,
      name: user.name,
      roles: user.roles,
      restaurantRoles: user.restaurantRoles
   }
}

export const addUserService = async (addUserDto: AddUserDto) => {
   const salt = await generateSalt()
   const newPassword = await hashPassword(addUserDto.password, salt)

   return await addUser(addUserDto, salt, newPassword)
}