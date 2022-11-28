import { FC, useState } from "react";
import styles from './Header.module.css'
import classNames from "classnames"
import classnames from "classnames";


export enum HeaderSectionEnum {
    DAILY_REPORT = 'DAILY_REPORT',
    SCHEDULE = 'SCHEDULE',
    LOG_OUT = 'LOG_OUT',
    ADMIN = 'ADMIN',
}

interface HeaderProps {
    onLogOut: () => void
    title: string
    isAdmin: boolean
    onHeaderChangeSection: (selectedHeaderSection: HeaderSectionEnum) => void
}

const Header: FC<HeaderProps> = ({onLogOut, title, isAdmin, onHeaderChangeSection}) => {

    const [choosedDailyReport, setchoosedDailyReport] = useState<boolean>(true)
    const [choosedShiftSchedule, setchoosedShiftSchedule] = useState<boolean>(false)
    const [choosedLogOut, setchoosedLogOut] = useState<boolean>(false)

    const logOutHandler = () => {
        onLogOut()
    }

    const choosedDailyReportHandler = () => {
        console.log("DAILY REPORT")
        onHeaderChangeSection(HeaderSectionEnum.DAILY_REPORT)
    }
    const choosedShiftScheduleHandler = () => {
        console.log("SCHEDULE")
        onHeaderChangeSection(HeaderSectionEnum.SCHEDULE)
    }
    const choosedAdminReportHandler = () => {
        console.log("ADMIN")
        onHeaderChangeSection(HeaderSectionEnum.ADMIN)
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
            <a className="text-[#01C38D] text-2xl font-bold" href="">{title}<span
                    className="text-white"> Reports</span></a>

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
                        onClick={choosedShiftScheduleHandler}>Schedule</a>
                </li>
                { isAdmin &&
                <li>
                    <a className="text-white hover:text-[#01C38D] duration-150 hover:font-bold" href="#"
                        onClick={choosedAdminReportHandler}>Admin</a>
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