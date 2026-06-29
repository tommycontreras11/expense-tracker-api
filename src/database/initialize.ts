import AppDataSource from "./data-source.js"

export const connectDatabase = async () => {
    try {
        await AppDataSource.initialize()
        console.log("✅ Connected successfully to the database")
    } catch (error) {
        console.log("Something went wrong while trying to connect to the db: ", error)
        process.exit(1)
    }
}