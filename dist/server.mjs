import {
  routes_default
} from "./chunk-6JBURBNF.mjs";
import "./chunk-3QXH6JM4.mjs";
import "./chunk-MDIPSNWF.mjs";
import "./chunk-7WSMPOLR.mjs";
import "./chunk-JWL6NCQD.mjs";
import "./chunk-Y3VVHBFX.mjs";
import "./chunk-2YMIUCLM.mjs";
import "./chunk-KKZXZF3U.mjs";
import "./chunk-JV6GRE7Y.mjs";

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
