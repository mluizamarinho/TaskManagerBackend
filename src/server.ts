import express from 'express';
import dotenv from 'dotenv';
import router from './ui/routes/routes';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
