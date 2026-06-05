import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const CartItem = ({ item, onAdd, onRemove, onDecrease }) => {
    return (
        <Card className="p-4 flex flex-col md:flex-row gap-4">
            <Link to={`/product-detail/${item.id}`}>
                <div className="w-28 h-28">
                    <LazyLoadImage
                        src={item.thumbnail}
                        className="rounded-md object-cover w-28 h-28"
                    />
                </div>
            </Link>
            <div className="flex-1 space-y-2">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <div className="font-semibold">${item.price}</div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDecrease(item)}
                        >
                            -
                        </Button>
                        <span className="w-6 text-center">{item.cartQuantity}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAdd(item)}
                        >
                            +
                        </Button>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                        Total: ${(item.price * item.cartQuantity).toFixed(2)}
                    </span>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm"><Trash2 size={16} /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    All items in your cart will be removed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onRemove(item)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </Card>
    )
}

export default CartItem