require("./config");
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const app = express();

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});