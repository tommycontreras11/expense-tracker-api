import "reflect-metadata"

import express from "express"
import routes from "./routes/index.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import { validateDto } from "./middlewares/validate-dto.middleware.js"

const app = express()

app.use(express.json())
app.use(routes)

app.use(errorMiddleware)

export default app