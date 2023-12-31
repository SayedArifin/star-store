import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/logo.png"
import { redirect } from "next/navigation"
import { getCart } from "@/lib/db/cart"
import ShoppingCartButton from "../csr/ShoppingCartButton"

const searchProducts = async (formData: FormData) => {
  "use server"
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/searchQuery=" + searchQuery);
  }
}

const Navbar = async () => {
  const cart = await getCart();
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1 ">
          <Link href={"/"} className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="logo" height={40} width={40} /> Star Store
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input type="text" name="searchQuery" placeholder="Search..." className="input input-bordered w-full min-w-[100px]" />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default Navbar;