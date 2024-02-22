import connectToDB from "./db/index.js"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()

const app = express()

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

const PORT = process.env.PORT || 5000

connectToDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error connecting to Database: ", error)
    })

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT)
    })
  })
  .catch((error) => {
    console.log("MongoDB connection failed !!!", error)
  })

// Route Imports
import userRouter from "./routes/user.routes.js"

// Route declarations
app.use("/api/v1/users", userRouter)
