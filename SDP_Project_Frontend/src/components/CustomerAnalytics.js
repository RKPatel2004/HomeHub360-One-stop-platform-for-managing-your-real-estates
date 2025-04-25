// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CustomerAnalytics = () => {
//   const user = useSelector(state => state.User);
//   const [overview, setOverview] = useState(null);
//   const [monthlyActivity, setMonthlyActivity] = useState(null);
//   const [propertyTransactions, setPropertyTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

//   const fetchOverviewData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/api/customer-analytics/overview', {
//         headers: { Authorization: `Bearer ${user.token}` }
//       });
//       setOverview(response.data.data);
//     } catch (err) {
//       console.error('Error fetching overview data:', err);
//       setError('Failed to load overview data. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMonthlyActivityData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/api/customer-analytics/monthly-activity', {
//         headers: { Authorization: `Bearer ${user.token}` }
//       });
//       setMonthlyActivity(response.data.data);
//     } catch (err) {
//       console.error('Error fetching monthly activity data:', err);
//       setError('Failed to load monthly activity data. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPropertyTransactionsData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/api/customer-analytics/property-transactions', {
//         headers: { Authorization: `Bearer ${user.token}` }
//       });
//       setPropertyTransactions(response.data.data);
//     } catch (err) {
//       console.error('Error fetching property transactions data:', err);
//       setError('Failed to load property transactions data. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFeedbacksData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/getAllFeedbacks', {
//         headers: { Authorization: `Bearer ${user.token}` }
//       });
//       setFeedbacks(response.data.data || []);
//     } catch (err) {
//       console.error('Error fetching feedbacks data:', err);
//     }
//   };

//   useEffect(() => {
//     // Fetch initial data for the first tab
//     fetchOverviewData();
//     fetchMonthlyActivityData();
//     fetchFeedbacksData();
//   }, []);

//   useEffect(() => {
//     // Fetch data based on active tab
//     if (activeTab === 'overview' && (!overview || !monthlyActivity)) {
//       fetchOverviewData();
//       fetchMonthlyActivityData();
//     } else if (activeTab === 'transactions' && propertyTransactions.length === 0) {
//       fetchPropertyTransactionsData();
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     // Auto-rotate feedback carousel every 5 seconds
//     if (feedbacks.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentFeedbackIndex((prevIndex) => 
//           prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
//         );
//       }, 5000);
      
//       return () => clearInterval(interval);
//     }
//   }, [feedbacks]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   // Prepare data for monthly activity bar chart
//   const monthlyTransactionData = {
//     labels: monthlyActivity?.monthlyActivity.map(item => item.month) || [],
//     datasets: [
//       {
//         label: 'Unique Users',
//         data: monthlyActivity?.monthlyActivity.map(item => item.uniqueUsers) || [],
//         backgroundColor: '#4e73df',
//       },
//     ],
//   };

//   // Prepare data for monthly spending line chart
//   const monthlySpendingData = {
//     labels: monthlyActivity?.monthlyActivity.map(item => item.month) || [],
//     datasets: [
//       {
//         label: 'Total Amount Spent',
//         data: monthlyActivity?.monthlyActivity.map(item => item.totalAmount) || [],
//         fill: false,
//         borderColor: '#1cc88a',
//         tension: 0.1,
//       },
//     ],
//   };

//   // Render Feedback Carousel
//   const renderFeedbackCarousel = () => {
//     if (feedbacks.length === 0) {
//       return (
//         <div className="bg-white rounded-lg p-5 shadow-md text-center">
//           <p className="text-gray-600">No feedback data available</p>
//         </div>
//       );
//     }

//     const currentFeedback = feedbacks[currentFeedbackIndex];
    
