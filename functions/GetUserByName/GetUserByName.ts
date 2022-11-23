import { Handler } from '@netlify/functions'
import { getUserByNameService } from '../Helpers/Services/User/User.service'

export const handler: Handler = async (event, context) => {
  const name = event?.queryStringParameters?.name || ''

  const user = await getUserByNameService(name)

  return {
    statusCode: 200,
    body: JSON.stringify(user),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type"
    },
  }
}
