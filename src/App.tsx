import './App.css';
import { useEffect, useState } from 'react';
import Authentication from './components/Authentication/Authentication';
import { UserModal } from './components/Authentication/SignIn';
import DailyReports from './components/DailyReports/DailyReports';
import Header, { HeaderSectionEnum } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Roles } from './components/Authentication/RolesEnum';

const App = () => {

  const [user, setUser] = useState<UserModal>()
  const [token, setToken] = useState<string>('')
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [selectedHeaderSection, setSelectHeaderSection] = useState<HeaderSectionEnum>(HeaderSectionEnum.DAILY_REPORT)

  const onLogOut = () => {
    setUser(undefined)
  }

  const onGetNewUser = (event: any) => {
    setUser(event)
    setToken(event.token)
    setSelectedRestaurant(event.selectedRestaurant)
    setIsAdmin(event.roles.includes(Roles.Admin))
    console.log(event.roles)
    console.log(event.roles.includes('admin'))
  }

  const onHeaderChangeSection = (event: any) => {
    console.log(event);
    setSelectHeaderSection(event.headerSection)
  }

  console.log(selectedHeaderSection)

  return (
    <div className="App font-sans">
      { !user && <Authentication onGetNewUser={onGetNewUser}/> }
      { user &&
      <>
        <Header onLogOut={onLogOut} title={selectedRestaurant} isAdmin= {isAdmin} onHeaderChangeSection={onHeaderChangeSection}/>
          {/* { selectedHeaderSection === HeaderSectionEnum.DAILY_REPORT */}
            {/* && */}
             <DailyReports selectedRestaurant={selectedRestaurant} user={user} token={token} />
          {/* } */}
          {/* { selectedHeaderSection === HeaderSectionEnum.SCHEDULE */}
            {/* && */}
            <h2 style={{color: "white"}}> ######## SCHEDULE !!!! ######## </h2>
          {/* } */}
          {/* { selectedHeaderSection === HeaderSectionEnum.ADMIN */}
            {/* && */}
            <h2 style={{color: "white"}}> ######## ADMIN !!!! ######## </h2>
          {/* } */}
        <Footer/>
      </>
      }
    </div>
  );
}

export default App;
