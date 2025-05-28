import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './db.config'
import serviceRoutes from './routes/serviceRoutes'
import orderRoutes from './routes/orderRoutes'
import userRoutes from './routes/userRoute'

dotenv.config()

const port = process.env.PORT || 3000
const app = express()


//corsOption
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

//routes
app.use('/api/services', serviceRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)   

// Connect to MongoDB
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
})
