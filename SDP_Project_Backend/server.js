const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const ForgotRoute = require("./routes/forgotPassword");
const profileRoute = require("./routes/profile");
const updateUserRoute = require("./routes/updateUser");
const profileDetailsRoute = require("./routes/profileDetailsRoute");
const deleteUserRoute = require("./routes/deleteUser");
const submitPropertyRoute = require("./routes/SubmitProperty");
const getPropertyRoute = require("./routes/getProperty");
const editPropertyRoute = require("./routes/editProperty");
const deletePropertyRoute = require("./routes/deleteProperty");
const getPropertyByIdRoute = require("./routes/getPropertyByid");
const getAllUsersRoute = require("./routes/getAllUsers");
const searchPropertyRoute = require("./routes/SearchProperty");
const filterApartmentRoute = require('./routes/FilterApartment');
const filterFarmhouseRoute = require('./routes/FilterFarmhouse');
const filterLandRoute = require('./routes/FilterLand');
const filterOfficeRoute = require('./routes/FilterOffice');
const viewPropertyRoute = require("./routes/ViewProperty");
const paymentRoutes = require('./routes/paymentRoutes');
const bookedPropertyRoutes = require('./routes/getBookedProperty'); // Add this line
const notificationRoutes = require('./routes/notificationRoutes');
const propertyRoutes = require('./routes/getPropertyByPropertyId');
const propertyTypeRoutes = require('./routes/getCollectionByPropertyId');
const analyticsRoutes = require('./routes/analyticsRoute');
const feedbackRoute = require("./routes/feedbackRoute");
const deleteUserByAdminRoutes = require('./routes/deleteUserByAdmin');
const getAllPaymentsRoutes = require('./routes/getAllPayments');
const feedbackGraphRoutes = require('./routes/feedbackGraphRoutes');
const ownerAnalysisRoutes = require('./routes/ownerAnalysis');
const customerAnalysisRoutes = require('./routes/customerAnalysis');
const getAllFeedbacksRoute = require('./routes/getAllFeedbacks');
const viewRoutes = require('./routes/propertyView');
const viewGraphRoutes = require('./routes/viewGraph');
const monthlyUniqueUsersRoute = require('./routes/userActivityByAdmin');
const rentTimerRoutes = require('./routes/rentTimerRoutes');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api", ForgotRoute);
app.use("/api/profile", profileRoute);
app.use("/api/updateUser", updateUserRoute);
app.use("/api/profileDetails", profileDetailsRoute);
app.use("/api", deleteUserRoute);
app.use("/api", submitPropertyRoute);
app.use("/api", getPropertyRoute);
app.use("/api", editPropertyRoute);
app.use("/api", deletePropertyRoute); 
app.use("/api", getPropertyByIdRoute);
app.use('/api', deleteUserByAdminRoutes)
app.use("/api/users", getAllUsersRoute)
app.use("/api", searchPropertyRoute);
app.use('/api', filterApartmentRoute);
app.use('/api', filterFarmhouseRoute);
app.use('/api', filterLandRoute);
app.use('/api', filterOfficeRoute);
app.use("/api", viewPropertyRoute);
app.use('/api/payments', paymentRoutes);
app.use('/api', bookedPropertyRoutes); // Add this line
app.use('/api/notifications', notificationRoutes);
app.use('/api/property', propertyTypeRoutes);
app.use(propertyRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api', feedbackRoute);
app.use('/api', feedbackGraphRoutes);
app.use('/api/analytics', ownerAnalysisRoutes);
app.use('/api/customer-analytics', customerAnalysisRoutes);
app.use('/api', getAllFeedbacksRoute);
app.use('/api/views', viewRoutes);
app.use('/api/view-graph', viewGraphRoutes);
app.use('/api/analytics', monthlyUniqueUsersRoute);
app.use('/api', rentTimerRoutes);

app.get("/", (req, res) => {
  res.send("HomeHub360 API is running...");
});

// Serve static files from the React frontend app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});