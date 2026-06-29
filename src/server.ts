import app from "./app"
import config from "./config/"

async function bootstrap() {
    try {
        app.listen(config.PORT, () => console.log(`The server is running ${config.PORT}`))
    } catch (error) {
        console.log("Failed to start application: ", error)
    }
}

bootstrap()