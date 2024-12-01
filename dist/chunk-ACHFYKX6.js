import {
  getUserId
} from "./chunk-Y27JFKIB.js";
import {
  prisma
} from "./chunk-ERVDTVHJ.js";

// src/controllers/ProductController.ts
import Fuse from "fuse.js";
async function registerProduct(req, res) {
  const { description, title, price, quantity, keyWords, productCost, offer, imgUrl } = req.body;
  const userId = getUserId(req.headers);
  const apartWords = keyWords.split(",");
  if (!userId)
    return res.status(401).json({ messageError: "You must be logged in to register a product" });
  if (!description || !title || !price || !quantity || !keyWords || !productCost || !imgUrl)
    return res.status(400).json({ error: "All fields must be filled" });
  if (apartWords.length > 5 || apartWords.length < 3)
    return res.status(400).json({ error: "KeyWords must have a maximum of 5 words and a minimum of 3" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        producer: true
      }
    });
    const producerId = user?.producer?.id;
    if (!producerId)
      return res.status(404).json({ error: "Producer not found" });
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
    });
    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function updateProduct(req, res) {
  const { description, title, price, quantity, keyWords, productCost, offer, imgUrl } = req.body;
  const userId = getUserId(req.headers);
  const { productId } = req.params;
  if (!userId)
    return res.status(401).json({ messageError: "You must be logged in to update a product" });
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
    ]);
    if (!user?.producer)
      return res.status(401).json({ error: "You must be producer to update a product" });
    const oldDescription = product?.description, oldTitle = product?.title, oldPrice = product?.price, oldQuantity = product?.quantity, oldKeyWords = product?.keyWords, oldImgUrl = product?.imgUrl, oldProductCost = product?.productCost, oldOffer = product?.offer;
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
      });
    }
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function addShoppingCart(req, res) {
  const userId = getUserId(req.headers);
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  if (!productId)
    return res.status(400).json({ messageError: "Invalid body" });
  if (!userId)
    return res.status(401).json({ messageError: "You must" });
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
    ]);
    if (!product)
      return res.status(404).json({ error: "Product not found" });
    if (!user)
      return res.status(404).json({ error: "User not found" });
    const shoppingCart = await prisma.shoppingCart.findFirst({
      where: {
        productId,
        AND: {
          userId
        }
      }
    });
    if (!shoppingCart) {
      await prisma.shoppingCart.create({
        data: {
          userId: user.id,
          productId: product.id
        }
      });
    } else {
      return res.status(400).json({ error: "Product already in shopping cart" });
    }
    return res.status(201).json({ message: "Product added to shopping cart" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function removeShoppingCart(req, res) {
  const userId = getUserId(req.headers);
  const productId = req.body.productId;
  if (!productId)
    return res.status(400).json({ messageError: "Invalid body" });
  if (!userId)
    return res.status(401).json({ messageError: "You must" });
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
    ]);
    if (!product)
      return res.status(404).json({ error: "Product not found" });
    if (!user)
      return res.status(404).json({ error: "User not found" });
    const shoppingCart = await prisma.shoppingCart.findFirst({
      where: {
        productId,
        AND: {
          userId
        }
      }
    });
    if (!shoppingCart) {
      return res.status(400).json({ error: "Product not in shopping cart" });
    } else {
      await prisma.shoppingCart.delete({
        where: {
          id: shoppingCart.id
        }
      });
    }
    return res.status(201).json({ message: "Product removed from shopping cart" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getShoppingCart(req, res) {
  const userId = getUserId(req.headers);
  if (!userId)
    return res.status(401).json({ messageError: "You must be a logged" });
  const shoppingCart = await prisma.shoppingCart.findMany({
    where: {
      userId
    },
    include: {
      product: true
    }
  });
  if (shoppingCart.length === 0)
    return res.status(404).json({ messageError: "Shopping cart is empty" });
  return res.status(200).json(shoppingCart);
}
async function getAllProductsWithNoPagination(req, res) {
  try {
    const productsNoPag = await prisma.product.findMany({
      include: {
        LikedProducts: true,
        producer: true
      }
    });
    const productsJson = JSON.stringify(productsNoPag, toObject);
    return res.status(200).json(JSON.parse(productsJson));
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getProducts(req, res) {
  const page = req.query.page;
  const search = req.params.search;
  const limit = 10;
  try {
    const products = await prisma.product.findMany({
      include: {
        LikedProducts: true,
        producer: true
      },
      orderBy: { createdAt: "desc" }
    });
    const fuse = new Fuse(products, {
      keys: ["title", "description", "keyWords"],
      // Campos de busca
      threshold: 0.3
      // Controle de proximidade (0 = exato, 1 = amplo)
    });
    const filteredProducts = search ? fuse.search(search).map((result) => result.item) : products;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + limit
    );
    const productsJson = JSON.stringify(paginatedProducts, toObject);
    const pages = Math.ceil(filteredProducts.length / 10);
    const returnApi = {
      data: JSON.parse(productsJson),
      info: {
        pages,
        count: filteredProducts.length,
        haveNextPage: startIndex + limit < filteredProducts.length
      }
    };
    return res.status(200).json(returnApi);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getProductById(req, res) {
  const { productId } = req.params;
  if (!productId)
    return res.status(400).json({ messageError: "Invalid body" });
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: Number(productId)
      }
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getProductsByProducer(req, res) {
  const { producerId } = req.params;
  if (!producerId)
    return res.status(401).json({ messageError: "You must be a logged" });
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
  });
  const productsJson = JSON.stringify(products, toObject);
  return res.status(200).json(JSON.parse(productsJson));
}
async function deleteProductById(req, res) {
  const { productId } = req.params;
  if (!productId)
    return res.status(400).json({ messageError: "Invalid body" });
  try {
    await prisma.product.delete({
      where: {
        id: Number(productId)
      }
    });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
function toObject(key, value) {
  return typeof value === "bigint" ? value.toString() : value;
}

export {
  registerProduct,
  updateProduct,
  addShoppingCart,
  removeShoppingCart,
  getShoppingCart,
  getAllProductsWithNoPagination,
  getProducts,
  getProductById,
  getProductsByProducer,
  deleteProductById,
  toObject
};
