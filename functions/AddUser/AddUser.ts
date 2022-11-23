import { Handler } from '@netlify/functions'
import { validateAdminToken, validateJwtToken } from '../Helpers/Services/Authentication/AuthenticationService';
import { addUserService } from '../Helpers/Services/User/User.service'

// ONLY ADMIN CAN ADD A USER
export const handler: Handler = async (event: any) => {
  let statusCode: number;
  let body;
  let token;
  const {name, password, roles, restaurantRoles, selectedRestaurant, jwtToken} = JSON.parse(event.body);

  if(await validateAdminToken(jwtToken) && await validateJwtToken(jwtToken)) {
    const newUser = await addUserService({
      name,
      password,
      roles,
      restaurantRoles,
      selectedRestaurant
    })

    statusCode = 201
    body = newUser
    token = jwtToken
  } else {
    statusCode = 400
    body = 'Invalid Token'
    token = 'INVALID'
  }

  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Authorization": `Bearer ${token}`
    },
  }
}
