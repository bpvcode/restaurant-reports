import { AddUserDto } from "../../Modals/AddUser.dto"
import { addUser, getAllUsers, getUserByName } from "../../Repositories/User.repository"

export const getAllUsersService = async () => {
   return await getAllUsers()
}

export const getUserByNameService = async (name: string) => {
   return await getUserByName(name)
}

export const addUserService = async (addUserDto: AddUserDto) => {
   return await addUser(addUserDto)
}