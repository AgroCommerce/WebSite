import {
  checkToken,
  isProducer
} from "./chunk-D5UYDAD2.js";
import {
  login
} from "./chunk-WW3CPHUU.js";
import {
  addShoppingCart,
  deleteProductById,
  getAllProductsWithNoPagination,
  getProductById,
  getProducts,
  getProductsByProducer,
  getShoppingCart,
  registerProduct,
  removeShoppingCart,
  updateProduct
} from "./chunk-ACHFYKX6.js";
import {
  endSale,
  getSalesByProductId,
  getSalesUser
} from "./chunk-3XDJJBGT.js";
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
} from "./chunk-UVPEXTD7.js";

// src/routes.ts
import express from "express";
var route = express.Router();
route.post("/auth/login", login);
route.post("/user/register", registerUser);
route.get("/get/user", checkToken, getUserById);
route.put("/update/user", checkToken, updateUser);
route.post("/register/product", checkToken, isProducer, registerProduct);
route.get("/get/products/:search", getProducts);
route.get("/get/productsNoPagination", getAllProductsWithNoPagination);
route.get("/get/:producerId/products", getProductsByProducer);
route.get("/get/product/:productId", getProductById);
route.put("/update/product/:productId", checkToken, isProducer, updateProduct);
route.delete("/remove/product/:productId", checkToken, isProducer, deleteProductById);
route.post("/register/producer", checkToken, registerProducer);
route.get("/get/producer", getProducerById);
route.post("/add/shoppingCart", checkToken, addShoppingCart);
route.get("/get/shoppingCart", checkToken, getShoppingCart);
route.delete("/remove/shoppingCart", checkToken, removeShoppingCart);
route.post("/add/address", checkToken, addUserAddress);
route.get("/get/address", checkToken, getUserById);
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
