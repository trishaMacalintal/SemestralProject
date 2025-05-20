const express = require('express');
const cors = require('cors');
const app = express();
const statsRoutes = require('./routes/stats');

app.use(cors());
app.use('/api', statsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
