import { Gem, Heart, Smartphone, Sparkles } from "lucide-react"

export const trimText = (text, length = 100) => {
    return text.length > length ? text.slice(0, length - 3) + "..." : text
}

export const categories = [
    {
        title: "Beauty",
        icon: Heart,
        image:
            "https://images.pexels.com/photos/3373725/pexels-photo-3373725.jpeg",
        slug: "beauty",
    },
    {
        title: "Fragrances",
        icon: Sparkles,
        image:
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
        slug: "fragrances",
    },
    {
        title: "Smartphones",
        icon: Smartphone,
        image:
            "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
        slug: "smartphones",
    },
    {
        title: "Jewellery",
        icon: Gem,
        image:
            "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg",
        slug: "womens-jewellery",
    },
]

export const slides = [
    {
        title: "Discover Premium Products",
        subtitle:
            "Explore thousands of products with exclusive discounts.",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
        title: "Summer Collection 2026",
        subtitle:
            "New arrivals with up to 50% OFF.",
        image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    },
    {
        title: "Luxury Fragrances",
        subtitle:
            "Premium perfumes from world-class brands.",
        image:
            "https://images.unsplash.com/photo-1541643600914-78b084683601",
    },
]