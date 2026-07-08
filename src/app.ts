import "reflect-metadata"

import express from "express"
import routes from "./routes/index.js"

const app = express()

app.use(routes)
app.use(express.json())

export default app