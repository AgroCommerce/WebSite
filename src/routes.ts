import express from 'express';
const route = express.Router();

import { addUserAddress, registerUser, registerProducer, addLikedProducts, getUserById, updateUser, deleteAddressById, removeLikedProducts, getLikedProducts, getProducerById } from './controllers/UserController';
import { registerProduct, addShoppingCart, getProductById, getProducts, getProductsByProducer, getShoppingCart, removeShoppingCart, updateStock } from './controllers/ProductController';
import { login } from './controllers/LoginController';
import { endSale, getSalesUser } from './controllers/SalesController'; // Change the import statement to use default import syntax

import { checkToken, isProducer } from './middlewares/AuthToken';

//Rotas sem check, rotas inicias(registro do usuário e login)
route.post("/user/register", registerUser);
route.post("/auth/login", login)

//Rota de registro de produtores

route.post("/register/producer", checkToken ,registerProducer);
route.get("/get/user", getUserById)
route.put("/update/user", checkToken, updateUser)

//Rota de registro de produtos
route.post("/register/product", checkToken, registerProduct);
route.put("/update/product", checkToken, isProducer, updateStock);

route.get("/get/products", getProducts);

route.get("/get/producer", getProducerById);
route.get("/get/:producerId/products/", getProductsByProducer);
route.get("/get/product/:productId", getProductById);
route.get("/get/user/sales", checkToken, getSalesUser)

route.get("/get/shoppingCart", checkToken, getShoppingCart);
route.delete("/remove/shoppingCart", checkToken, removeShoppingCart);

//Rotas de adição de endereço, carrinho e produtos favoritos
route.post("/add/address/", checkToken, addUserAddress) 
route.delete("/remove/address/:addressId", checkToken, deleteAddressById)
route.post("/add/shoppingCart", checkToken, addShoppingCart)
route.post("/add/likedProducts", checkToken, addLikedProducts)
route.delete("/remove/likedProducts", checkToken, removeLikedProducts) 
route.get("/get/likedProducts", checkToken, getLikedProducts) 

//Rota de finalização de compra
route.post("/sales/payment/end", checkToken, endSale)



/*

get-products/limits=x
post-products

get-client
post-client

get-productor
post-productor

get-products-carrinho
post-products-carrinho
get-products-favoritos
post-products-favoritos

get-products-carrinho-finalizar



*/


export default route;