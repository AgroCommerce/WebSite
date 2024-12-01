import {
  getUserId
} from "./chunk-Y27JFKIB.js";
import {
  prisma
} from "./chunk-ERVDTVHJ.js";

// src/controllers/SalesController.ts
async function endSale(req, res) {
  const userId = getUserId(req.headers);
  const paymentMethod = req.body.paymentMethod;
  const userAddressId = req.body.userAddressId;
  const quantity = req.body.quantity;
  const freight = req.body.freight;
  const discount = req.body.discount;
  if (!paymentMethod || !userAddressId || !quantity || !freight || !discount)
    return res.status(400).json({ error: "Invalid body! " });
  if (!userId)
    return res.status(401).json({ error: "You must be logged in to complete a sale" });
  if (quantity.length === 0)
    return res.status(400).json({ error: "Quantity is empty" });
  try {
    const [data, user] = await Promise.all([
      prisma.shoppingCart.findMany({
        where: {
          userId
        },
        include: {
          product: true
        }
      }),
      prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          userAddress: true
        }
      })
    ]);
    if (!user)
      return res.status(404).json({ error: "User not found" });
    const addressId = user.userAddress.find((address) => {
      return address.id === userAddressId;
    });
    if (!addressId)
      return res.status(404).json({ error: "Address not found" });
    const products = data.map((product) => {
      return product.product;
    });
    if (products.length === 0)
      return res.status(400).json({ error: "Shopping cart is empty" });
    if (quantity.length !== products.length)
      return res.status(400).json({ error: "Quantity is invalid" });
    const total = [];
    let totalValue = 0;
    for (let i = 0; i < quantity.length; i++) {
      if (quantity[i] > products[i].quantity) {
        return res.status(400).json({ error: "Quantity is invalid" });
      }
      total.push(Number(products[i].price) * quantity[i]);
      totalValue += total[i];
      await prisma.product.update({
        where: {
          id: products[i].id
        },
        data: {
          quantity: products[i].quantity - quantity[i]
        }
      });
    }
    await prisma.sales.create({
      data: {
        userId,
        paymentMethod,
        userAddressId,
        total: totalValue + freight - discount,
        products: {
          create: products.map((product, index) => {
            return {
              product: { connect: { id: product.id } },
              quantity: quantity[index]
            };
          })
        }
      }
    });
    await prisma.shoppingCart.deleteMany({
      where: {
        userId
      }
    });
    return res.status(200).json({ message: "Sale completed successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getSalesUser(req, res) {
  const userId = getUserId(req.headers);
  if (!userId)
    return res.status(401).json({ error: "You must be logged in to see your sales" });
  try {
    const data = await prisma.sales.findMany({
      where: {
        userId
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
    const dataJson = JSON.stringify(data, toObject);
    return res.status(200).json(JSON.parse(dataJson));
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getSalesByProductId(req, res) {
  const { productId } = req.params;
  if (!productId)
    return res.status(400).json({ error: "Invalid params" });
  try {
    const data = await prisma.sales.findMany({
      where: {
        products: {
          some: {
            productId: Number(productId)
          }
        }
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
    const dataJson = JSON.stringify(data, toObject);
    return res.status(200).json(JSON.parse(dataJson));
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
function toObject(key, value) {
  return typeof value === "bigint" ? value.toString() : value;
}

export {
  endSale,
  getSalesUser,
  getSalesByProductId,
  toObject
};
