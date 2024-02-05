const express = require('express');
const morgan= require('morgan');
const cors= require('cors');
import { router as routes } from './routes/routes';


const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//Routes
app.use(routes);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


