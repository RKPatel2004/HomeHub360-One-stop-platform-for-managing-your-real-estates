const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const signupRoute=require("./routes/signup");
const loginRoute=require("./routes/login");
const ForgotRoute = require("./routes/forgotPassword");
const profileRoute = require("./routes/profile");
const updateUserRoute = require("./routes/updateUser");
const profileDetailsRoute = require("./routes/profileDetailsRoute");
const deleteUserRoute = require("./routes/deleteUser");
const submitPropertyRoute = require('./routes/SubmitProperty');
const getPropertyRoute = require("./routes/getProperty");
const editPropertyRoute = require("./routes/editProperty");
const deletePropertyRoute = require("./routes/deleteProperty");
const getPropertyByIdRoute = require("./routes/getPropertyById");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/api",signupRoute);
app.use("/api",loginRoute);
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

app.get('/', (req, res) => {
  res.send('HomeHub360 API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
