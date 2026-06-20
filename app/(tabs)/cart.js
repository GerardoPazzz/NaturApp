import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useCart } from '../../src/context/CartContext';
import { useTheme } from '../../src/context/ThemeContext';
import CartItemRow from '../../src/components/CartItemRow';

export default function CartScreen() {
  const { colors } = useTheme();
  const { items, total, updateQuantity, removeItem, checkout } = useCart();
  const [address, setAddress] = useState('');

  const handleCheckout = async () => {
    try {
      const order = await checkout(address);
      Alert.alert('Pedido Creado', `Pedido #${order.id} registrado.`);
      setAddress('');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Mi Carrito ({items.length} items)</Text>

      <FlatList
        data={items}
        keyExtractor={item => item.productId.toString()}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            colors={colors}
            onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
            onRemove={() => removeItem(item.productId)}
          />
        )}
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.textSecondary }]}>Tu carrito está vacío</Text>}
      />

      {items.length > 0 && (
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.addressInput, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
            placeholder='Dirección de entrega'
            placeholderTextColor={colors.textSecondary}
            value={address}
            onChangeText={setAddress}
          />
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>S/ {total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={[styles.checkoutBtn, { backgroundColor: colors.primary }]} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Realizar Pedido</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 16 },
  footer: { borderTopWidth: 1, paddingTop: 16 },
  addressInput: { borderRadius: 8, padding: 12, borderWidth: 1, marginBottom: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 18, fontWeight: '600' },
  totalValue: { fontSize: 20, fontWeight: 'bold' },
  checkoutBtn: { borderRadius: 10, padding: 16, alignItems: 'center' },
  checkoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
