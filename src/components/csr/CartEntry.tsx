"use client"
import Image from "next/image"
import { CartWithProduct } from "@/lib/db/cart"
import Link from "next/link"
import { formatPrice } from "@/lib/format"
import { useTransition } from "react"
interface CartEntryProps {
    cartItem: CartWithProduct;
    setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}
const quantityOptions: JSX.Element[] = [];
for (let i = 1; i <= 10; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>);
}
const CartEntry = ({ cartItem: { product, quantity }, setProductQuantity }: CartEntryProps) => {
    const [isPending, setTransition] = useTransition();
    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg" />
                <div className="">
                    <Link href={"/products/" + product.id} className="font-bold">{product.name}</Link>
                    <div className="">Price:{formatPrice(product.price)}</div>
                    <div className="my-1 flex items-center gap-2">
                        Quantity: <select defaultValue={quantity} onChange={e => {
                            const newQuantity = parseInt(e.currentTarget.value)
                            setTransition(async () => {
                                await setProductQuantity(product.id, newQuantity)
                            })
                        }} className="select select-bordered w-full max-w-[80px] ">
                            {quantityOptions}
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-info  " onClick={e => {
                            setTransition(async () => {
                                await setProductQuantity(product.id, 0)
                            })
                        }}>Remove</button>
                    </div>
                    {isPending ? <span className="loading loading-spinner loading-sm" /> : <div className="flex items-center gap-3">Total: {formatPrice(product.price * quantity)}</div>}
                </div>
            </div>

            <div className="divider" />
        </div>
    )
}

export default CartEntry;