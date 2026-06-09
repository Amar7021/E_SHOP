import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = ({ showButton = false }) => {
    return (
        <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="relative">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="absolute left-3 top-3 h-6 w-14 rounded-full" />
                <Skeleton className="absolute right-3 top-3 h-9 w-9 rounded-full" />
            </div>
            <div className="space-y-3 p-4">
                <Skeleton className="h-3 w-20" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-3">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-5 w-14" />
                </div>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-7 w-24 rounded-full" />
                {showButton && (
                    <Skeleton className="h-12 w-full rounded-xl" />
                )}
            </div>
        </div>
    )
}

export default ProductCardSkeleton