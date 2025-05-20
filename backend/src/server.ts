import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { recipeRoutes } from './routes/recipeRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', recipeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to RecipeTypes Book API!');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Recipe Book API is running on http://localhost:${port}`);
});

export default app;
