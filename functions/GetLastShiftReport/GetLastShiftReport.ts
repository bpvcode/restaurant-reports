import { Handler } from '@netlify/functions'
import { Restaurants } from '../Helpers/Modals/RestaurantsEnum'
import { getLastShiftReportService } from '../Helpers/Services/ShiftReport/shiftReport'

export const handler: Handler = async (event, context) => {
  const restaurant = event?.queryStringParameters?.restaurant || ''

  const shift = await getLastShiftReportService(restaurant as Restaurants)
  return {
    statusCode: 200,
    body: JSON.stringify(shift.shiftReport),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type"
    },
  }
}
