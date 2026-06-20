import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useOrders } from '../../src/context/OrdersContext';
import { useTheme } from '../../src/context/ThemeContext';

export default function OrdersScreen() {
  const { colors } = useTheme();
  const { orders, loading, error, refresh } = useOrders();

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Mis Pedidos</Text>
      {loading ? (
        <ActivityIndicator size='large' color={colors.primary} />
      ) : error ? (
        <Text style={[styles.error, { color: '#E74C3C' }]}>{error}</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.orderCard, { backgroundColor: colors.card }]}>
              <View style={styles.orderHeader}>
                <Text style={[styles.orderId, { color: colors.text }]}>#{item.id}</Text>
                <Text style={[styles.status, { color: item.getStatusColor() }]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.date, { color: colors.textSecondary }]}>{item.getFormattedDate()}</Text>
              <Text style={[styles.total, { color: colors.primary }]}>Total: S/ {item.total.toFixed(2)}</Text>
              <Text style={[styles.address, { color: colors.textSecondary }]}>{item.address}</Text>
              <Text style={[styles.items, { color: colors.textSecondary }]}>{item.items.length} producto(s)</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={[styles.empty, { color: colors.textSecondary }]}>Sin pedidos aún</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  error: { textAlign: 'center', marginTop: 40 },
  empty: { textAlign: 'center', marginTop: 60 },
  orderCard: { borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  orderId: { fontSize: 16, fontWeight: 'bold' },
  status: { fontSize: 12, fontWeight: '600' },
  date: { fontSize: 13, marginBottom: 6 },
  total: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 13, marginBottom: 4 },
  items: { fontSize: 13 },
});
