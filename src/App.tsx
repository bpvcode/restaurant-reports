import './App.css';
import { useEffect, useState } from 'react';
import Authentication from './components/Authentication/Authentication';
import { UserModal } from './components/Authentication/SignIn';
import DailyReports from './components/DailyReports/DailyReports';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Roles } from './components/Authentication/RolesEnum';

const App = () => {

  const [user, setUser] = useState<UserModal>()
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('')

  const onLogOut = () => {
    setUser(undefined)
  }

  const onGetNewUser = (event: any) => {
    console.log("APP")
    console.log(event)
    console.log(user)
    console.log("APP")
    setUser(event)
    setSelectedRestaurant(event.selectedRestaurant)
  }

  return (
    <div className="App font-sans">
      {!user && <Authentication onGetNewUser={onGetNewUser} />}
      {user && <Header onLogOut={onLogOut} title={selectedRestaurant} isAdmin= {user.roles.includes(Roles.Admin) ? true : false}/>}
      {user && <DailyReports selectedRestaurant={selectedRestaurant} user={user} />}
      {user && <Footer/>}
    </div>
  );
}

export default App;
