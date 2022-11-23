import { AddUserDto } from "../../Modals/AddUser.dto"
import { addUser, getAllUsers, getUserByName } from "../../Repositories/User.repository"
import { generateSalt, hashPassword } from "../Authentication/AuthenticationService"

export const getAllUsersService = async () => {
   return await getAllUsers()
}

export const getUserByNameService = async (name: string) => {
   return await getUserByName(name)
}

export const addUserService = async (addUserDto: AddUserDto) => {
   const salt = await generateSalt()
   const newPassword = await hashPassword(addUserDto.password, salt)

   return await addUser(addUserDto, salt, newPassword)
}