import FeaturedBouquets from "../components/sections/FeaturedBouquets"
import Hero from "../components/sections/Hero"
import WhyChooseUs from "../components/sections/WhyChooseUs"

export default function HomePage() {
    return (
        <div className="space-y-16">
            <Hero />
            <FeaturedBouquets />
            <WhyChooseUs />
        </div>
    )
}