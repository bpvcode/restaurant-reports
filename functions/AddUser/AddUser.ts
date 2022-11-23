import { Handler } from '@netlify/functions'
import { addUserService } from '../Helpers/Services/User/User.service'

export const handler: Handler = async (event: any) => {
  const {name, password, roles, restaurantRoles, selectedRestaurant} = JSON.parse(event.body);

  const newUser = await addUserService({
    name,
    password,
    roles,
    restaurantRoles,
    selectedRestaurant
  })

  return {
    statusCode: 201,
    body: JSON.stringify(newUser),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Authorization": "Bearer TOKEN"
    },
  }
}
