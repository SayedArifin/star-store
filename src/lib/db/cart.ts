
import { Cart, Prisma } from "@prisma/client";
import prisma from "./prisma"
import { cookies } from "next/dist/client/components/headers";
export type CartWithProducts = Prisma.CartGetPayload<{
    include: { CartItem: { include: { product: true } } }
}>
export type CartWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true }
}>
export type ShoppingCart = CartWithProducts & {
    size: number, subtotal: number

}

export const createCart = async (): Promise<ShoppingCart> => {
    const newCart = await prisma.cart.create({
        data: {}
    })
    cookies().set("localCartId", newCart.id);
    return {
        ...newCart, CartItem: [], size: 0, subtotal: 0,
    }
}




export const getCart = async (): Promise<ShoppingCart | null> => {
    const localCartId = cookies().get("localCartId")?.value;
    const cart = localCartId
        ? await prisma.cart.findUnique({
            where: { id: localCartId },
            include: { CartItem: { include: { product: true } } },
        })
        : null;

    if (!cart) {
        return null;
    }

    return {
        ...cart, size: cart.CartItem.reduce((acc, item) => acc + item.quantity, 0), subtotal: cart.CartItem.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    }
}




