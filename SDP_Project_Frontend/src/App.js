import React/*, { useEffect }*/ from 'react';
import { /*HashRouter*/ BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './auth/signup/SignUp';
import Login from './auth/login/Login';
import ForgotPassword from "./auth/forgot-password/ForgotPassword";
import Landing from './landing/Landing';
import FeatureDetails from './landing/FeatureDetails';
import ContactUs from './landing/ContactUs'; 
import UserProfile from './components/UserProfile';
import ManageProperty from './components/ManageProperty';
import AdminDashboard from './components/AdminDashboard'
import BookProperty from './components/BookProperty';
import CustomerDashboard from './components/CustomerDashboard';
import CustomerAnalytics from './components/CustomerAnalytics';
import SearchProperty from './components/SearchProperty';
import ViewProperty from './components/ViewProperty';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import NotificationList from './components/NotificationList'; 
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import './App.css';
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import  store  from './redux/store';
// import PropertyPieChart from './components/PropertyPieChart';
import Feedback from './components/Feedback';
// import FeedbackBarGraph from './components/FeedbackBarGraph';
const pstore = persistStore(store);
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={pstore}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/features/:featureId" element={<FeatureDetails />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/my_profile" element={<UserProfile />} />
              <Route path="/Manage_Property" element={<ManageProperty />} />
              <Route path="/Book_Property" element={<BookProperty />} />
              <Route path="/customer_dashboard" element={<CustomerDashboard />} />
              <Route path="/customer_analytics" element={<CustomerAnalytics />} />
              <Route path="/search_property" element={<SearchProperty />} />
              <Route path="/view-property/:id" element={<ViewProperty />} />
              <Route path="/Buy_Property" element={<BookProperty />} />
              <Route path="/Rent_Property" element={<BookProperty />} />
              <Route path="/notifications" element={<NotificationList />} /> 
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              {/* <Route path="/property-pie-chart" element={<PropertyPieChart />} /> */}
              <Route path="/feedback" element={<Feedback />} />
              {/* <Route path="/feedback-bargraph" element={<FeedbackBarGraph />} /> */}
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
export default App;