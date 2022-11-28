import { Restaurants } from "../../Modals/RestaurantsEnum"
import { getLastShiftReport } from "../../Repositories/ShiftReport.repository"

export const getLastShiftReportService = async (restaurant: Restaurants) => {
    console.log(restaurant)
    const shiftReport = await getLastShiftReport(restaurant)

    return {
        shiftReport
    }
}