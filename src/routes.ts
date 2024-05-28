import express from 'express';
const route = express.Router();

import { addUserAddress, registerUser, registerProducer, addLikedProducts } from './controllers/UserController';
import { registerProduct, addShoppingCart } from './controllers/ProductController';
import { login } from './controllers/LoginController';
import { endSale } from './controllers/SalesController'; // Change the import statement to use default import syntax

import { checkToken, isProducer } from './middlewares/AuthToken';

//Rotas sem check, rotas inicias(registro do usuário e login)
route.post("/user/register", registerUser);
route.post("/auth/login", login)

//Rota de registro de produtores
route.post("/register/producer", checkToken ,registerProducer);

//Rota de registro de produtos
route.post("/register/product", checkToken, isProducer, registerProduct);

//Rotas de adição de endereço, carrinho e produtos favoritos
route.post("/add/address", checkToken, addUserAddress) 
route.post("/add/shoppingCart", checkToken, addShoppingCart)
route.post("/add/likedProducts", checkToken, addLikedProducts)

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