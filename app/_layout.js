import { useCallback } from 'react';
import { Stack } from 'expo-router';
import { CartProvider } from '../src/context/CartContext';
import { ThemeProvider } from '../src/context/ThemeContext';
import { OrdersProvider, useOrders } from '../src/context/OrdersContext';

function OrdersRefreshHandler({ children }) {
  const { refresh } = useOrders();
  const handleCheckoutComplete = useCallback(() => {
    refresh();
  }, [refresh]);
  return (
    <CartProvider onCheckoutComplete={handleCheckoutComplete}>
      {children}
    </CartProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <OrdersProvider>
        <OrdersRefreshHandler>
          <Stack screenOptions={{
            headerStyle: { backgroundColor: '#1A5276' },
            headerTintColor: '#FFF',
          }}>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='product/[id]' options={{ title: 'Detalle' }} />
          </Stack>
        </OrdersRefreshHandler>
      </OrdersProvider>
    </ThemeProvider>
  );
}
