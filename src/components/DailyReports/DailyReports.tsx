import { FC, useState } from 'react'
import { Restaurants } from '../Authentication/RolesEnum'
import Clock from './Clock/Clock'
import DailyDinnerReport, { FinalReport } from './InputForm/DailyDinnerReport'
import DailyLunchReport, { DailyLunch } from './InputForm/DailyLunchReport'
import { Shifts } from './ShiftEnum'
import Typical from 'react-typical';
import styles from './DailyReports.module.css'
import { UserModal } from '../Authentication/SignIn'
import axios from 'axios'

interface DailyReportsProps{
    selectedRestaurant: string;
    user: UserModal;
}

interface ShiftReport {
    date: Date,
    shift: Shifts,
    restaurant: Restaurants,
    responsavel: string,
    notas: string,
    totalRefeicoes: number,
    totalCaixa: number,
    totalMB: number,
    totalPlataformas: number,
    totalDespesasExtra: number,
    totalDinheiroEsperado: number,
    totalDinheiroReal: number,
}

export interface DailyReport {
    lunchReport: DailyLunch;
    dinnerReport: DailyLunch;
    finalReport: FinalReport;
    restaurant: Restaurants;
}

const DailyReports: FC<DailyReportsProps> = ({selectedRestaurant, user}) => {

    const [enteredDailyReport, setEnteredDailyReport] = useState<DailyReport>()
    const [shift, setShift] = useState<Shifts>()
    const [lunchTotalRefeicoes, setLunchTotalRefeicoes] = useState<number>(0)
    const [lunchTotalCaixa, setLunchTotalCaixa] = useState<number>(0)
    const [lunchTotalMB, setLunchTotalMB] = useState<number>(0)
    const [lunchResponsavel, setLunchResponsavel] = useState<string>('')
    const [lunchNotas, setLunchNotas] = useState<string>('')
    const [lunchIsFirstReportDone, setLunchIsFirstReportDone] = useState<boolean>(false)
    const [lunchCreatedTime, setLunchCreatedTime] = useState<Date>(new Date())
    const [isDailyReportCompleteDone, setIsDailyReportCompleteDone] = useState<boolean>(false)


    const onSetShift = (shift: Shifts) => {
        // TODO - CHECK IF LUNCH IS ALREADY DONE BEFORE ALLOW DINNER REPORT
        console.log("SHIFT", shift)
        setShift(shift)
    }

    const getReport = async (dailyLunch: DailyLunch) => {
        const report: ShiftReport = {
            date: dailyLunch.createdTime,
            shift: shift as Shifts,
            restaurant:selectedRestaurant as Restaurants,
            responsavel: dailyLunch.responsavel,
            notas: dailyLunch.notas,
            totalRefeicoes: lunchTotalRefeicoes,
            totalCaixa: dailyLunch.caixa,
            totalMB: dailyLunch.multibanco,
            totalPlataformas: 0,
            totalDespesasExtra: 0,
            totalDinheiroEsperado: 0,
            totalDinheiroReal: 0,
        }

        //await addShiftReport(report)

        console.log("HELOOOO")

        setLunchTotalRefeicoes(dailyLunch.numeroRefeicoes)
        setLunchTotalCaixa(dailyLunch.caixa)
        setLunchTotalMB(dailyLunch.multibanco)
        setLunchResponsavel(dailyLunch.responsavel)
        setLunchNotas(dailyLunch.notas)
        setLunchIsFirstReportDone(dailyLunch.isFirstReportDone)
        setLunchCreatedTime(dailyLunch.createdTime)
    }

    const addShiftReport = async (shiftReport: ShiftReport) => {
        await axios({
            // Endpoint to send files
            url: "/.netlify/functions/AddShiftReport",
            method: "POST",
            headers: {
            //   authorization: "your TOKEN comes here", // TODO - ADD THIS IMPORTANT !!
            },
            data: {shiftReport},
          }).then((response) => {
            console.log(response)

            // setLunchTotalRefeicoes(dailyLunch.numeroRefeicoes)
            // setLunchTotalCaixa(dailyLunch.caixa)
            // setLunchTotalMB(dailyLunch.multibanco)
            // setLunchResponsavel(dailyLunch.responsavel)
            // setLunchNotas(dailyLunch.notas)
            // setLunchIsFirstReportDone(dailyLunch.isFirstReportDone)
            // setLunchCreatedTime(dailyLunch.createdTime)
          })
          .catch((error) => {
            console.log(error)
            // setErrorTitle(`Sign In Error`)
            // setErrorMessage(`Make sure you input your name and password correct and choose a restaurant that you are allow to see`)
            // setIsError(true)
          })
    }


    const dailyReport = (reportFinal: DailyReport) => {
        const rep: DailyReport = {
            ...reportFinal,
            restaurant: selectedRestaurant as Restaurants
        }
        console.log(rep)
        setEnteredDailyReport(rep)
    }

    const getDailyReportCompleteDone = (bool: boolean) => {
        setIsDailyReportCompleteDone(bool)
    }

    return (
        <>
        <Clock onSetShift={onSetShift}/>
        {/* // TODO: CHANGE BETWEEN `=== Shifts.Lunch` AND `=== Shifts.Dinner` to : */}

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
                        <DailyLunchReport getReport={getReport}/>
                    )
                    : (
                        <DailyDinnerReport
                            lunchTotalRefeicoes={lunchTotalRefeicoes}
                            lunchTotalCaixa={lunchTotalCaixa}
                            lunchTotalMB={lunchTotalMB}
                            lunchResponsavel={lunchResponsavel}
                            lunchNotas={lunchNotas}
                            islunchFirstReport={false}
                            lunchCreatedTime={lunchCreatedTime}
                            dailyReport={dailyReport}
                            isDailyReportDone={getDailyReportCompleteDone}/>
                    )
                }
                </>
            )
        }
        </>
    )
}

export default DailyReports