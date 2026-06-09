import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { slides } from "@/utils"

export default function HeroCarousel() {
    const [api, setApi] = useState()
    const [current, setCurrent] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <Carousel
            setApi={setApi}
            opts={{
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 4000,
                }),
            ]}
            className="w-full"
        >
            <CarouselContent>
                {slides.map((slide, index) => (
                    <CarouselItem key={index}>
                        <div className="relative h-[450px] overflow-hidden rounded-3xl">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="relative z-10 flex h-full items-center px-8 md:px-20">
                                <div className="max-w-2xl text-white">
                                    <Badge className="mb-4">
                                        New Collection
                                    </Badge>
                                    <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                                        {slide.title}
                                    </h1>
                                    <p className="mb-8 text-lg text-zinc-200">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex gap-4">
                                        <Button size="lg"
                                            onClick={() => navigate("/category/all")}
                                        >
                                            Shop Now
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            onClick={() => navigate("/category/all")}
                                        >
                                            Explore
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
            {/* <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className="h-2 w-2 rounded-full bg-white/60"
                    />
                ))}
            </div> */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${current === index
                            ? "bg-primary w-8"
                            : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </Carousel>
    )
}