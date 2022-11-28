import { FC, useEffect, useState } from "react";
import DailyShiftReport, { DailyShift } from "./DailyShiftReport";
import styles from './DailyDinnerReport.module.css'
import { DailyReport, PlatformsReport, ShiftReport } from "../DailyReports";
import { Restaurants } from "../../Authentication/RolesEnum";
import { Shifts } from "../ShiftEnum";
import axios from "axios";
import { UserModal } from "../../Authentication/SignIn";

interface DailyDinnerReportProps {
    lunchTotalRefeicoes: number;
    lunchTotalCaixa: number;
    lunchTotalMB: number;
    selectedRestaurant: Restaurants;
    shift: Shifts;
    token: string;
    dailyReport: (report: DailyReport) => void;
    isDailyReportDone: (bool: boolean) => void;
    user: UserModal;
}

const DailyDinnerReport: FC<DailyDinnerReportProps> = ({lunchTotalRefeicoes, lunchTotalCaixa, lunchTotalMB, dailyReport, isDailyReportDone, selectedRestaurant, shift, token, user}) => {

    const [finalReport, setFinalReport] = useState<DailyReport>()
    const [isDinnerFirstReport, setIsDinnerFirstReport] = useState(true)

    const [dinnerTotalRefeiçoes, setDinnerTotalRefeiçoes] = useState<number>(0)
    const [dinnerTotalCaixa, setDinnerTotalCaixa] = useState<number>(0)
    const [dinnerTotalMB, setDinnerTotalMB] = useState<number>(0)

    const [totalRefeiçoes, setTotalRefeiçoes] = useState<number>(0)
    const [totalDinheiroEsperado, setTotalDinheiroEsperado] = useState<number>(0)
    const [totalDinheiroReal, setTotalDinheiroReal] = useState<number>(0)
    const [totalMB, setTotalMB] = useState<number>(0)
    const [totalCaixa, setTotalCaixa] = useState<number>(0)
    const [totalDesvios, setTotalDesvios] = useState<number>(0)
    const [totalPlataformas, setTotalPlataformas] = useState<number>(0)

    const [enteredTotalUber, setEnteredTotalUber] = useState<number>(0)
    const [enteredTotalBolt, setEnteredTotalBolt] = useState<number>(0)
    const [enteredTotalGlovo, setEnteredTotalGlovo] = useState<number>(0)
    const [enteredTotalZomato, setEnteredTotalZomato] = useState<number>(0)
    const [enteredTotalDespesas, setEnteredTotalDespesas] = useState<number>(0)

    useEffect(()=> {
        setTotals()
    }) // ??? ADD DEPENDENCY ARRAY AS PROPERTIES (totalUber, totalBolt, ...)

    const setTotals = () => {
        setTotalRefeiçoes(lunchTotalRefeicoes + Number(dinnerTotalRefeiçoes))
        setTotalCaixa(lunchTotalCaixa + Number(dinnerTotalCaixa))
        setTotalMB(lunchTotalMB + Number(dinnerTotalMB))
        setTotalPlataformas(enteredTotalUber + enteredTotalBolt + enteredTotalGlovo + enteredTotalZomato)
        setTotalDinheiroEsperado((lunchTotalCaixa + Number(dinnerTotalCaixa)) - (lunchTotalMB + Number(dinnerTotalMB)) - totalPlataformas - enteredTotalDespesas)
        setTotalDesvios(totalDinheiroReal - totalDinheiroEsperado)
    }

    const getReport = async (dailyLunch: DailyShift) => {
        const report: ShiftReport = {
            date: dailyLunch.createdTime,
            shift: shift as Shifts,
            restaurant:selectedRestaurant as Restaurants,
            responsavel: user.name,
            notas: dailyLunch.notas,
            totalRefeicoes: dailyLunch.numeroRefeicoes,
            totalCaixa: dailyLunch.caixa,
            totalMB: dailyLunch.multibanco,
        }

        setDinnerTotalRefeiçoes(dailyLunch.numeroRefeicoes)
        setDinnerTotalCaixa(dailyLunch.caixa)
        setDinnerTotalMB(dailyLunch.multibanco)
        await addShiftReport(report)
        setIsDinnerFirstReport(false)
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


    const enteredTotalDespesasHandler = (event: any) => {
        setEnteredTotalDespesas(Number(event.target.value))
    }
    const enteredTotaDinheiroRealHandler = (event: any) => {
        setTotalDinheiroReal(Number(event.target.value))
    }
    const enteredTotalUberHandler = (event: any) => {
        setEnteredTotalUber(Number(event.target.value))
    }
    const enteredTotalBoltHandler = (event: any) => {
        setEnteredTotalBolt(Number(event.target.value))
    }
    const enteredTotalGlovoHandler = (event: any) => {
        setEnteredTotalGlovo(Number(event.target.value))
    }
    const enteredTotalZomatoHandler = (event: any) => {
        setEnteredTotalZomato(Number(event.target.value))
    }

    const platformsReport = async (newPlatformReport: PlatformsReport) => {
        const report: PlatformsReport = {
            date: new Date(),
            restaurant: newPlatformReport.restaurant,
            totalUber: newPlatformReport.totalUber,
            totalBolt: newPlatformReport.totalBolt,
            totalGlovo: newPlatformReport.totalGlovo,
            totalZomato: newPlatformReport.totalZomato,
        }

        await addPlatformsReport(report)
    }

    const addPlatformsReport = async (newPlatformReport: PlatformsReport) => {

        console.log("SANTAOOOOOO ##############", newPlatformReport)

        await axios({
            // Endpoint to send files
            url: "/.netlify/functions/AddPlatformsReport",
            method: "POST",
            headers: {
            //   authorization: "your TOKEN comes here", // TODO - ADD THIS IMPORTANT !!
            },
            data: {
                ...newPlatformReport,
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


    const onSubmit = () => {
        const newDailyReport = {
            date: new Date(),
            restaurant: selectedRestaurant,
            totalRefeicoes: totalRefeiçoes,
            totalCaixa: totalCaixa,
            totalMB: totalMB,
            totalPlataformas: totalPlataformas,
            totalDespesasExtra: enteredTotalDespesas,
            totalDinheiroEsperado: totalDinheiroEsperado,
            totalDinheiroReal: totalDinheiroReal,
            totalDesvios: totalDesvios
        }
        const platformReport = {
            date: new Date(),
            restaurant: selectedRestaurant,
            totalUber: enteredTotalUber,
            totalBolt: enteredTotalBolt,
            totalGlovo: enteredTotalGlovo,
            totalZomato: enteredTotalZomato,
        }
        setFinalReport(newDailyReport)
        dailyReport(newDailyReport)
        platformsReport(platformReport)
        isDailyReportDone(true)
    }

    return (
        <>
        {isDinnerFirstReport ?
            (<DailyShiftReport getReport={getReport} user={user}/>)
            :
            (
            <div className="max-w-sm mx-auto px-3">
                <div className="relative flex flex-wrap">
                    <div className="w-full relative">
                        <div className="md:mt-6">
                            <form onSubmit={onSubmit}>
                                <hr className={styles.hr}></hr>
                                    <span className="px-1 text-sm text-white">PLATAFORMAS</span>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">UBER</span>
                                        <input placeholder="Valor faturado na UBER" type="number" min={0} step={.01} onChange={enteredTotalUberHandler}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">BOLT</span>
                                        <input placeholder="Valor faturado na BOLT" type="number" min={0} step={.01} onChange={enteredTotalBoltHandler}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">GLOVO</span>
                                        <input placeholder="Valor faturado na GLOVO" type="number" min={0} step={.01} onChange={enteredTotalGlovoHandler}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">ZOMATO</span>
                                        <input placeholder="Valor faturado na ZOMATO" type="number" min={0} step={.01} onChange={enteredTotalZomatoHandler}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <hr className={styles.hr}></hr>
                                    <span className="px-1 text-sm text-white">DESPESAS</span>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">EXTRA</span>
                                        <input placeholder="Valor extra de despesas ocorridas" type="number" min={0} step={.01} onChange={enteredTotalDespesasHandler}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                <hr className={styles.hr}></hr>
                                <div className="mx-auto max-w-lg ">
                                <span className="px-1 text-sm text-white">TOTAIS</span>
                                <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">TOTAL REFEIÇÕES</span>
                                        <input placeholder="Valor calculado automaticamente" value={totalRefeiçoes} type="number" min={0} disabled={true}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-[#696E79] border-2 border-gray-white placeholder-white text-white shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">TOTAL CAIXA</span>
                                        <input placeholder="Valor calculado automaticamente" value={totalCaixa} type="number" min={0} step={.01} disabled={true}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-[#696E79] border-2 border-gray-white placeholder-white text-white shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">TOTAL MULTIBANCO</span>
                                        <input placeholder="Valor calculado automaticamente" value={totalMB} type="number" min={0} step={.01} disabled={true}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-[#696E79] border-2 border-gray-white placeholder-white text-white shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">TOTAL PLATAFORMAS</span>
                                        <input placeholder="Valor calculado automaticamente" value={totalPlataformas} type="number" min={0} step={.01} disabled={true}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-[#696E79] border-2 border-gray-white placeholder-white text-white shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">TOTAL DINHEIRO ESPERADO</span>
                                        <input placeholder="Valor calculado automaticamente" value={totalDinheiroEsperado} type="number" min={0} step={.01} disabled={true}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-[#01C38D] border-2 border-gray-white placeholder-white text-white shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">TOTAL DINHEIRO REAL</span>
                                        <input placeholder="Valor total em dinheiro" type="number" min={0} step={.01} onChange={enteredTotaDinheiroRealHandler}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">TOTAL DESVIO</span>
                                        <input placeholder="Valor calculado automaticamente" value={totalDesvios} type="number" min={0} step={.01} disabled={true}
                                            className="text-md font-bold slashed-zero block px-3 py-2 rounded-lg w-full
                                            bg-[#696E79] border-2 border-gray-white placeholder-white text-white shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <hr className={styles.hr}></hr>
                                <span className="px-1 text-sm text-white">STAFF INFO</span>
                                    <div className="py-1">
                                    <span className="px-1 text-sm text-[#696E79]">Responsável</span>
                                        <input placeholder="Nome da pessoa que regista" type="text" value={user.name} disabled={true}
                                            className="text-md block px-3 py-2 rounded-lg w-full
                                            bg-[#696E79] border-2 border-gray-white placeholder-white text-white shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <div className="py-1">
                                        <span className="px-1 text-sm text-[#696E79]">Notas</span>
                                        <input placeholder="Notas" type="text"
                                            className="text-md block px-3 py-12 rounded-lg w-full
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                    </div>
                                    <button className="mt-8 mb-6 text-lg font-semibold
                                        bg-[#01C38D] w-full text-white rounded-lg
                                        px-6 py-3 block shadow-xl hover:text-white hover:bg-[#009394]">
                                        Registar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        </>
    )
}

export default DailyDinnerReport