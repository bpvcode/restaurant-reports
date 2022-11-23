import * as bcrypt from 'bcrypt'
import { Restaurants } from '../../Modals/RestaurantsEnum';
import { Roles } from '../../Modals/RolesEnum';
import * as jws from 'jws';
import * as dotenv from "dotenv";

export interface tokenPayload {
   id: number,
   name: string
   roles: Roles[],
   restaurantRoles: Restaurants[],
   selectedRestaurant: Restaurants,
   maxDate: Date,
}


export const generateSalt = async () => {
   return await bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string): Promise<string>  => {
   return bcrypt.hash(password, salt)
}

export const isPasswordValid = async (
   enteredPassword: string,
   salt: string,
   dbPassword: string,
 ): Promise<boolean> => {
   const hash = await bcrypt.hash(enteredPassword, salt);

   return hash === dbPassword;
   // We receive the password, then we want to hash the password based on the salt of the user
   // then we want to compare the hash password with the password store in db
 }

 export const generateJwtToken = (
   id: number,
   name: string,
   roles: Roles[],
   restaurantRoles: Restaurants[],
   selectedRestaurant: Restaurants
 ) => {
   const secret = process.env.JWT_SECRET
   const expiresIn = new Date().getTime() + (1*60*60*1000)

   return jws.sign({ // ExpiresIn default 1h
      header: { alg: 'HS256' },
      payload: {
         id, name, roles, restaurantRoles, selectedRestaurant, expiresIn
      },
      secret,
    });
 }

 // TODO - TO IMPLEMENT ON ALL BACKEND CALLS - INSTEAD SIGNIN
 export const validateJwtToken = (token: string) => {
   const decoded = jws.decode(token);
   const {expiresIn} = JSON.parse(decoded.payload)
   const dateNow = Math.round(Date.now() / 1000);

   if (dateNow > decoded.expiresIn) { // check if expiresIn is greater or minor than NOW
      console.error(`Token already expired. Date: ${dateNow}, Token Exp Date: ${expiresIn}`);
      return false
   }

   return jws.verify(token, 'HS256', process.env.JWT_SECRET); //check if signature matches with $JWT_SECRET
}

export const validateAdminToken = async (token: string) => {
   const decoded = jws.decode(token);
   const {roles} = JSON.parse(decoded.payload)

   return await roles.includes('admin') ? true : false
}

// TODO - NEED TO IMPLEMENT AND FIND BETTER STRATEGY TO REFRESH (LEARN ABOUT THIS)
// TODO - SHOULD WE REFRESH ON EVERY REQUESTS - AFTER VALIDATE THE TOKEN - (IF SO, WHEN 1 HOUR PASS WITHOUT REQUESTS, SHOULD NOT REFRESH) - ??????????????
// TODO - IS REFRESH THE SAME AS CREATE NEW TOKEN, OR SHOULD WE UPDATE THE LAST, OR SHOULD WE DESTROY THE LAST BEFORE CREATE THE NEW - ?????????????
export const refreshJwtToken = () => {
   // Hability to generate new token with new maxDate?
   // Attach this new token for each HTTP response successful?
      // If so, frontend will receive a new token, that should constantly store, for every backend call
}
