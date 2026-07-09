import "reflect-metadata"

import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import routes from "./routes/index.js"

const app = express()

app.use(express.json())
app.use(routes)

app.use(errorMiddleware)

export default app