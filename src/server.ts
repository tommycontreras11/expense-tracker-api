import app from "./app.js"
import config from "./config/index.js"
import { connectDatabase } from "./database/initialize.js"

async function bootstrap() {
    try {
        await connectDatabase()
        app.listen(config.PORT, () => console.log(`The server is running ${config.PORT}`))
    } catch (error) {
        console.log("Failed to start application: ", error)
        process.exit(1)
    }
}

bootstrap()