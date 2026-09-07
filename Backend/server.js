import app from "./src/app.js"
import config from "./src/config/config.js"
import connectDB from "./src/config/database.js"

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})
connectDB()