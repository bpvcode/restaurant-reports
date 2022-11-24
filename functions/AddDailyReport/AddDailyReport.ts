import { Handler } from '@netlify/functions'
import { validateJwtToken } from '../Helpers/Services/Authentication/AuthenticationService';
import { addDailyReportService } from '../Helpers/Services/DailyReports/DailyReports.service';

export const handler: Handler = async (event: any, context) => {
  let statusCode: number;
  let body;
  let token;
  const {
    date,
    restaurant,
    totalRefeicoes,
    totalCaixa,
    totalMB,
    totalPlataformas,
    totalDespesasExtra,
    totalDinheiroEsperado,
    totalDinheiroReal,
    totalDesvios,
    jwtToken
  } = JSON.parse(event.body);

  statusCode = 201
  body = {
    date: date,
    restaurant,
    totalRefeicoes,
    totalCaixa,
    totalMB,
    totalPlataformas,
    totalDespesasExtra,
    totalDinheiroEsperado,
    totalDinheiroReal,
    totalDesvios,
  }
  token = jwtToken

  if(await validateJwtToken(jwtToken)) {
    const newDailyReport = await addDailyReportService({
      date,
      restaurant,
      totalRefeicoes,
      totalCaixa,
      totalMB,
      totalPlataformas,
      totalDespesasExtra,
      totalDinheiroEsperado,
      totalDinheiroReal,
      totalDesvios,
    })

    statusCode = 201
    body = newDailyReport
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
