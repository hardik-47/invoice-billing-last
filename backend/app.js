const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes=require('./routes/auth');
const clientRoutes=require('./routes/client');
const invoiceRoutes=require('./routes/invoice');


const corsOptions={

    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
  
  };

app.use(cors(corsOptions));
app.use(express.json());

// Routes will go here
// app.get('/', (req, res) => {
//   res.send('Invoice Billing System API');
// });

app.use('/api/auth',authRoutes);
app.use('/api/clients',clientRoutes);
app.use('/api/invoices',invoiceRoutes);

module.exports = app;
