import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import DatabaseService from '../services/databaseService';
import ApiService from '../services/apiService';
import { CartItem } from '../models/CartItem';

const CartContext = createContext(null);

export function CartProvider({ children, onCheckoutComplete }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    const rows = await DatabaseService.getCartItems();
    setItems(rows.map(r => CartItem.fromRow(r)));
    const t = await DatabaseService.getCartTotal();
    setTotal(t);
    const c = await DatabaseService.getCartCount();
    setCount(c);
  }, []);

  useEffect(() => {
    DatabaseService.init().then(refresh);
  }, [refresh]);

  const addItem = useCallback(async (product) => {
    if (!product.isAvailable()) {
      throw new Error('Producto sin stock');
    }
    await DatabaseService.addToCart(product);
    await refresh();
  }, [refresh]);

  const updateQuantity = useCallback(async (productId, qty) => {
    if (qty < 0) return;
    await DatabaseService.updateCartQuantity(productId, qty);
    await refresh();
  }, [refresh]);

  const removeItem = useCallback(async (productId) => {
    await DatabaseService.removeFromCart(productId);
    await refresh();
  }, [refresh]);

  const checkout = useCallback(async (address) => {
    if (items.length === 0) throw new Error('El carrito está vacío');
    if (!address.trim()) throw new Error('Ingrese una dirección');
    const order = await ApiService.createOrder({
      items: items.map(i => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      address,
    });
    await DatabaseService.clearCart();
    await refresh();
    if (onCheckoutComplete) onCheckoutComplete();
    return order;
  }, [items, total, refresh, onCheckoutComplete]);

  return (
    <CartContext.Provider value={{ items, total, count, addItem, updateQuantity, removeItem, checkout, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
