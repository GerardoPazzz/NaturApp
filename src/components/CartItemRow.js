import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const defaultColors = {
  card: '#FFFFFF',
  text: '#333333',
  textSecondary: '#888888',
  primary: '#148F77',
};

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove, colors = defaultColors }) {
  return (
    <View style={[styles.row, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>{item.name}</Text>
        <Text style={[styles.price, { color: colors.textSecondary }]}>S/ {item.price.toFixed(2)}</Text>
        <View style={styles.quantity}>
          <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: colors.primary }]} onPress={onDecrease}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.qty, { color: colors.text }]}>{item.quantity}</Text>
          <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: colors.primary }]} onPress={onIncrease}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.remove}>X</Text>
        </TouchableOpacity>
        <Text style={[styles.subtotal, { color: colors.primary }]}>S/ {item.getSubtotal().toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 1 },
  image: { width: 70, height: 70, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: '600' },
  price: { fontSize: 13, marginTop: 2 },
  quantity: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  qtyBtn: { borderRadius: 6, width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  qtyText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  qty: { fontSize: 16, fontWeight: '600', marginHorizontal: 12 },
  right: { alignItems: 'flex-end', justifyContent: 'space-between' },
  remove: { color: '#E74C3C', fontSize: 16, fontWeight: 'bold' },
  subtotal: { fontSize: 15, fontWeight: 'bold' },
});
