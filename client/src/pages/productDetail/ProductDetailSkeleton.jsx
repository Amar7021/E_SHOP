import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ProductDetailSkeleton = () => {
    return (
        <main className="min-h-screen bg-background mt-12 mb-16 mx-5 px-6 max-[480px]:px-0">
            <Skeleton className="mb-8 h-5 w-20" />
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="self-start">
                    <Card className="overflow-hidden rounded-3xl">
                        <Skeleton className="h-[350px] w-full md:h-[450px] lg:h-[550px]" />
                    </Card>
                    <div className="mt-4 flex gap-3 overflow-hidden">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-20 w-20 shrink-0 rounded-xl"
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <Skeleton className="h-6 w-24 rounded-full" />

                    <div className="mt-4 space-y-3">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-4/5" />
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                        <Skeleton className="h-5 w-32" />
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                        <Skeleton className="h-12 w-32" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                    </div>
                    <div className="mt-6 flex gap-3">
                        <Skeleton className="h-7 w-32 rounded-full" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                    </div>
                    <div className="mt-8 space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="h-4 w-9/12" />
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Card key={index}>
                                <CardContent className="flex flex-col items-center gap-3 p-4">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Skeleton className="mt-8 h-12 w-full rounded-xl" />
                </div>
            </div>
            <section className="mt-16">
                <div className="grid grid-cols-3 gap-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Card className="mt-6">
                    <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="space-y-2"
                                >
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-5 w-40" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}

export default ProductDetailSkeleton