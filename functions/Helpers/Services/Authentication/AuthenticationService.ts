import * as bcrypt from 'bcrypt'

export const generateSalt = async () => {
   return await bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string): Promise<string>  => {
   return bcrypt.hash(password, salt)
}
