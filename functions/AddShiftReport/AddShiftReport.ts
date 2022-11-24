import { Handler } from '@netlify/functions'
import { validateJwtToken } from '../Helpers/Services/Authentication/AuthenticationService';
import { addShiftReportService } from '../Helpers/Services/DailyReports/DailyReports.service';

export const handler: Handler = async (event: any, context) => {
  let statusCode: number;
  let body;
  let token;
  const {
    date,
    shift,
    restaurant,
    responsavel,
    notas,
    totalRefeicoes,
    totalCaixa,
    totalMB,
    totalPlataformas,
    totalDespesasExtra,
    totalDinheiroEsperado,
    totalDinheiroReal,
    jwtToken
  } = JSON.parse(event.body);

  statusCode = 201
  body = {
    date: date,
    shift,
    restaurant,
    responsavel,
    notas,
    totalRefeicoes,
    totalCaixa,
    totalMB,
    totalPlataformas,
    totalDespesasExtra,
    totalDinheiroEsperado,
    totalDinheiroReal,
  }
  token = jwtToken

  if(await validateJwtToken(jwtToken)) {
    const t = shift === 'LUNCH' ? true : false
    const newShiftReport = await addShiftReportService({
      date,
      shift,
      restaurant,
      responsavel,
      notas,
      totalRefeicoes,
      totalCaixa,
      totalMB,
      totalPlataformas,
      totalDespesasExtra,
      totalDinheiroEsperado,
      totalDinheiroReal,
    })

    statusCode = 201
    body = newShiftReport
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
