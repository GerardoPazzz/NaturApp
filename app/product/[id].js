import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import ApiService from '../../src/services/apiService';
import { Product } from '../../src/models/Product';
import { useCart } from '../../src/context/CartContext';
import { useTheme } from '../../src/context/ThemeContext';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    ApiService.getProductById(id)
      .then(data => setProduct(Product.fromJSON(data)))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addItem(product);
      alert(`${product.name} agregado al carrito`);
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <View style={[styles.center, { backgroundColor: colors.background }]}><ActivityIndicator size='large' color={colors.primary} /></View>;
  if (!product) return <View style={[styles.center, { backgroundColor: colors.background }]}><Text style={{ color: colors.text }}>Producto no encontrado</Text></View>;

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={[styles.content, { backgroundColor: colors.card }]}>
          <Text style={[styles.category, { color: colors.textSecondary }]}>{product.category}</Text>
          <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>
          <Text style={[styles.price, { color: colors.primary }]}>{product.getFormattedPrice()}</Text>
          <Text style={[styles.rating, { color: '#F39C12' }]}>★ {product.rating.toFixed(1)}</Text>
          <Text style={[styles.stock, { color: '#27AE60' }]}>{product.stock} unidades disponibles</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{product.description}</Text>
          <Text style={[styles.benefitsTitle, { color: colors.text }]}>Beneficios:</Text>
          {product.benefits.map((b, i) => (
            <Text key={i} style={[styles.benefit, { color: colors.textSecondary }]}>• {b}</Text>
          ))}
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={handleAddToCart}>
            <Text style={styles.addText}>Agregar al Carrito</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1 },
  image: { width: '100%', height: 300 },
  content: { padding: 16 },
  category: { fontSize: 13, textTransform: 'capitalize' },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 4 },
  price: { fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  rating: { fontSize: 16, marginTop: 4 },
  stock: { fontSize: 14, marginTop: 4 },
  description: { fontSize: 15, marginTop: 16, lineHeight: 22 },
  benefitsTitle: { fontSize: 16, fontWeight: '600', marginTop: 16 },
  benefit: { fontSize: 14, marginTop: 4 },
  addBtn: { borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 24, marginBottom: 32 },
  addText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
