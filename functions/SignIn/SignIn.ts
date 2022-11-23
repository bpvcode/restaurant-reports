import { Handler } from '@netlify/functions'
import { signInService } from '../Helpers/Services/Authentication/SignIn.service';

export const handler: Handler = async (event: any) => {
    const {name, password, restaurant} = JSON.parse(event.body);
    let statusCode = 200
    let newToken = "ERRO"

    let signedUser = await signInService(name,password, restaurant)

    if(signedUser.statusCode === 400){
        statusCode = signedUser.statusCode
    } else {
        newToken = signedUser.token
    }

    return {
      statusCode: statusCode,
      body: JSON.stringify(signedUser),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Authorization": `Bearer ${newToken}`
      },
    }
  }