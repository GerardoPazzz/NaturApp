import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const defaultColors = {
  card: '#FFFFFF',
  text: '#333333',
  textSecondary: '#888888',
  primary: '#148F77',
};

export default function ProductCard({ product, onAddToCart, colors = defaultColors }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Link href={`/product/${product.id}`}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </Link>
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>{product.name}</Text>
      <Text style={[styles.category, { color: colors.textSecondary }]}>{product.category}</Text>
      <View style={styles.row}>
        <Text style={[styles.price, { color: colors.primary }]}>{product.getFormattedPrice()}</Text>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={onAddToCart}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: 12, margin: 6, padding: 10, elevation: 2, maxWidth: '48%' },
  image: { width: '100%', height: 120, borderRadius: 8 },
  name: { fontSize: 14, fontWeight: '600', marginTop: 8 },
  category: { fontSize: 11, textTransform: 'capitalize', marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 16, fontWeight: 'bold' },
  addBtn: { borderRadius: 16, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  addText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});
