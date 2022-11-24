import { FC, useState } from "react";
import styles from './Header.module.css'
import classNames from "classnames"
import classnames from "classnames";


interface HeaderProps {
    onLogOut: () => void
    title: string
    isAdmin: boolean
}

const Header: FC<HeaderProps> = ({onLogOut, title, isAdmin}) => {

    const [choosedDailyReport, setchoosedDailyReport] = useState<boolean>(true)
    const [choosedShiftSchedule, setchoosedShiftSchedule] = useState<boolean>(false)
    const [choosedLogOut, setchoosedLogOut] = useState<boolean>(false)

    const logOutHandler = () => {
        setchoosedDailyReport(false)
        setchoosedShiftSchedule(false)
        setchoosedLogOut(true)
        onLogOut()
    }

    const choosedDailyReportHandler = () => {
        setchoosedDailyReport(true)
        setchoosedShiftSchedule(false)
        setchoosedLogOut(false)
    }
    const choosedShiftScheduleHandler = () => {
        setchoosedDailyReport(false)
        setchoosedShiftSchedule(true)
        setchoosedLogOut(false)
    }

    const toggleMenu = () => {
        let menu = document.getElementById('menu');
        menu?.classList.toggle('hidden');
        menu?.classList.toggle('w-full');
        menu?.classList.toggle('h-screen');
    }

    return (
    // <header className={classNames(styles.appHeader)}>
    //     <a className={styles.headerLogo}>
    //         {title} Reports
    //     </a>
    //     <div className={classnames(styles.headerRoutes, 'labelHeader')} id={'ts'}>
    //         <a onClick={choosedDailyReportHandler}>
    //             <label>Daily Report</label>
    //         </a>
    //         <a onClick={choosedShiftScheduleHandler}>
    //             <label>Shift Schedule</label>
    //         </a>
    //         <a onClick={logOutHandler}>
    //             <label>LogOut</label>
    //         </a>
    //     </div>
    // </header>

    <header className="w-full h-16 bg-[#191E29]">
        <div className="container px-4 md:px-0 h-full mx-auto flex justify-between items-center">
            {/* <!-- Logo Here --> */}
            <a className="text-white text-2xl font-bold" href="https://www.kindacode.com">{title}<span
                    className="text-[#01C38D]"> Reports</span></a>

            {/* <!-- Menu links here --> */}
            <ul id="menu" className="hidden fixed top-0 right-0 px-10 py-16 bg-[#191E29] z-50
                md:relative md:flex md:p-0 md:bg-transparent md:flex-row md:space-x-6">

                <li className="md:hidden z-90 fixed top-4 right-6">
                    <a href="javascript:void(0)" className="text-right text-white text-4xl"
                        onClick={toggleMenu}>&times;</a>
                </li>

                <li>
                    <a className="text-white hover:text-[#01C38D] duration-150 hover:font-bold " href="#"
                        onClick={choosedDailyReportHandler}>Daily Report</a>
                </li>
                 <li>
                    <a className="text-white hover:text-[#01C38D] duration-150 hover:font-bold" href="#"
                        onClick={choosedDailyReportHandler}>Schedule</a>
                </li>
                { isAdmin &&
                <li>
                    <a className="text-white hover:text-[#01C38D] duration-150 hover:font-bold" href="#"
                        onClick={choosedDailyReportHandler}>Admin</a>
                </li>
                }
                <li>
                    <a className="text-white hover:text-[#01C38D] duration-150 hover:font-bold" href="#"
                        onClick={logOutHandler}>LogOut</a>
                </li>
            </ul>

            {/* onclick="toggleMenu()" */}
            {/* <!-- This is used to open the menu on mobile devices --> */}
            <div className="flex items-center md:hidden">
                <button className="text-white text-4xl font-bold opacity-70 hover:opacity-100 duration-300" onClick={toggleMenu} >
                    &#9776;
                </button>
            </div>
        </div>
    </header>
    )
}

export default Header;