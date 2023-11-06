import FormSubmitButton from '@/components/csr/FormSubmitButton';
import prisma from '@/lib/db/prisma';
import type { Metadata } from 'next'
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Add Product - Star Store',
  description: 'We make your wallet cry',
}

const addProduct = async (formData: FormData) => {
  "use server";
  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);
  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required field")

  }
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  redirect("/");



}

const page = () => {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold ">Add Product</h1>
      <form action={addProduct}>
        <input className="mb-3 input input-bordered w-full " type="text" required name="name" placeholder="Type product name here...." />
        <textarea name="description" className="textarea textarea-bordered w-full mb-3" placeholder="Type product description here...."></textarea>
        <input className="mb-3 input input-bordered w-full " type="url" required name="imageUrl" placeholder="Type or paste image url here...." />
        <input className="mb-3 input input-bordered w-full " type="number" name="price" placeholder="Type product price here...." required />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  )
}

export default page