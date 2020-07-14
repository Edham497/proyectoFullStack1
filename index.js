import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import csp from 'express-csp-header'

//Routes
import ProductRoutes from './routes/products/products'

const app = express();
app.use(cors());
app.use(express.json());
app.use(csp({
  policies: {
    'default-src': [csp.NONE],
    'img-src': [csp.SELF],
  }
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
