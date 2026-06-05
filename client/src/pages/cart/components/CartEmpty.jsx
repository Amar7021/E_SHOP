import { Button } from "@/components/ui/button"
import { Link } from "react-router"

const CartEmpty = () => {
    return (
        <div className="text-center py-20 space-y-4">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">
                Start adding items you love
            </p>

            <Button asChild>
                <Link to="/category/all" className="text-white">Start Shopping</Link>
            </Button>
        </div>
    )
}

export default CartEmpty