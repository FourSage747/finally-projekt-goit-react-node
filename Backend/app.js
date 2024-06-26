const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const {DB_HOST} = process.env
const app = express();


const contactsRouter = require("./routes/contactsRouter.js")
const authRouter = require("./routes/auth.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/users", authRouter)
app.use("/api/products", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


mongoose.set('strictQuery', true)
mongoose.connect(DB_HOST)
  .then(()=>{
    app.listen(3800, () => {
      console.log("Server is running. Use our API on port: 3001");
    });
  })
  .catch((error)=>{
    console.log(error.message)
    process.exit(1)
  })