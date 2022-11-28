import { FC, useState } from 'react'
import { Restaurants } from '../Authentication/RolesEnum'
import Clock from './Clock/Clock'
import DailyDinnerReport from './InputForm/DailyDinnerReport'
import DailyShiftReport, { DailyShift } from './InputForm/DailyShiftReport'
import { Shifts } from './ShiftEnum'
import Typical from 'react-typical';
import styles from './DailyReports.module.css'
import { UserModal } from '../Authentication/SignIn'
import axios from 'axios'

interface DailyReportsProps{
    selectedRestaurant: string;
    user: UserModal;
    token: string;
}

export interface ShiftReport {
    date: Date,
    shift: Shifts,
    restaurant: Restaurants,
    responsavel: string,
    notas: string,
    totalRefeicoes: number,
    totalCaixa: number,
    totalMB: number,
}

export interface PlatformsReport {
    date: Date;
    restaurant: Restaurants;
    totalUber: number;
    totalBolt: number;
    totalGlovo: number;
    totalZomato: number,
}

export interface DailyReport {
    date: Date;
    restaurant: Restaurants;
    totalRefeicoes: number;
    totalCaixa: number;
    totalMB: number;
    totalPlataformas: number,
    totalDespesasExtra: number,
    totalDinheiroEsperado: number;
    totalDinheiroReal: number;
    totalDesvios: number;
}

const DailyReports: FC<DailyReportsProps> = ({selectedRestaurant, user, token}) => {

    const [shift, setShift] = useState<Shifts>()
    const [lunchTotalRefeicoes, setLunchTotalRefeicoes] = useState<number>(0)
    const [lunchTotalCaixa, setLunchTotalCaixa] = useState<number>(0)
    const [lunchTotalMB, setLunchTotalMB] = useState<number>(0)
    const [isDailyReportCompleteDone, setIsDailyReportCompleteDone] = useState<boolean>(false)

    const onSetShift = (shift: Shifts) => {
        // TODO - CHECK IF LUNCH IS ALREADY DONE BEFORE ALLOW DINNER REPORT
        setShift(shift)
    }

    const getReport = async (dailyLunch: DailyShift) => {
        const report: ShiftReport = {
            date: dailyLunch.createdTime,
            shift: shift as Shifts,
            restaurant:selectedRestaurant as Restaurants,
            responsavel: dailyLunch.responsavel,
            notas: dailyLunch.notas,
            totalRefeicoes: dailyLunch.numeroRefeicoes,
            totalCaixa: dailyLunch.caixa,
            totalMB: dailyLunch.multibanco,
        }

        // TODO = ???????? OR :) useEffect to fetch this data from database? (condition)
        setLunchTotalRefeicoes(dailyLunch.numeroRefeicoes)
        setLunchTotalCaixa(dailyLunch.caixa)
        setLunchTotalMB(dailyLunch.multibanco)
        await addShiftReport(report)
    }

    const addShiftReport = async (shiftReport: ShiftReport) => {
        await axios({
            // Endpoint to send files
            url: "/.netlify/functions/AddShiftReport",
            method: "POST",
            headers: {
            //   authorization: "your TOKEN comes here", // TODO - ADD THIS IMPORTANT !!
            },
            data: {
                ...shiftReport,
                jwtToken : token
            },
          }).then((response) => {
            console.log("HELLO ############ ",response)
          })
          .catch((error) => {
            console.log(error)
            // setErrorTitle(`Sign In Error`)
            // setErrorMessage(`Make sure you input your name and password correct and choose a restaurant that you are allow to see`)
            // setIsError(true)
          })
    }

    const dailyReport = async (newDailyReport: DailyReport) => {
        const report: DailyReport = {
            date: new Date(),
            restaurant: newDailyReport.restaurant,
            totalRefeicoes: newDailyReport.totalRefeicoes,
            totalCaixa: newDailyReport.totalCaixa,
            totalMB: newDailyReport.totalMB,
            totalPlataformas: newDailyReport.totalPlataformas,
            totalDespesasExtra: newDailyReport.totalDespesasExtra,
            totalDinheiroEsperado: newDailyReport.totalDinheiroEsperado,
            totalDinheiroReal: newDailyReport.totalDinheiroReal,
            totalDesvios: newDailyReport.totalDesvios
        }

        await addDailyReport(report)
    }

    const addDailyReport = async (newDailyReport: DailyReport) => {
        await axios({
            // Endpoint to send files
            url: "/.netlify/functions/AddDailyReport",
            method: "POST",
            headers: {
            //   authorization: "your TOKEN comes here", // TODO - ADD THIS IMPORTANT !!
            },
            data: {
                ...newDailyReport,
                jwtToken : token
            },
          }).then((response) => {
            console.log("HELLO ############ ",response)
          })
          .catch((error) => {
            console.log(error)
            // setErrorTitle(`Sign In Error`)
            // setErrorMessage(`Make sure you input your name and password correct and choose a restaurant that you are allow to see`)
            // setIsError(true)
          })
    }

    const getDailyReportCompleteDone = (bool: boolean) => {
        setIsDailyReportCompleteDone(bool)
    }

    return (
        <>
        <Clock onSetShift={onSetShift}/>

        { isDailyReportCompleteDone
            ? (
                <>
                <div className={styles.SignInScreen}>
                <div className={styles.Typing}>
                    <Typical
                    steps={[
                        "Daily report is already DONE ✔️",
                        4000,
                        "Wait until next shift opens for registry",
                        4000,
                        "Meanwhile take a rest and thanks for your awesome work 🙌",
                        4000
                    ]}
                    loop={Infinity}
                    wrapper="span"
                    />
                </div>
                </div>
                </>
            )
            :
            (
                <>
                { shift === Shifts.Lunch
                    ? (
                        <DailyShiftReport getReport={getReport} user={user}/>
                    )
                    : (
                        <DailyDinnerReport
                            lunchTotalRefeicoes={lunchTotalRefeicoes}
                            lunchTotalCaixa={lunchTotalCaixa}
                            lunchTotalMB={lunchTotalMB}
                            dailyReport={dailyReport}
                            isDailyReportDone={getDailyReportCompleteDone}
                            selectedRestaurant={selectedRestaurant as Restaurants}
                            shift={shift as Shifts}
                            token={token}
                            user={user}
                        />
                    )
                }
                </>
            )
        }
        </>
    )
}

export default DailyReports