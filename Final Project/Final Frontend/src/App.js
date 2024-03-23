import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router,Routes,Route, BrowserRouter } from 'react-router-dom';
import LoginSignup from './pages/LoginSignUp/LoginSignup';
import Bottombar from './layout/Bottombar';
import Menu from './pages/Menu';
import TrainSchedule from './pages/TrainSchedule';
import TrainRadar from './pages/TrainRadar';
import NavBar from './layout/NavBar';
import AddNewTrain from './pages/AddNewTrain';
import EditTrain from './pages/EditTrain';
import ViewTrain from './pages/ViewTrain';
import AddNewRadar from './pages/AddNewRadar';

import './App.css';
import EditRadar from './pages/EditRadar';


function App() {
  return (
    <div className='main'>
   
   <BrowserRouter>
    <NavBar/>
   
     <Routes>
         <Route path='/' element = {<Menu/>}/>
        <Route path='/login' element = {<LoginSignup/>}/>
        <Route path='/schedule' element = {<TrainSchedule/>}/>
        <Route path='/radar' element = {<TrainRadar/>}/>
        <Route path='/addTrain' element = {<AddNewTrain/>}/>
        <Route path='/editTrain/:id' element = {<EditTrain/>}/>
        <Route path='/viewTrain/:id' element = {<ViewTrain/>}/>
        <Route path='/addRadar' element = {<AddNewRadar/>}/>
        <Route path='/editRadar/:id' element = {<EditRadar/>}/>  

      </Routes>
      
     </BrowserRouter>
     
  
    
     
     
   
    </div>
  );
}

export default App;


