import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import logo from "../assets/Beans_logo.png";
import Button from "./ui/Button";

export default function NavBar({ cartCount = 0, onCartClick }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
                <a href="#home" className="brand">
                    <img src={logo} alt="Beans Place Logo" className="logo h-12 w-auto md:h-14" />
                </a>

                <nav className="nav-links hidden items-center gap-10 md:flex">
                    <a href="#home">Home</a>
                    <a href="#shop">Shop Coffee</a>
                    <a href="#about">Our Story</a>
                    <a href="#contact">Contact</a>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onCartClick}
                        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brown-700)]/10 bg-[var(--cream-light)] text-[var(--brown-800)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--cream)]">
                        <ShoppingBag size={18} />
                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--amber-dark)] px-1 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <Button variant="accent" size="sm" className="hidden md:inline-flex">
                        Order Now
                    </Button>
                </div>

                <button
                    type="button"
                    aria-label={menuOpen ? "Close Menu" : "Open Menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden">
                    <span
                        className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                    />
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="overflow-hidden md:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <nav className="flex flex-col gap-4 px-6 pb-6 pt-2">
                            <a href="#home" onClick={closeMenu} className="text-base font-semibold">
                                Home
                            </a>
                            <a href="#shop" onClick={closeMenu} className="text-base font-semibold">
                                Shop Coffee
                            </a>
                            <a href="#about" onClick={closeMenu} className="text-base font-semibold">
                                Our Story
                            </a>
                            <a href="#contact" onClick={closeMenu} className="text-base font-semibold">
                                Contact
                            </a>

                            <button
                                type="button"
                                onClick={() => {
                                    onCartClick?.();
                                    closeMenu();
                                }}
                                className="flex items-center justify-center gap-2 rounded-full border border-[var(--brown-700)]/10 bg-[var(--cream-light)] px-4 py-3 text-sm font-semibold text-[var(--brown-900)]">
                                <ShoppingBag size={16} />
                                View Cart
                            </button>

                            <Button
                                variant="accent"
                                size="sm"
                                className="mt-2 w-full"
                                onClick={closeMenu}>
                                Order Now
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
