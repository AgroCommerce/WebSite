import {
  checkToken,
  isProducer
} from "./chunk-3QXH6JM4.mjs";
import {
  login
} from "./chunk-MDIPSNWF.mjs";
import {
  addShoppingCart,
  deleteProductById,
  getProductById,
  getProducts,
  getProductsByProducer,
  getShoppingCart,
  registerProduct,
  removeShoppingCart,
  updateProduct
} from "./chunk-7WSMPOLR.mjs";
import {
  endSale,
  getSalesByProductId,
  getSalesUser
} from "./chunk-JWL6NCQD.mjs";
import {
  addLikedProducts,
  addUserAddress,
  deleteAddressById,
  getInOfferProducts,
  getLikedProducts,
  getProducerById,
  getUserById,
  registerProducer,
  registerUser,
  removeLikedProducts,
  updateUser
} from "./chunk-Y3VVHBFX.mjs";

// src/routes.ts
import express from "express";
var route = express.Router();
route.post("/auth/login", login);
route.post("/user/register", registerUser);
route.get("/get/user", getUserById);
route.put("/update/user", checkToken, updateUser);
route.post("/register/product", checkToken, isProducer, registerProduct);
route.get("/get/products", getProducts);
route.get("/get/:producerId/products/", getProductsByProducer);
route.get("/get/product/:productId", getProductById);
route.put("/update/product/:productId", checkToken, isProducer, updateProduct);
route.delete("/remove/product/:productId", checkToken, isProducer, deleteProductById);
route.post("/register/producer", checkToken, registerProducer);
route.get("/get/producer", getProducerById);
route.post("/add/shoppingCart", checkToken, addShoppingCart);
route.get("/get/shoppingCart", checkToken, getShoppingCart);
route.delete("/remove/shoppingCart", checkToken, removeShoppingCart);
route.post("/add/address/", checkToken, addUserAddress);
route.delete("/remove/address/:addressId", checkToken, deleteAddressById);
route.post("/add/likedProducts", checkToken, addLikedProducts);
route.get("/get/likedProducts", checkToken, getLikedProducts);
route.delete("/remove/likedProducts", checkToken, removeLikedProducts);
route.get("/get/inOfferProducts", getInOfferProducts);
route.post("/sales/payment/end", checkToken, endSale);
route.get("/get/user/sales", checkToken, getSalesUser);
route.get("/get/sales/:productId", checkToken, getSalesByProductId);
var routes_default = route;

export {
  routes_default
};
