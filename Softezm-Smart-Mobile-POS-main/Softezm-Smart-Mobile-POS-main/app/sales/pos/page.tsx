'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Search,
  CreditCard,
  Banknote,
  Clock,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import { useStore, Product } from '@/lib/store';
import { toast } from 'sonner';
import { useStoreHydration } from '@/hooks/use-store-hydration';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function POSPage() {
  const { products, recordSale, adminSettings } = useStore();
  const isHydrated = useStoreHydration();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'pending'>('cash');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [lastSale, setLastSale] = useState<any>(null);
  const [taxAmount, setTaxAmount] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<string>('');
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [pendingDetails, setPendingDetails] = useState({
    customerName: '',
    pendingAmount: '',
    dueDate: '',
  });

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    if (product.quantity <= 0) {
      toast.error('Out of stock!');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.quantity) {
          toast.error(`Only ${product.quantity} units available`);
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (quantity > product.quantity) {
      toast.error(`Only ${product.quantity} units available`);
      return;
    }

    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = parseFloat(taxAmount) || 0;
  const discount = parseFloat(discountAmount) || 0;
  const total = Math.max(0, subtotal + tax - discount);

  const handleCheckout = () => {
    if (paymentMethod === 'pending' && !showPendingModal) {
      setPendingDetails({
        customerName: '',
        pendingAmount: total.toString(),
        dueDate: new Date().toISOString().split('T')[0],
      });
      setShowPendingModal(true);
      return;
    }

    const saleData = {
      items: cart,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      ...(paymentMethod === 'pending' ? {
        customerName: pendingDetails.customerName,
        pendingAmount: parseFloat(pendingDetails.pendingAmount) || 0,
        dueDate: pendingDetails.dueDate,
      } : {}),
    };

    recordSale(saleData);
    setLastSale({ ...saleData, id: `SALE-${Date.now()}`, timestamp: Date.now() });
    setCart([]);
    setTaxAmount('');
    setDiscountAmount('');
    setShowPaymentModal(false);
    setShowPendingModal(false);
    toast.success('Sale completed successfully!');
  };

  const printReceipt = () => {
    window.print();
  };

  if (!isHydrated) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Point of Sale</h1>
        {lastSale && (
          <Button variant="outline" onClick={() => setLastSale(null)} className="gap-2">
            New Transaction
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-card border-border/50 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`overflow-hidden border-border/50 hover:shadow-xl transition-all ${product.quantity === 0 ? 'opacity-60' : ''}`}>
                  <div className="h-24 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border-b border-border/30">
                    <span className="text-primary/60 font-bold text-lg">{product.brand}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-foreground leading-tight">{product.name}</h3>
                      <span className="text-primary font-bold">{adminSettings.currency}{product.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      Stock: <span className={product.quantity < 5 ? 'text-red-500 font-bold' : ''}>{product.quantity} units</span>
                    </p>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.quantity === 0}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-10"
                    >
                      <Plus size={16} />
                      {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="space-y-6">
          <Card className="bg-card border-border/50 shadow-lg sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                Order Summary
                {cart.length > 0 && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {cart.length} items
                  </span>
                )}
              </h2>

              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="text-muted-foreground" size={24} />
                      </div>
                      <p className="text-muted-foreground">Your cart is empty</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{adminSettings.currency}{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-muted text-foreground transition-colors"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-xs font-bold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-muted text-foreground transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {cart.length > 0 && (
                <div className="space-y-4 border-t border-border pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground items-center">
                      <span>Subtotal</span>
                      <span className="font-semibold text-foreground">{adminSettings.currency}{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="tax-input" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                          Tax ({adminSettings.currency})
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{adminSettings.currency}</span>
                          <Input
                            id="tax-input"
                            type="text"
                            placeholder="0.00"
                            value={taxAmount}
                            onChange={(e) => setTaxAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                            className="h-10 pl-6 text-sm bg-muted/30 border-border/50 focus:border-primary/50 transition-all rounded-lg font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="discount-input" className="text-[10px] font-bold uppercase tracking-wider text-red-500/70 ml-1">
                          Discount ({adminSettings.currency})
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400 text-xs">{adminSettings.currency}</span>
                          <Input
                            id="discount-input"
                            type="text"
                            placeholder="0.00"
                            value={discountAmount}
                            onChange={(e) => setDiscountAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                            className="h-10 pl-6 text-sm bg-red-50/30 dark:bg-red-950/10 border-red-100/50 dark:border-red-900/50 focus:border-red-500/50 transition-all rounded-lg font-medium text-red-600 dark:text-red-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-2xl font-black text-foreground pt-4 border-t border-border">
                      <span>Total</span>
                      <span className="text-primary tracking-tighter">{adminSettings.currency}{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: 'cash', label: 'Cash', icon: Banknote },
                        { value: 'card', label: 'Card', icon: CreditCard },
                        { value: 'pending', label: 'Pending', icon: Clock },
                      ] as const
                    ).map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setPaymentMethod(value)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                          paymentMethod === value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
                  >
                    Complete Order
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <AnimatePresence>
        {/* Pending Payment Details Modal */}
        {showPendingModal && (
          <div key="pending-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md"
            >
              <Card className="bg-card p-8 border-border shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-orange-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Pending Details</h3>
                  <p className="text-muted-foreground mt-1">Enter customer info for credit sale</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Customer Name</label>
                    <Input
                      placeholder="Enter customer name"
                      value={pendingDetails.customerName}
                      onChange={(e) => setPendingDetails({ ...pendingDetails, customerName: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Amount Pending ({adminSettings.currency})</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{adminSettings.currency}</span>
                      <Input
                        type="text"
                        placeholder="0.00"
                        value={pendingDetails.pendingAmount}
                        onChange={(e) => setPendingDetails({ ...pendingDetails, pendingAmount: e.target.value.replace(/[^0-9.]/g, '') })}
                        className="h-12 pl-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Due Date</label>
                    <Input
                      type="date"
                      value={pendingDetails.dueDate}
                      onChange={(e) => setPendingDetails({ ...pendingDetails, dueDate: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowPendingModal(false)}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    disabled={!pendingDetails.customerName || !pendingDetails.pendingAmount || !pendingDetails.dueDate}
                    className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl"
                  >
                    Confirm Pending
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {showPaymentModal && (
          <div key="payment-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md"
            >
              <Card className="bg-card p-8 border-border shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Confirm Transaction</h3>
                  <p className="text-muted-foreground mt-1">Review the order before finalizing</p>
                </div>

                <div className="bg-muted/30 rounded-2xl p-6 mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-bold capitalize">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items Count</span>
                    <span className="font-bold">{cart.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-bold">{adminSettings.currency}{tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-red-500 font-medium">Discount</span>
                      <span className="font-bold text-red-500">-{adminSettings.currency}{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-border/50">
                    <span className="text-foreground font-bold">Total Amount</span>
                    <span className="text-3xl font-black text-primary">{adminSettings.currency}{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowPaymentModal(false)}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl"
                  >
                    Confirm & Pay
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Receipt Modal */}
        {lastSale && (
          <div key="receipt-modal" className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 print:p-0 print:bg-white overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="w-full max-w-md print:max-w-none my-auto"
            >
              <Card className="bg-card overflow-hidden shadow-2xl print:shadow-none border-none rounded-2xl print:rounded-none">
                <div className="p-0">
                  {/* Receipt Header */}
                  <div className="bg-primary/5 dark:bg-primary/10 p-8 text-center border-b border-dashed border-border/50 print:bg-white print:border-black">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20 print:hidden">
                      <Printer size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-foreground tracking-tight uppercase mb-1 print:text-black">MOBILE SHOP POS</h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Premium Mobile Terminal</p>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4 text-[10px] uppercase font-bold tracking-wider">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Receipt Number</p>
                        <p className="text-foreground font-mono text-xs">{lastSale.id}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-muted-foreground">Date & Time</p>
                        <p className="text-foreground text-xs">{new Date(lastSale.timestamp).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Items Table */}
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] uppercase font-black text-muted-foreground border-b border-border pb-2 print:border-black">
                        <span className="w-8">Qty</span>
                        <span className="flex-1 px-4">Description</span>
                        <span className="w-20 text-right">Amount</span>
                      </div>
                      <div className="space-y-3">
                        {lastSale.items.map((item: any) => (
                          <div key={item.id} className="flex justify-between items-start text-sm">
                            <span className="w-8 font-mono text-muted-foreground">{item.quantity}</span>
                            <div className="flex-1 px-4">
                              <p className="font-bold text-foreground leading-tight">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground">{adminSettings.currency}{item.price} per unit</p>
                            </div>
                            <span className="w-20 text-right font-bold text-foreground">
                              {adminSettings.currency}{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Totals Section */}
                    <div className="bg-muted/30 dark:bg-muted/10 p-6 rounded-2xl space-y-3 print:bg-white print:border print:border-black print:rounded-none">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Subtotal</span>
                        <span className="font-bold text-foreground">{adminSettings.currency}{lastSale.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Tax</span>
                        <span className="font-bold text-foreground">{adminSettings.currency}{lastSale.tax.toFixed(2)}</span>
                      </div>
                      {lastSale.discount > 0 && (
                        <div className="flex justify-between text-sm text-red-500">
                          <span className="font-black uppercase text-[10px] tracking-tighter">Discount Applied</span>
                          <span className="font-black">-{adminSettings.currency}{lastSale.discount.toFixed(2)}</span>
                        </div>
                      )}
                      {lastSale.paymentMethod === 'pending' && (
                        <div className="space-y-2 pt-2 border-t border-border/50">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground font-bold">CUSTOMER:</span>
                            <span className="font-bold uppercase">{lastSale.customerName}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground font-bold">DUE DATE:</span>
                            <span className="font-bold text-orange-600">{lastSale.dueDate}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground font-bold">PENDING AMOUNT:</span>
                            <span className="font-bold text-orange-600">{adminSettings.currency}{lastSale.pendingAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                      <div className="pt-4 border-t-2 border-dashed border-border/50 print:border-black mt-2 flex justify-between items-center">
                        <span className="text-lg font-black uppercase tracking-tighter">Grand Total</span>
                        <span className="text-3xl font-black text-primary print:text-black">
                          {adminSettings.currency}{lastSale.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="pt-2 text-right">
                        <span className="text-[10px] uppercase font-black text-primary/60 bg-primary/5 px-2 py-1 rounded-md print:bg-white print:text-black print:border print:border-black">
                          Paid via {lastSale.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center space-y-4 pt-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-foreground uppercase tracking-widest">Software by Softezm Pvt.Ltd</p>
                        <div className="text-[9px] text-muted-foreground font-bold space-y-0.5">
                          <p>Contact: 03060250202</p>
                          <p>Mail: info@softezm.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 py-4">
                        <div className="h-px w-8 bg-border print:bg-black" />
                        <span className="text-[10px] text-muted-foreground font-black italic uppercase tracking-[0.2em]">
                          Visit Again
                        </span>
                        <div className="h-px w-8 bg-border print:bg-black" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 p-8 bg-muted/20 border-t border-border print:hidden">
                    <Button onClick={() => setLastSale(null)} variant="outline" className="flex-1 h-12 rounded-xl font-bold">
                      Close
                    </Button>
                    <Button onClick={printReceipt} className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl gap-2 font-bold shadow-lg shadow-primary/20">
                      <Printer size={18} />
                      Print Receipt
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

