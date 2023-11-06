"use client"
import { ShoppingCart } from "@/lib/db/cart"
import { formatPrice } from "@/lib/format";
import Link from "next/link"

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null;
}

const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
    const closeDropdown = () => {
        const elem = document.activeElement as HTMLElement
        elem && elem.blur();
    }
    return <div className="dropdown dropdown-end">
        <label tabIndex={0} htmlFor="" className="btn-ghost btn-circle btn">
            <div className="indicator">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className="badge badge-sm indicator-item">{cart?.size || 0}</span>
            </div>
        </label>
        <div className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30" tabIndex={0}>
            <div className="card-body">
                <span className="text-lg font-bold ">{cart?.size || 0} items</span>
                <span className="text-info">
                    Subtotal:{formatPrice(cart?.subtotal || 0)}
                </span>
                <div className="card-actions">
                    <Link href={"/cart"} className="btn btn-primary btn-block" onClick={closeDropdown}>View Cart</Link>
                </div>
            </div>
        </div>
    </div>
}

export default ShoppingCartButton