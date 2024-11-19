import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes/mpesa.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));