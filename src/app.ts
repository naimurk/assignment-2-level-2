import express, { Application } from "express"
import cors from "cors"
import { StudentRoutes } from "./app/modules/users/userRoutes"
const app:Application = express()

// parsers
app.use(express.json())
app.use(express.text())

// cors
app.use(cors())

app.use("/api", StudentRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})




export default app