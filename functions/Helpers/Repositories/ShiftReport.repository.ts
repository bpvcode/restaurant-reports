import { AddShiftReportDto } from "../Modals/AddShiftReport.dto";
import { AirtableTables, getAirtableTable } from "./AirtableConfig";

export const addShiftReport = async (newShiftReport: AddShiftReportDto) => {
    const shiftTable = getAirtableTable(AirtableTables.SHIFT_REPORT);
    let body;
    let statusCode;

    return await shiftTable
        .create([
            {
                fields: {
                    ...newShiftReport
                }
            }
            ],
            {typecast: true} // If typecast is enabled, a new choice will be created if one does not exactly match.
        ).then((data) => {
            statusCode= 201
            body = {
                message: 'New Shift Report record created',
                restaurant: data[0].fields.restaurant,
                shift: data[0].fields.shift,
                date: data[0].fields.date
            }
            return {
                statusCode,
                body
            }
        })
        .catch((error) => {
            return {
                statusCode: 500,
                body: error.message,
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Content-Type": "Application/json"
                }
            }
        })

}
