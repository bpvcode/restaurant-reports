import { AirtableTables, getAirtableTable } from "./AirtableConfig";

export const addPlatformsReport = async (platformsReport: any) => {
    const platformsReportTable = getAirtableTable(AirtableTables.PLATFORMS_REPORT);
    let body;
    let statusCode;

    return await platformsReportTable
        .create([
            {
                fields: {
                    ...platformsReport
                }

            }
            ],
            {typecast: true} // If typecast is enabled, a new choice will be created if one does not exactly match.
        ).then((data) => {
            statusCode= 201
            body = {
                message: 'New Platform Report record created',
                restaurant: data[0].fields.restaurant,
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