const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoute');
const pharmacistRoutes = require('./routes/pharmacistRoutes');
const patientRoutes=require('./routes/patientRoutes');
const paymentRoutes =require('./routes/paymentRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const cors =require ('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://localhost:5173'               
}));

connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/appointment', appointmentRoutes );
app.use('/api/doctor', doctorRoutes);
app.use('/api/pharmacist', pharmacistRoutes);
app.use('/api/patients',patientRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/consultations',consultationRoutes);
app.use('/api/prescription',prescriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
