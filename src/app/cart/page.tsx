import CartEntry from '@/components/csr/CartEntry';
import { getCart } from '@/lib/db/cart'
import type { Metadata } from 'next'
import { setProductQuantity } from './actions';
import { formatPrice } from '@/lib/format';
export const metadata: Metadata = {
    title: 'Your Cart - Star Store',
}
const Page = async ({ }) => {
    const cart = await getCart();
    return <div>
        <h1 className="text-3xl font-bold mb-3">Your Cart!</h1>
        {cart?.CartItem.map((item) => (
            <CartEntry setProductQuantity={setProductQuantity} key={item.id} cartItem={item} />
        ))}
        {!cart?.CartItem.length && <p>Your Cart is Empty</p>}
        <div className="flex flex-col items-end sm:items-center">
            <p className="mb-3 font-bold">
                Total:{formatPrice(cart?.subtotal || 0)}
            </p>
            <button className='btn btn-accent sm:w-[200px]'>Checkout</button>
        </div>
    </div>
}

export default Page