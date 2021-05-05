const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", require("./route/jwtAuth"));
app.listen(5000, ()=>{
    console.log('Server Started on port 5000');
});