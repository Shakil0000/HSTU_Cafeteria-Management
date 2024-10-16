import logo from './logo.svg';
import './App.css';

import Navbar from './Component/Navbar/Navbar';
import Header from './Component/Header/Header';
import Footer from './Component/Footter/Footter'
import Card from './Component/Card/Card';
import Admin from './Component/Admin/Admin';
import UploadItem from './Component/UploadItem/UploadItem';
import Test from './Component/Test/Test';
import Notice from './Component/Notice/Notice';
import OfferDescription from './Component/OfferDescription/OfferDescription';
import OfferItemUpload from './Component/OfferItemUpload/OfferItemUpload';
import About from './Component/About/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footter from './Component/Footter/Footter';
import AddToCart from './Component/AddToCartPage/AddToCart';
import SignUp from './Component/SineUp/SignUp';
import Login from './Component/LogIn/LogIn';
import UserProfile from './Component/UserProfile/UserProfile';
import EmployeeLogin from './Component/EmployeeLogin/EmployeeLogin';
import Employee from './Component/Employee/Employee';
import Administrator from './Component/Administrator/Administrator';
import HelpAndSupport from './Component/HelpAndSupport/HelpAndSupport';
import CardForIndividualItem from './Component/CardForIndividualItem/CardForIndividualItem';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <Notice></Notice>
          <Routes>
          <Route path="/" element={<><Header/> <CardForIndividualItem/>  <Card/> <About/></>} />
          <Route path="/offerDescription/:id" element={<><OfferDescription/></>}></Route>
          <Route path="/addToCart" element={<><AddToCart/></>} />
          <Route path="/signup" element={<><SignUp/></>} />
          <Route path="/login" element={<><Login/></>} />
          <Route path="/userprofile" element={<><UserProfile/></>} />
          <Route path="/EmployeeLogin" element={<><EmployeeLogin/></>} />
          <Route path="/employee" element={<><Employee/></>} />
          <Route path="/administrator" element={<><Administrator/></>} />
          <Route path="/helpandsupport" element={<><HelpAndSupport/></>} />
          {/* <Route path="/cardindividualitem" element={<><CardForIndividualItem/></>} /> */}
          </Routes>
          <Footter></Footter>
        </BrowserRouter>

    </div>
  );
}

export default App;
