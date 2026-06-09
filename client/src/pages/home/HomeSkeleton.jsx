import { Skeleton } from "@/components/ui/skeleton"

const HomeSkeleton = () => {
    return (
        <>
            <section className="mx-auto max-w-7xl py-6">
                <Skeleton className="h-[450px] w-full rounded-xl" />
            </section>
            <section className="mx-auto max-w-7xl py-16">
                <div className="mb-12">
                    <Skeleton className="mb-3 h-6 w-24" />
                    <Skeleton className="h-10 w-72" />
                    <Skeleton className="mt-2 h-5 w-60" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-72 w-full rounded-xl"
                        />
                    ))}
                </div>
            </section>
            <section className="bg-muted/30 pb-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12">
                        <Skeleton className="mb-3 h-6 w-24" />
                        <Skeleton className="h-10 w-80" />
                        <Skeleton className="mt-2 h-5 w-72" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="space-y-3 rounded-xl border p-4"
                            >
                                <Skeleton className="h-52 w-full rounded-lg" />
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-7xl pb-16">
                <Skeleton className="h-[300px] w-full rounded-3xl" />
            </section>
        </>
    )
}

export default HomeSkeleton