import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Separator from "./ui/Separator";

import imgEthiopianHarrar from "../assets/ethiopian-harrar-Bag.png";
import imgColombianSupremo from "../assets/colombian-supremo-Bag.png";
import imgKenyaAA from "../assets/kenya-aa-Bag.png";
import imgPanamaGeisha from "../assets/panama-geisha.png";
import imgKona from "../assets/kona-Bag.png";
import imgGuatemalaAntigua from "../assets/guatemala-antigua-Bag.png";

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);

const products = [
    {
        id: "ethiopian-harrar",
        name: "Ethiopian Harrar",
        origin: "Ethiopia",
        price: 18.99,
        roast: "Medium",
        notes: "Blueberry, dark chocolate, wine",
        image: imgEthiopianHarrar,
        badge: "Best Seller"
    },
    {
        id: "colombian-supremo",
        name: "Colombian Supremo",
        origin: "Colombia",
        price: 16.99,
        roast: "Medium-Dark",
        notes: "Caramel, nutty, smooth finish",
        image: imgColombianSupremo,
        badge: null
    },
    {
        id: "kenya-aa",
        name: "Kenya AA",
        origin: "Kenya",
        price: 21.99,
        roast: "Light",
        notes: "Bright citrus, black currant, floral",
        image: imgKenyaAA,
        badge: "Staff Pick"
    },
    {
        id: "panama-geisha",
        name: "Panama Geisha",
        origin: "Panama",
        price: 34.99,
        roast: "Light",
        notes: "Jasmine, bergamot, tropical fruit",
        image: imgPanamaGeisha,
        badge: "Limited"
    },
    {
        id: "kona",
        name: "Kona",
        origin: "Hawaii",
        price: 29.99,
        roast: "Medium",
        notes: "Brown Sugar, macadamia, mild acidity",
        image: imgKona,
        badge: null
    },
    {
        id: "guatemala-antigua",
        name: "Guatemala Antigua",
        origin: "Guatemala",
        price: 17.99,
        roast: "Dark",
        notes: "Cocoa, spice, smoky sweetness",
        image: imgGuatemalaAntigua,
        badge: "New"
    }
];

export default function ProductShowcase({ onAddToCart = () => {} }) {
    return (
        <div className="product-showcase">
            <ScrollReveal animation="fade-up">
                <Badge variant="accent" className="mb-4">
                    Curated Selection
                </Badge>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.1}>
                <h2 className="product-showcase-title">
                    Shop Our
                    <br />
                    <span className="muted">Finest Beans</span>
                </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.15}>
                <Separator className="mx-auto mb-4 max-w-48" />
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.15}>
                <p className="product-showcase-subtitle">
                    Hand-selected single-origin coffees, roasted to order. Each bag ships within 48
                    hours of roasting for maximum freshness.
                </p>
            </ScrollReveal>

            <StaggerContainer StaggerDelay={0.1} className="product-grid">
                {products.map((product) => (
                    <StaggerItem key={product.id} animation="fade-up">
                        <motion.div
                            className="product-card"
                            whileHover={{ y: -8, transition: { duration: 0.25 } }}>
                            <div className="product-card-image">
                                <img src={product.image} alt={product.name} loading="lazy" />
                                {product.badge && (
                                    <span className="product-badge">{product.badge}</span>
                                )}
                            </div>

                            <div className="product-card-info">
                                <div className="product-card-header">
                                    <h3>{product.name}</h3>
                                    <span className="product-price">{formatCurrency(product.price)}</span>
                                </div>
                                <p className="product-origin">
                                    {product.origin} • {product.roast} Roast
                                </p>
                                <p className="product-notes">{product.notes}</p>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="mt-3 w-full"
                                    onClick={() => onAddToCart(product)}>
                                    Add to Cart
                                </Button>
                            </div>
                        </motion.div>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <ScrollReveal animation="fade-up" delay={0.2}>
                <div className="product-showcase-cta">
                    <Button variant="accent" size="lg">
                        View All Coffee
                    </Button>
                </div>
            </ScrollReveal>
        </div>
    );
}
