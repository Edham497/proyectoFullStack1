import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {expressCspHeader, SELF } from 'express-csp-header'

//Routes
import ProductRoutes from './routes/products/products'

const app = express();
app.use(cors());
app.use(express.json());
app.use(expressCspHeader({
  policies: {
    'default-src': [SELF],
    'img-src': [SELF],
  },
  reportOnly: true
}))

const password = "3dh4m";
const db = "tienda";

mongoose
  .connect(
    `mongodb+srv://edham:${password}@proyectofullstack.xm1zv.mongodb.net/${db}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
  )
  .then((db) => console.log("DB connected"))
  .catch((err) => console.error(err));

app.use('/products', ProductRoutes)

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log("http://localhost:" + app.get("port"));
});
