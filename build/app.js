"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes_1 = require("./routes/routes");
const app = express();
//settings
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//Routes
app.use(routes_1.router);
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
