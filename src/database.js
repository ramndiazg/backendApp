import mongoose from "mongoose";
mongoose
  .connect("mongodb+srv://ramn:Samsung01@backendapp.ogo8efp.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => console.log("DB is connected"))
  .catch((error) => console.error(error));
