import './App.css';
import { useState } from 'react';
import Authentication from './components/Authentication/Authentication';
import { UserModal } from './components/Authentication/SignIn';
import DailyReports from './components/DailyReports/DailyReports';
import Header from './components/Header/Header';

const App = () => {

  const [user, setUser] = useState<UserModal>()
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('')

  const onLogOut = () => {
    setUser(undefined)
  }

  const onGetNewUser = (event: any) => {
    setUser(event)
    setSelectedRestaurant(event.selectedRestaurant)
  }

  return (
    <div className="App font-sans">
      {!user && <Authentication onGetNewUser={onGetNewUser} />}
      {user && <Header onLogOut={onLogOut} title={selectedRestaurant}/>}
      {user && <DailyReports selectedRestaurant={selectedRestaurant} />}
    </div>
  );
}

export default App;
