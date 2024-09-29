import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

//__dirname config 
dotenv.config({ path: path.resolve(__dirname, '.env.development') });

const app = express();

//create sever
app.listen(process.env.PORT, () => {
     console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;