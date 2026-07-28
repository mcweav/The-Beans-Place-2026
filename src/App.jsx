// ============================================================
// APP.JSX ? The Root Component (Day 2)
// ============================================================
// This is the MAIN file of your React application.
// It acts as the "layout manager" ? it imports all section
// components and arranges them on the page.
//
// WHAT YOU WILL LEARN:
// - How to import components from other files
// - How to use export default to share a component
// - How to compose a page from smaller components
// - How JSX lets you use custom components like HTML tags
//
// ============================================================

// STEP 1: Import your section components
// Each component lives in its own file inside ./components/
// Use this syntax:  import ComponentName from "./components/ComponentName";
//
// Import the following components (in this order):
// - RibbonTicker
// - NavBar
// - HeroSection
// - CtaSection
// - FeaturesSection
// - ProductShowcase
// - FooterSection
// - AboutSection
// - ContactSection

/* --- YOUR IMPORTS GO HERE --- */

// STEP 2: Create and export the App component
// Use: export default function App() { ... }
//
// STEP 3: Inside the return(), build the page layout
// Wrap everything in a <div className="app">
//
// Place your components in this order:
//   1. <NavBar />
//   2. Hero section wrapped in: <section className="hero bg-hero">
//        Inside that, wrap <HeroSection /> in: <div className="hero-grid">
//   3. <RibbonTicker />
//   4. Features section wrapped in: <section className="features bg-features" id="shop">
//   5. Product Showcase wrapped in: <section className="bg-cta">
//   6. <RibbonTicker /> (used again ? components are reusable!)
//   7. CTA section wrapped in: <section className="bg-cta">
//   8. About section wrapped in: <section className="bg-cta" id="about">
//   9. Contact section wrapped in: <section className="bg-cta" id="contact">
//  10. Footer section wrapped in: <section className="bg-footer">
//
// HINT: The id attributes (like id="shop") are anchor targets
// for the navigation links in the NavBar.

/* --- YOUR COMPONENT CODE GOES HERE --- */
// imports go below here
import { useState } from "react";

import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import RibbonTicker from "./components/RibbonTicker";
import FeaturesSection from "./components/FeaturesSection";
import ProductShowcase from "./components/ProductShowcase";
import CtaSection from "./components/CtaSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import CartDrawer from "./components/CartDrawer";

export default function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState("");

    const handleAddToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });

        setCheckoutMessage("");
        setIsCartOpen(true);
    };

    const updateQuantity = (productId, change) => {
        setCartItems((prevItems) =>
            prevItems.flatMap((item) => {
                if (item.id !== productId) {
                    return [item];
                }

                const updatedQty = item.quantity + change;
                return updatedQty > 0 ? [{ ...item, quantity: updatedQty }] : [];
            })
        );
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const handleCheckout = () => {
        if (!cartItems.length) {
            return;
        }

        setCheckoutMessage("Order placed successfully. Your fresh roast is on its way!");
        setCartItems([]);
        setIsCartOpen(true);
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="app" id="home">
            <NavBar cartCount={itemCount} onCartClick={() => setIsCartOpen(true)} />

            <section className="hero bg-hero">
                <div className="hero-grid">
                    <HeroSection />
                </div>
            </section>

            <RibbonTicker />

            <section className="features bg-features" id="shop">
                <FeaturesSection />
            </section>

            <section className="bg-cta">
                <ProductShowcase onAddToCart={handleAddToCart} />
            </section>
            <RibbonTicker />

            <section className="bg-cta">
                <CtaSection />
            </section>

            <section className="bg-cta" id="about">
                <AboutSection />
            </section>

            <section className="bg-cta" id="contact">
                <ContactSection />
            </section>

            <section className="bg-footer">
                <FooterSection />
            </section>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                total={totalAmount}
                onCheckout={handleCheckout}
                checkoutMessage={checkoutMessage}
            />
        </div>
    );
}
