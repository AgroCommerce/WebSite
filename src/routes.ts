import express from 'express';
const route = express.Router();

import {addUserAddress, registerUser, registerProducer} from './controllers/UserController'
import { registerProduct, addShoppingCart } from './controllers/ProductController'
import { login } from './controllers/LoginController'

import { checkToken } from './middlewares/AuthToken'


route.post("/user/register", registerUser)
route.post("/register/:id/producer", registerProducer)
route.post("/register/:producerId/product", checkToken, registerProduct)

route.post("/add/:id/address", addUserAddress) 
route.post("/add/:userId/shoppingCart", addShoppingCart)
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