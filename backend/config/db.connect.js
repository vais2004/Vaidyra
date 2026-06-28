import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://vkawale2004_db_user:w6bitztzzPQtDk7g@cluster0.hlxj8jv.mongodb.net/Vaidyra",
    )
    .then(() => {
      console.log("DB CONNECTED");
    });
};
