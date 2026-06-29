import app from "./app.js"

async function bootstrap() {
    try {
        app.listen(3000, () => console.log(`The server is running 3000`))
    } catch (error) {
        console.log("Failed to start application: ", error)
    }
}

bootstrap()