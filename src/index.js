require('dotenv').config();
const express = require('express');
const app = express();

const pegawaiRoutes = require('./routes/pegawaiRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API Pegawai aktif 🚀');
});

app.use('/pegawai', pegawaiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
