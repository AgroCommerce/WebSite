import express from 'express';
const route = express.Router();

import {addUserAddress, registerClient, registerProducer} from './controllers/UserController'
import {  } from './controllers/ProductController'
import { login } from './controllers/LoginController'


route.post("/client/register", registerClient)
route.post("/register/:id/producer", registerProducer)

route.post("/add/:id/address", addUserAddress)

route.post("/login", login)

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