//     return (
//       <div className="bg-white rounded-lg p-5 shadow-md">
//         <h3 className="text-xl text-gray-800 mb-5 text-center font-bold border-b pb-2">Customer Feedback</h3>
//         <div className="relative p-5 border rounded-lg border-blue-200 bg-blue-50">
//           <div className="flex justify-between items-start mb-4">
//             <div className="w-2/3">
//               <p className="font-bold text-blue-700 text-lg mb-1">
//                 {currentFeedback.property?.title || 'Property'}
//               </p>
//               <div className="flex items-center text-gray-700 mb-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <span className="text-sm">
//                   {currentFeedback.property?.address || 'Address not available'}
//                 </span>
//               </div>
//               <p className="text-xs bg-blue-200 text-blue-800 inline-block px-2 py-1 rounded">
//                 {currentFeedback.property?.type?.toUpperCase() || 'Not specified'}
//               </p>
//             </div>
//             <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg font-bold text-center">
//               <div className="text-sm mb-1">Rating</div>
//               <div className="text-xl">{currentFeedback.rating || 'N/A'}<span className="text-sm">/5</span></div>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-sm">
//             <p className="text-gray-700 italic text-center font-medium">"{currentFeedback.feedbackText || 'No feedback text provided'}"</p>
//           </div>
//           <div className="mt-5 flex justify-center">
//             {feedbacks.map((_, index) => (
//               <span 
//                 key={index} 
//                 className={`inline-block h-3 w-3 rounded-full mx-1 ${
//                   index === currentFeedbackIndex ? 'bg-blue-600' : 'bg-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderOverviewTab = () => (
//     <div className="w-full">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
//         <div className="bg-white rounded-lg p-5 shadow-md text-center">
//           <h3 className="text-base text-gray-600 mb-2">Total Rented Properties</h3>
//           <p className="text-2xl font-semibold text-blue-600">{overview?.totalRentedProperties || 0}</p>
//         </div>
//         <div className="bg-white rounded-lg p-5 shadow-md text-center">
//           <h3 className="text-base text-gray-600 mb-2">Total Purchased Properties</h3>
//           <p className="text-2xl font-semibold text-blue-600">{overview?.totalPurchasedProperties || 0}</p>
//         </div>
//         <div className="bg-white rounded-lg p-5 shadow-md text-center">
//           <h3 className="text-base text-gray-600 mb-2">Total Expenses</h3>
//           <p className="text-2xl font-semibold text-blue-600">
//             {overview ? `${overview.currency} ${overview.totalExpenses.toLocaleString()}` : '$0'}
//           </p>
//         </div>
//       </div>

