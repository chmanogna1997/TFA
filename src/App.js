import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientForm from './components/PatientForm/PatientForm';
import DisplayBills from './components/DisplayBills/DisplayBills';
import UpdateBills from './components/UpdateBills/UpdateBills';


function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/PatientForm" element={<PatientForm />} />
        <Route exact path="/" element={<DisplayBills />} />
        <Route exact path = '/UpdateBills' element = {<UpdateBills/>} />
      </Routes>
    </Router>

  )
}

export default App;
