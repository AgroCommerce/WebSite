import express from 'express';
const route = express.Router();

import {registerClient} from './controllers/ClientController'
import {} from './controllers/ProductController'
import {} from './controllers/ProductorController'


route.post("/client/register", registerClient)
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