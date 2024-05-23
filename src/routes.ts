import express from 'express';
const route = express.Router();

import {addUserAddress, registerUser, registerProducer, addLikedProducts} from './controllers/UserController'
import { registerProduct, addShoppingCart} from './controllers/ProductController'
import { login } from './controllers/LoginController'

import { checkToken } from './middlewares/AuthToken'

//adicionar middleware de autenticação de login nas rotas de add

route.post("/user/register", registerUser)
route.post("/register/:userId/producer", registerProducer) // nesse tbm adicionar middleware de autenticação de login

route.post("/register/:producerId/product", checkToken, registerProduct)

route.post("/add/address", addUserAddress) 
route.post("/add/shoppingCart", addShoppingCart)
route.post("/add/likedProducts", addLikedProducts)

route.post("/:userId/payment")

route.post("/auth/login", login)

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