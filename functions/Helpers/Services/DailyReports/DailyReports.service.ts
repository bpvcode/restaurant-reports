import { AddPlatformsReportDto } from "../../Modals/AddPlatformsReport.dto"
import { AddShiftReportDto } from "../../Modals/AddShiftReport.dto"
import { DailyReport } from "../../Modals/DailyReport"
import { addDailyReport } from "../../Repositories/DailyReport.repository"
import { addPlatformsReport } from "../../Repositories/PlatformsReport"
import { addShiftReport } from "../../Repositories/ShiftReport.repository"

export const addShiftReportService = async (addShiftReportDto: AddShiftReportDto) => {
    console.log(JSON.stringify(addShiftReportDto))
    const shiftReport = await addShiftReport(addShiftReportDto)

    console.log('SERVICE ### ' , shiftReport)
    return {
        shiftReport
    }
}

export const addDailyReportService = async (addDailyReportDto: DailyReport) => {
    console.log(JSON.stringify(addDailyReportDto))
    const dailyReport = await addDailyReport(addDailyReportDto)

    console.log('SERVICE ### ' , dailyReport)
    return {
        dailyReport
    }
}

export const addPlatformsReportService = async (addPlatformsReportDto: AddPlatformsReportDto) => {
    console.log(JSON.stringify(addPlatformsReportDto))
    const platformsReport = await addPlatformsReport(addPlatformsReportDto)

    console.log('SERVICE ### ' , platformsReport)
    return {
        platformsReport
    }
}