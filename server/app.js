import express, { urlencoded } from 'express'
import cors from 'cors'
const app = express();
import morgan from 'morgan'
import session  from 'express-session';
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'



app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(session({secret:"value",cookie:{maxAge:60000}}));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }))
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);


app.listen(4000, () => {
    console.log('port is running on 4000')
})


export default app; 


