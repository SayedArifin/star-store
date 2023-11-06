"use client"

import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantitiy: (productId: string) => Promise<void>;
}
const AddToCartButton = ({ productId, incrementProductQuantitiy }: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-primary" onClick={() => {
        setSuccess(false);
        startTransition(async () => {
          await incrementProductQuantitiy(productId);
          setSuccess(true);

        })
      }}>Add to Cart</button>
      {isPending && <span className="loading loading-bars loading-md" />}
      {!isPending && success && <span className="text-success"> Added To Cart</span>}
    </div>
  )
}

export default AddToCartButton;