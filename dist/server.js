import {
  routes_default
} from "./chunk-QXPZPWPD.js";
import "./chunk-D5UYDAD2.js";
import "./chunk-WW3CPHUU.js";
import "./chunk-ACHFYKX6.js";
import "./chunk-3XDJJBGT.js";
import "./chunk-UVPEXTD7.js";
import "./chunk-DVC7Z7AO.js";
import "./chunk-Y27JFKIB.js";
import "./chunk-ERVDTVHJ.js";

// src/server.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
var app = express();
app.use(cors({
  origin: "*"
  //only in develpment in productions is your domain aplication
}));
app.use(cookieParser());
var port = process.env.PORT || 3333;
app.use(express.json());
app.use(routes_default);
app.listen(port, () => {
  console.log(`Acessar http://localhost:${port}`);
  console.log(`server executando na porta ${port}`);
});
