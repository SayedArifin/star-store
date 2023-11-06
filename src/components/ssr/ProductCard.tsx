import { product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import PriceTag from "./PriceTag"
interface ProductCardProps {
    product: product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;
    return (
        <div className="card glass">
            <figure><Image className="h-60 object-cover " height={400} width={800} src={product.imageUrl} alt={product.name} /></figure>
            <div className="p-5">
                <h2 className="card-title">{product.name}</h2>
                {isNew && <div className="badge badge-secondary">New!</div>}
                <p>{product.description.slice(0, 150)}...</p>
                <PriceTag price={product.price} />
                <div className="card-actions justify-end">
                    <Link href={"/products/" + product.id} className="btn btn-primary">See details</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard