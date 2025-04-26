const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
// const pegawaiRoutes = require('./routes/pegawaiRoutes');
const productRoutes = require('./routes/productRoutes')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());


app.get('/', (req, res) => {
  res.send('API Pegawai aktif 🚀');
});

// app.use('/pegawai', pegawaiRoutes);

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/products', productRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
}); 