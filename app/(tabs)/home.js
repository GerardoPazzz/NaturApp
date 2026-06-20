import React from 'react';
import {
  View, Text, FlatList, TextInput,
  StyleSheet, ActivityIndicator,
  ScrollView, RefreshControl,
} from 'react-native';
import { useProducts } from '../../src/viewmodels/useProducts';
import { useCart } from '../../src/context/CartContext';
import { useTheme } from '../../src/context/ThemeContext';
import ProductCard from '../../src/components/ProductCard';
import CategoryChip from '../../src/components/CategoryChip';

const CATEGORIES = [
  'todos', 'superfoods', 'aceites',
  'capsulas', 'infusiones', 'miel',
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const {
    products, loading, error,
    category, setCategory,
    searchQuery, setSearchQuery,
    search, refresh,
  } = useProducts();
  const { addItem } = useCart();

  const handleAddToCart = async (product) => {
    try {
      await addItem(product);
      alert(`${product.name} agregado al carrito`);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.searchBar, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
        placeholder='Buscar productos naturales...'
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => search(searchQuery)}
      />

      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}>
        {CATEGORIES.map(cat => (
          <CategoryChip
            key={cat}
            label={cat}
            active={category === cat}
            onPress={() => setCategory(cat)}
            colors={colors}
          />
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size='large' color={colors.primary} />
      ) : error ? (
        <Text style={[styles.error, { color: '#E74C3C' }]}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onAddToCart={() => handleAddToCart(item)}
              colors={colors}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refresh}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  searchBar: { borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 10, borderWidth: 1 },
  categories: { marginBottom: 10, maxHeight: 44 },
  error: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});
