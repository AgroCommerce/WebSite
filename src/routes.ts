import express from 'express';
const route = express.Router();

import { addUserAddress, registerUser, registerProducer, addLikedProducts, getUserById, updateUser, deleteAddressById, removeLikedProducts, getLikedProducts, getProducerById, getInOfferProducts, deleteUser, changePassword, updateAddress } from './controllers/UserController.js';
import { registerProduct, addShoppingCart, getProductById, getProducts, getProductsByProducer, getShoppingCart, removeShoppingCart, deleteProductById, updateProduct, getAllProductsWithNoPagination } from './controllers/ProductController.js';
import { login } from './controllers/LoginController.js';
import { endSale, getSalesByProductId, getSalesUser } from './controllers/SalesController.js'; // Change the import statement to use default import syntax

import { checkToken, isProducer } from './middlewares/AuthToken.js';

//rota de login
route.post("/auth/login", login)

//Rotas de usuário
route.post("/user/register", registerUser);
route.get("/get/user", checkToken ,getUserById)
route.put("/update/user", checkToken, updateUser)
route.put("/update/user/password", checkToken, changePassword)
route.delete("/delete/user", checkToken, deleteUser)

//Rotas de produtos
route.post("/register/product", checkToken, isProducer, registerProduct);
route.get("/get/products/:search", getProducts);
route.get("/get/productsNoPagination", getAllProductsWithNoPagination);
route.get("/get/:producerId/products", getProductsByProducer);
route.get("/get/product/:productId", getProductById);
route.put("/update/product/:productId", checkToken, isProducer, updateProduct);
route.delete("/remove/product/:productId", checkToken, isProducer, deleteProductById);
 
//Rotas de carrinho de produtores
route.post("/register/producer", checkToken ,registerProducer);
route.get("/get/producer", getProducerById);

//Rotas de carrinho de compras
route.post("/add/shoppingCart", checkToken, addShoppingCart)
route.get("/get/shoppingCart", checkToken, getShoppingCart);
route.delete("/remove/shoppingCart", checkToken, removeShoppingCart);

//Rotas de adição de endereço, carrinho e produtos favoritos
route.post("/add/address", checkToken, addUserAddress) 
route.get("/get/address", checkToken, getUserById)
route.put("/update/address", checkToken, updateAddress)
route.delete("/remove/address/:addressId", checkToken, deleteAddressById)

//Rotas de produtos favoritos
route.post("/add/likedProducts", checkToken, addLikedProducts)
route.get("/get/likedProducts", checkToken, getLikedProducts) 
route.delete("/remove/likedProducts", checkToken, removeLikedProducts) 

//Rotas de ofertas
route.get("/get/inOfferProducts", getInOfferProducts) 

//Rota de finalização de compra
route.post("/sales/payment/end", checkToken, endSale)
route.get("/get/user/sales", checkToken, getSalesUser)
route.get("/get/sales/:productId", checkToken, getSalesByProductId)

export default route;