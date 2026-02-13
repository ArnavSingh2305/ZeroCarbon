const express = require('express');
const industryRoutes = require('./routes/industryRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'ZeroCarbon backend is running',
  });
});

app.use('/industries', industryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
