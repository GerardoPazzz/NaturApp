import React, { createContext, useContext, useState, useCallback } from 'react';
import ApiService from '../services/apiService';
import { Order } from '../models/Order';

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.getOrders();
      setOrders(data.map(o => Order.fromJSON(o)));
    } catch (err) {
      setError('No se pudo cargar el historial');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, loading, error, refresh }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders must be used within OrdersProvider');
  return context;
}
