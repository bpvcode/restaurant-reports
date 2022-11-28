import axios from "axios";
import { Restaurants } from "../../Authentication/RolesEnum";

export const GetLastShiftReport = async (restaurant: Restaurants) => {
    let lastShiftReport;
    await axios({
            // Endpoint to send files
            url: `/.netlify/functions/GetLastShiftReport?restaurant=${restaurant}`,
            method: "GET",
            headers: {
            //   authorization: "your TOKEN comes here",
            },
        }).then((response) => {
            console.log(response)
            lastShiftReport = response.data
        })
        .catch((error) => {
            console.log(error)
        })
    return lastShiftReport;
}