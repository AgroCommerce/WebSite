import { Request, Response } from 'express';
import { Product } from "@prisma/client";
import { prisma } from '../lib/prisma.js'

import { getProducerId, getUserId } from '../utils/getHeaderData.js'
import Fuse from 'fuse.js'

//add update stock
export async function registerProduct(req: Request, res: Response) {
    const { description, title, price, quantity, keyWords, productCost, offer, imgUrl } = req.body as Product
    const userId = getUserId(req.headers)

    const apartWords = keyWords.split(',')
    if (!userId) return res.status(401).json({ messageError: 'You must be logged in to register a product' })

    if (!description || !title || !price || !quantity || !keyWords || !productCost || !imgUrl) return res.status(400).json({ error: 'All fields must be filled' })
    if (apartWords.length > 5 || apartWords.length < 3) return res.status(400).json({ error: 'KeyWords must have a maximum of 5 words and a minimum of 3' })

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                producer: true
            }
        })

        const producerId = user?.producer?.id
        if (!producerId) return res.status(404).json({ error: 'Producer not found' })

        await prisma.product.create({
            data: {
                description,
                title,
                price,
                quantity,
                keyWords,
                imgUrl,
                producerId,
                productCost,
                offer: offer ? offer : 0
            }
        })

        return res.status(201).json({ message: 'Product created successfully' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function updateProduct(req: Request, res: Response) {
    const { description, title, price, quantity, keyWords, productCost, offer, imgUrl } = req.body as Product
    const userId = getUserId(req.headers)
    const { productId } = req.params
    if (!userId) return res.status(401).json({ messageError: 'You must be logged in to update a product' })

    try {
        const [user, product] = await Promise.all([
            prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    producer: true
                }
            }),
            prisma.product.findUnique({
                where: {
                    id: Number(productId)
                }
            })
        ])

        if (!user?.producer) return res.status(401).json({ error: 'You must be producer to update a product' })

        const oldDescription = product?.description as string,
            oldTitle = product?.title as string,
            oldPrice = product?.price as unknown as number,
            oldQuantity = product?.quantity as unknown as number,
            oldKeyWords = product?.keyWords as string,
            oldImgUrl = product?.imgUrl as string[],
            oldProductCost = product?.productCost as unknown as number,
            oldOffer = product?.offer as unknown as number

        if (product) {
            await prisma.product.update({
                where: {
                    id: Number(productId)
                },
                data: {
                    description: description ? description : oldDescription,
                    title: title ? title : oldTitle,
                    price: price ? price : oldPrice,
                    quantity: quantity ? quantity : oldQuantity,
                    keyWords: keyWords ? keyWords : oldKeyWords,
                    imgUrl: imgUrl ? imgUrl : oldImgUrl,
                    productCost: productCost ? productCost : oldProductCost,
                    offer: offer ? offer : oldOffer
                }
            })
        }

        return res.status(200).json({ message: 'Product updated successfully' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function addShoppingCart(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    const productId: Product['id'] = req.body.productId
    const quantity: number = req.body.quantity

    if (!productId) return res.status(400).json({ messageError: 'Invalid body' })
    if (!userId) return res.status(401).json({ messageError: 'You must' })

    try {
        const [product, user] = await Promise.all([
            prisma.product.findUnique({
                where: {
                    id: productId
                }
            }),
            prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
        ])

        if (!product) return res.status(404).json({ error: 'Product not found' })
        if (!user) return res.status(404).json({ error: 'User not found' })

        const shoppingCart = await prisma.shoppingCart.findFirst({
            where: {
                productId,
                AND: {
                    userId
                }
            }
        })

        if (!shoppingCart) {
            await prisma.shoppingCart.create({
                data: {
                    userId: user.id,
                    productId: product.id,
                }
            })
        } else {
            return res.status(400).json({ error: 'Product already in shopping cart' })
        }

        return res.status(201).json({ message: 'Product added to shopping cart' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function removeShoppingCart(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    const productId: Product['id'] = req.body.productId

    if (!productId) return res.status(400).json({ messageError: 'Invalid body' })
    if (!userId) return res.status(401).json({ messageError: 'You must' })

    try {
        const [product, user] = await Promise.all([
            prisma.product.findUnique({
                where: {
                    id: productId
                }
            }),
            prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
        ])

        if (!product) return res.status(404).json({ error: 'Product not found' })
        if (!user) return res.status(404).json({ error: 'User not found' })

        const shoppingCart = await prisma.shoppingCart.findFirst({
            where: {
                productId,
                AND: {
                    userId
                }
            }
        })

        if (!shoppingCart) {
            return res.status(400).json({ error: 'Product not in shopping cart' })
        } else {
            await prisma.shoppingCart.delete({
                where: {
                    id: shoppingCart.id
                }
            })
        }

        return res.status(201).json({ message: 'Product removed from shopping cart' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getShoppingCart(req: Request, res: Response) {
    const userId = getUserId(req.headers)

    if (!userId) return res.status(401).json({ messageError: 'You must be a logged' })

    const shoppingCart = await prisma.shoppingCart.findMany({
        where: {
            userId
        },
        include: {
            product: true
        }
    })

    if (shoppingCart.length === 0) return res.status(404).json({ messageError: 'Shopping cart is empty' })
    return res.status(200).json(shoppingCart)
}

export async function getAllProductsWithNoPagination(req: Request, res: Response) {
    try {
        const productsNoPag = await prisma.product.findMany({
            include: {
                LikedProducts: true,
                producer: true
            }
        })

        const productsJson = JSON.stringify(productsNoPag, toObject);
        return res.status(200).json(JSON.parse(productsJson))
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getProducts(req: Request, res: Response) {
    const page = req.query.page as unknown as number
    const filter = req.query.filter as string
    const search = req.params.search
    const limit = 10

    try {
        const products = await prisma.product.findMany({
            include: {
                LikedProducts: true,
                producer: true
            },
            orderBy: { createdAt: 'desc' },
        })

        const fuse = new Fuse(products, {
            keys: ['title', 'description', 'keyWords'], // Campos de busca
            threshold: 0.3, // Controle de proximidade (0 = exato, 1 = amplo)
        });

        const filteredProducts = search
            ? fuse.search(search as string).map((result) => result.item)
            : products;

        console.log("Antes do switch", filteredProducts)

        switch (filter) {
            case 'price': // Ordenar por preço crescente
                filteredProducts.sort((a, b) => ((Number(a.price) - (Number(a.price) * (Number(a.offer) ?? 0))) - (Number(b.price) - (Number(b.price) * (Number(b.offer) ?? 0)))));
                break;
            case 'offers': // Ordenar por ofertas crescente
                filteredProducts.sort((a, b) => (Number(a.offer) ?? 0) - (Number(b.offer) ?? 0)).reverse();
                break;
            case 'az': // Ordenar por título (A-Z)
                filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'za': // Ordenar por título (Z-A)
                filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        console.log("Depois do switch", filteredProducts)

        const startIndex = (page - 1) * limit;
        const paginatedProducts = filteredProducts.slice(
            startIndex,
            startIndex + limit
        );

        const productsJson = JSON.stringify(paginatedProducts, toObject);
        const pages = Math.ceil(filteredProducts.length / 10)

        const returnApi = {
            data: JSON.parse(productsJson),
            info: {
                pages,
                count: filteredProducts.length,
                haveNextPage: startIndex + limit < filteredProducts.length,
            }
        }
        return res.status(200).json(returnApi)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getProductById(req: Request, res: Response) {
    const { productId } = req.params

    if (!productId) return res.status(400).json({ messageError: 'Invalid body' })

    try {
        const product = await prisma.product.findFirst({
            where: {
                id: Number(productId)
            }
        })
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getProductsByProducer(req: Request, res: Response) {
    const { producerId } = req.params

    if (!producerId) return res.status(401).json({ messageError: 'You must be a logged' })

    const products = await prisma.product.findMany({
        where: {
            producerId
        },
        include: {
            sales: {
                include: {
                    sales: true
                }
            }
        }
    })

    const productsJson = JSON.stringify(products, toObject);
    return res.status(200).json(JSON.parse(productsJson))
}

export async function deleteProductById(req: Request, res: Response) {
    const { productId } = req.params
    if (!productId) return res.status(400).json({ messageError: 'Invalid body' })

    try {
        await prisma.product.delete({
            where: {
                id: Number(productId)
            }
        })

        return res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export function toObject(key: string, value: any) {
    return typeof value === 'bigint'
        ? value.toString()
        : value; // return everything else unchanged
}


