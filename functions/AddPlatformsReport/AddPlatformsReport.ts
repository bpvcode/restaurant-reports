import { Handler } from '@netlify/functions'
import { validateJwtToken } from '../Helpers/Services/Authentication/AuthenticationService';
import { addPlatformsReportService } from '../Helpers/Services/DailyReports/DailyReports.service';

export const handler: Handler = async (event: any, context) => {
  let statusCode: number;
  let body;
  let token;
  const {
    date,
    restaurant,
    totalUber,
    totalBolt,
    totalGlovo,
    totalZomato,
    jwtToken
  } = JSON.parse(event.body);

  statusCode = 201
  body = {
    date: date,
    restaurant,
    totalUber,
    totalBolt,
    totalGlovo,
    totalZomato,
    jwtToken
  }
  token = jwtToken

  if(await validateJwtToken(jwtToken)) {
    const newPlatformsReport = await addPlatformsReportService({
      date,
      restaurant,
      totalUber,
      totalBolt,
      totalGlovo,
      totalZomato,
    })

    statusCode = 201
    body = newPlatformsReport
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