//       <h2 className="text-xl text-gray-800 mb-5 text-center font-medium">Monthly Activity for {monthlyActivity?.year || new Date().getFullYear()}</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
//         <div className="bg-white rounded-lg p-5 shadow-md">
//           <h3 className="text-lg text-gray-800 mb-5 text-center">User Activity</h3>
//           <Bar 
//             data={monthlyTransactionData} 
//             options={{
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   title: {
//                     display: true,
//                     text: 'Unique Users'
//                   }
//                 }
//               }
//             }}
//           />
//         </div>
        
//         <div className="bg-white rounded-lg p-5 shadow-md">
//           <h3 className="text-lg text-gray-800 mb-5 text-center">Monthly Spending</h3>
//           <Line 
//             data={monthlySpendingData}
//             options={{
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   title: {
//                     display: true,
//                     text: `Amount (${overview?.currency || 'USD'})`
//                   }
//                 }
//               }
//             }}
//           />
//         </div>
//       </div>

//       <h2 className="text-xl text-gray-800 mb-5 text-center font-medium">Customer Feedback</h2>
//       {renderFeedbackCarousel()}
//     </div>
//   );

//   const renderTransactionsTab = () => (
//     <div className="w-full">
//       <h2 className="text-xl text-gray-800 mb-5 text-center font-medium">Property Transactions</h2>
      
//       {propertyTransactions.length === 0 ? (
//         <p className="text-center py-10 text-gray-600 text-lg">No transaction records found.</p>
//       ) : (
//         propertyTransactions.map((property) => (
//           <div className="bg-white rounded-lg p-5 shadow-md mb-5" key={property.property.id}>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg text-gray-800 m-0">{property.property.title}</h3>
//               <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{property.property.type}</span>
//             </div>
//             <p className="text-gray-600 mb-2">{property.property.address}</p>
//             <p className="font-semibold text-green-600 mb-5">
//               Total Spent: {property.transactions[0]?.currency || 'USD'} {property.totalSpent.toLocaleString()}
//             </p>
            
//             <h4 className="text-base text-gray-800 mb-2 border-b border-gray-200 pb-1">Transaction History</h4>
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr>
//                     <th className="p-3 text-left bg-gray-100 text-blue-600 font-semibold">Date</th>
//                     <th className="p-3 text-left bg-gray-100 text-blue-600 font-semibold">Type</th>
//                     <th className="p-3 text-left bg-gray-100 text-blue-600 font-semibold">Method</th>
//                     <th className="p-3 text-left bg-gray-100 text-blue-600 font-semibold">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {property.transactions.map((transaction) => (
//                     <tr key={transaction.id} className="border-b border-gray-200 last:border-b-0">
//                       <td className="p-3 text-left">{new Date(transaction.date).toLocaleDateString()}</td>
//                       <td className="p-3 text-left">{transaction.type}</td>
//                       <td className="p-3 text-left">{transaction.method}</td>
//                       <td className="p-3 text-left">{transaction.currency} {transaction.amount.toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );

//   const renderContent = () => {
//     if (loading) {
//       return <div className="text-center py-10 text-gray-600 text-lg">Loading analytics data...</div>;
//     }

//     if (error) {
//       return <div className="text-center py-10 text-red-600 text-lg">{error}</div>;
//     }

//     switch (activeTab) {
//       case 'overview':
//         return (overview && monthlyActivity) ? renderOverviewTab() : <div className="text-center py-10 text-gray-600 text-lg">Loading overview data...</div>;
//       case 'transactions':
//         return renderTransactionsTab();
//       default:
//         return (overview && monthlyActivity) ? renderOverviewTab() : <div className="text-center py-10 text-gray-600 text-lg">Loading overview data...</div>;
//     }
//   };

//   return (
//     <div className="p-5 max-w-6xl mx-auto">
//       <div className="text-center mb-8">
//         <h1 className="text-2xl text-gray-800 mb-2">My Property Analytics</h1>
//         <p className="text-base text-gray-600">View your property investments and spending patterns</p>
//       </div>

//       <div className="flex justify-center mb-8 border-b border-gray-200">
//         <button 
//           className={`px-6 py-3 text-base bg-transparent border-none cursor-pointer relative text-gray-600 transition-colors hover:text-blue-600 ${activeTab === 'overview' ? 'text-blue-600 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600' : ''}`}
//           onClick={() => handleTabChange('overview')}
//         >
//           Overview
//         </button>
//         <button 
//           className={`px-6 py-3 text-base bg-transparent border-none cursor-pointer relative text-gray-600 transition-colors hover:text-blue-600 ${activeTab === 'transactions' ? 'text-blue-600 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600' : ''}`}
//           onClick={() => handleTabChange('transactions')}
//         >
//           Transactions
//         </button>
//       </div>

//       <div className="w-full">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default CustomerAnalytics;













import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CustomerAnalytics = () => {
  const user = useSelector(state => state.User);
  const [overview, setOverview] = useState(null);
  const [monthlyActivity, setMonthlyActivity] = useState(null);
  const [propertyTransactions, setPropertyTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

  const fetchOverviewData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/customer-analytics/overview', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOverview(response.data.data);
    } catch (err) {
      console.error('Error fetching overview data:', err);
      setError('Failed to load overview data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyActivityData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/customer-analytics/monthly-activity', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMonthlyActivity(response.data.data);
    } catch (err) {
      console.error('Error fetching monthly activity data:', err);
      setError('Failed to load monthly activity data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyTransactionsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/customer-analytics/property-transactions', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPropertyTransactions(response.data.data);
    } catch (err) {
      console.error('Error fetching property transactions data:', err);
      setError('Failed to load property transactions data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacksData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getAllFeedbacks', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setFeedbacks(response.data.data || []);
    } catch (err) {
      console.error('Error fetching feedbacks data:', err);
    }
  };

  useEffect(() => {
    // Fetch initial data for the first tab
    fetchOverviewData();
    fetchMonthlyActivityData();
    fetchFeedbacksData();
  }, []);

  useEffect(() => {
    // Fetch data based on active tab
    if (activeTab === 'overview' && (!overview || !monthlyActivity)) {
      fetchOverviewData();
      fetchMonthlyActivityData();
    } else if (activeTab === 'transactions' && propertyTransactions.length === 0) {
      fetchPropertyTransactionsData();
    }
  }, [activeTab]);

  useEffect(() => {
    // Auto-rotate feedback carousel every 5 seconds
    if (feedbacks.length > 0) {
      const interval = setInterval(() => {
        setCurrentFeedbackIndex((prevIndex) => 
          prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [feedbacks]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Prepare data for monthly spending line chart
  const monthlySpendingData = {
    labels: monthlyActivity?.monthlyActivity.map(item => item.month) || [],
    datasets: [
      {
        label: 'Total Amount Spent',
        data: monthlyActivity?.monthlyActivity.map(item => item.totalAmount) || [],
        fill: false,
        borderColor: '#1cc88a',
        tension: 0.1,
      },
    ],
  };

  // Render Feedback Carousel
  const renderFeedbackCarousel = () => {
    if (feedbacks.length === 0) {
      return (
        <div className="bg-white rounded-lg p-5 shadow-md text-center">
          <p className="text-gray-600">No feedback data available</p>
        </div>
      );
    }

    const currentFeedback = feedbacks[currentFeedbackIndex];
    
    return (
      <div className="bg-white rounded-lg p-5 shadow-md">
        <h3 className="text-xl text-gray-800 mb-5 text-center font-bold border-b pb-2">Customer Feedback</h3>
        <div className="relative p-5 border rounded-lg border-blue-200 bg-blue-50">
          <div className="flex justify-between items-start mb-4">
            <div className="w-2/3">
              <p className="font-bold text-blue-700 text-lg mb-1">
                {currentFeedback.property?.title || 'Property'}
              </p>
              <div className="flex items-center text-gray-700 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                  {currentFeedback.property?.address || 'Address not available'}
                </span>
              </div>
              <p className="text-xs bg-blue-200 text-blue-800 inline-block px-2 py-1 rounded">
                {currentFeedback.property?.type?.toUpperCase() || 'Not specified'}
              </p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg font-bold text-center">
              <div className="text-sm mb-1">Rating</div>
              <div className="text-xl">{currentFeedback.rating || 'N/A'}<span className="text-sm">/5</span></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 italic text-center font-medium">"{currentFeedback.feedbackText || 'No feedback text provided'}"</p>
          </div>
          <div className="mt-5 flex justify-center">
            {feedbacks.map((_, index) => (
              <span 
                key={index} 
                className={`inline-block h-3 w-3 rounded-full mx-1 ${
                  index === currentFeedbackIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderOverviewTab = () => (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-lg p-5 shadow-md text-center">
          <h3 className="text-base text-gray-600 mb-2">Total Rented Properties</h3>
          <p className="text-2xl font-semibold text-blue-600">{overview?.totalRentedProperties || 0}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-md text-center">
          <h3 className="text-base text-gray-600 mb-2">Total Purchased Properties</h3>
          <p className="text-2xl font-semibold text-blue-600">{overview?.totalPurchasedProperties || 0}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-md text-center">
          <h3 className="text-base text-gray-600 mb-2">Total Expenses</h3>
          <p className="text-2xl font-semibold text-blue-600">
            {overview ? `${overview.currency} ${overview.totalExpenses.toLocaleString()}` : '$0'}
          </p>
        </div>
      </div>

      <h2 className="text-xl text-gray-800 mb-5 text-center font-medium">Monthly Activity for {monthlyActivity?.year || new Date().getFullYear()}</h2>
      
      <div className="mb-8">
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="text-lg text-gray-800 mb-5 text-center">Monthly Spending</h3>
          <Line 
            data={monthlySpendingData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: `Amount (${overview?.currency || 'USD'})`
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {renderFeedbackCarousel()}
    </div>
  );

  const renderTransactionsTab = () => (
    <div className="w-full">
      <h2 className="text-xl text-gray-800 mb-5 text-center font-medium">Property Transactions</h2>
      
      {propertyTransactions.length === 0 ? (
        <p className="text-center py-10 text-gray-600 text-lg">No transaction records found.</p>
      ) : (
        propertyTransactions.map((property) => (
          <div className="bg-white rounded-lg p-5 shadow-md mb-5" key={property.property.id}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg text-gray-800 m-0">{property.property.title}</h3>
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{property.property.type}</span>
            </div>
            <p className="text-gray-600 mb-2">{property.property.address}</p>
            <p className="font-semibold text-green-600 mb-5">
              Total Spent: {property.transactions[0]?.currency || 'USD'} {property.totalSpent.toLocaleString()}
            </p>
            
            <h4 className="text-base text-gray-800 mb-2 border-b border-gray-200 pb-1">Transaction History</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-left bg-gray-100 text-blue-600 font-semibold">Date</th>
                    <th className="p-3 text-left bg-gray-100 text-blue-600 font-semibold">Type</th>
                    <th className="p-3 text-left bg-gray-100 text-blue-600 font-semibold">Method</th>
                    <th className="p-3 text-left bg-gray-100 text-blue-600 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {property.transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-200 last:border-b-0">
                      <td className="p-3 text-left">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="p-3 text-left">{transaction.type}</td>
                      <td className="p-3 text-left">{transaction.method}</td>
                      <td className="p-3 text-left">{transaction.currency} {transaction.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-10 text-gray-600 text-lg">Loading analytics data...</div>;
    }

    if (error) {
      return <div className="text-center py-10 text-red-600 text-lg">{error}</div>;
    }

    switch (activeTab) {
      case 'overview':
        return (overview && monthlyActivity) ? renderOverviewTab() : <div className="text-center py-10 text-gray-600 text-lg">Loading overview data...</div>;
      case 'transactions':
        return renderTransactionsTab();
      default:
        return (overview && monthlyActivity) ? renderOverviewTab() : <div className="text-center py-10 text-gray-600 text-lg">Loading overview data...</div>;
    }
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl text-gray-800 mb-2">My Property Analytics</h1>
        <p className="text-base text-gray-600">View your property investments and spending patterns</p>
      </div>

      <div className="flex justify-center mb-8 border-b border-gray-200">
        <button 
          className={`px-6 py-3 text-base bg-transparent border-none cursor-pointer relative text-gray-600 transition-colors hover:text-blue-600 ${activeTab === 'overview' ? 'text-blue-600 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600' : ''}`}
          onClick={() => handleTabChange('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-6 py-3 text-base bg-transparent border-none cursor-pointer relative text-gray-600 transition-colors hover:text-blue-600 ${activeTab === 'transactions' ? 'text-blue-600 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600' : ''}`}
          onClick={() => handleTabChange('transactions')}
        >
          Transactions
        </button>
      </div>

      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerAnalytics;