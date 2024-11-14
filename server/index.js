import userRoute from './routes/User'

const express = require("express");
const app = express();
const port = 3000;

app.use('/api/user', userRoute); 

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
