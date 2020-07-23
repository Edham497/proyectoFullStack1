import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import history from 'connect-history-api-fallback'

import settings from './data/settings.json'

//Routes
import ProductRoutes from './routes/products'
import UserRoutes from './routes/user'
// import UploadRoutes from './routes/upload'
import AuthRoutes from './routes/auth'
import FavoritosRoutes from './routes/favoritos'
import ComprasRoutes from './routes/compras'

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://edham:${settings.pw}@proyectofullstack.xm1zv.mongodb.net/${settings.db}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
  )
  .then((db) => console.log("DB connected"))
  .catch((err) => console.error(err));

app.use(history());

app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/favoritos', FavoritosRoutes)
app.use('/api/compras', ComprasRoutes)
app.use(express.static(__dirname + "/dist"));

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
  console.log("http://localhost:" + app.get("port"));
});
