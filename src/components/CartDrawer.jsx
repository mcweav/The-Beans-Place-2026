import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Button from "./ui/Button";
import Separator from "./ui/Separator";

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);

export default function CartDrawer({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    total,
    onCheckout,
    checkoutMessage
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 z-[1100] bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.aside
                        className="fixed right-0 top-0 z-[1200] flex h-full w-full max-w-md flex-col bg-[#fffaf5] shadow-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 220, damping: 24 }}>
                        <div className="flex items-center justify-between border-b border-[var(--brown-700)]/10 px-6 py-5">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--amber-dark)]">
                                    Your Cart
                                </p>
                                <h2 className="text-xl font-semibold text-[var(--brown-900)]">
                                    {cartItems.length ? `${cartItems.length} item(s)` : "Ready to order"}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-full border border-[var(--brown-700)]/10 p-2 text-[var(--brown-700)] transition hover:bg-[var(--cream)]">
                                <X size={18} />
                            </button>
                        </div>

                        {checkoutMessage && (
                            <div className="mx-6 mt-4 rounded-2xl border border-[var(--amber)]/20 bg-[var(--amber)]/10 p-3 text-sm font-semibold text-[var(--brown-900)]">
                                {checkoutMessage}
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {cartItems.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center rounded-[28px] border border-dashed border-[var(--brown-700)]/20 bg-[var(--cream-light)]/70 px-6 text-center">
                                    <div className="mb-4 rounded-full bg-[var(--cream)] p-3 text-[var(--brown-800)]">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[var(--brown-900)]">
                                        Your cart is feeling empty
                                    </h3>
                                    <p className="mt-2 text-sm text-[var(--brown-700)]">
                                        Add a few bags of your favorite roast and we will bring them to
                                        checkout.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-[24px] border border-[var(--brown-700)]/10 bg-white/80 p-4 shadow-sm">
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-16 w-16 rounded-2xl object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <h3 className="font-semibold text-[var(--brown-900)]">
                                                                {item.name}
                                                            </h3>
                                                            <p className="text-sm text-[var(--brown-600)]">
                                                                {item.origin}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => onRemoveItem(item.id)}
                                                            className="text-sm font-medium text-[var(--brown-600)] transition hover:text-[var(--brown-900)]">
                                                            Remove
                                                        </button>
                                                    </div>

                                                    <div className="mt-3 flex items-center justify-between">
                                                        <div className="flex items-center rounded-full border border-[var(--brown-700)]/15 bg-[var(--cream-light)] p-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => onUpdateQuantity(item.id, -1)}
                                                                className="rounded-full p-1.5 text-[var(--brown-700)] transition hover:bg-white">
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="min-w-8 text-center text-sm font-semibold text-[var(--brown-900)]">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => onUpdateQuantity(item.id, 1)}
                                                                className="rounded-full p-1.5 text-[var(--brown-700)] transition hover:bg-white">
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        <span className="font-semibold text-[var(--brown-900)]">
                                                            {formatCurrency(item.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="border-t border-[var(--brown-700)]/10 bg-[var(--cream-light)]/90 px-6 py-5">
                            <div className="mb-2 flex items-center justify-between text-sm text-[var(--brown-700)]">
                                <span>Subtotal</span>
                                <span className="font-semibold text-[var(--brown-900)]">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                            <div className="mb-3 flex items-center justify-between text-sm text-[var(--brown-700)]">
                                <span>Shipping</span>
                                <span className="font-semibold text-[var(--brown-900)]">Free</span>
                            </div>
                            <Separator className="my-3" />
                            <div className="mb-4 flex items-center justify-between text-base font-semibold text-[var(--brown-900)]">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                            <Button
                                variant="accent"
                                size="md"
                                className="w-full"
                                onClick={onCheckout}
                                disabled={!cartItems.length}>
                                Checkout
                            </Button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
