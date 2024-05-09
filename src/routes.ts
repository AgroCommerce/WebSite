import express from 'express';
const route = express.Router();

import {registerClient, getClients} from './controllers/ClientController'
import {  } from './controllers/ProductController'
import {registerProducer, getProducers} from './controllers/ProducerController'
import { login } from './controllers/LoginController'


route.post("/client/register", registerClient)
route.get("/clients", getClients)
route.post("/login", login)

route.post("/producer/register", registerProducer)
route.get("/producers", getProducers)
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