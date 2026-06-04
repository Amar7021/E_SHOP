import { Link } from "react-router"
import {
  Mail,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              E-Cart
            </h2>
            <p className="text-sm text-muted-foreground">
              Discover quality products at the
              best prices. Shop confidently with
              secure payments and fast delivery.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">
              Shop
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-primary"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="hover:text-primary"
                >
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="hover:text-primary"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-primary"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-primary"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-primary"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe for exclusive offers and
              product updates.
            </p>
            <div className="space-y-3">
              <Input placeholder="Enter your email" />

              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} E-Cart.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
