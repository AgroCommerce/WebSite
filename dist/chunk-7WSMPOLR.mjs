import {
  getUserId
} from "./chunk-KKZXZF3U.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/controllers/ProductController.ts
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
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function updateProduct(req, res) {
  const { description, title, price, quantity, keyWords, productCost, offer, imgUrl } = req.body;
  const userId = getUserId(req.headers);
  const { productId } = req.params;
  if (!userId)
    return res.status(401).json({ messageError: "You must be logged in to update a product" });
  console.log("BODY", req.body);
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
      return res.status(404).json({ error: "You must be producer to update a product" });
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
    console.log(error);
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
async function getProducts(req, res) {
  const products = await prisma.product.findMany({
    include: {
      LikedProducts: true
    }
  });
  return res.status(200).json(products);
}
async function getProductById(req, res) {
  const { productId } = req.params;
  if (!productId)
    return res.status(400).json({ messageError: "Invalid body" });
  try {
    console.log(productId);
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
    console.log(error);
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
  getProducts,
  getProductById,
  getProductsByProducer,
  deleteProductById,
  toObject
};
