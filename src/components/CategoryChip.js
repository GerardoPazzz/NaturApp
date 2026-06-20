import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const defaultColors = {
  card: '#FFFFFF',
  text: '#666666',
  primary: '#148F77',
};

export default function CategoryChip({ label, active, onPress, colors = defaultColors }) {
  return (
    <TouchableOpacity
      style={[styles.chip, { backgroundColor: active ? colors.primary : colors.card, borderColor: active ? colors.primary : colors.border }]}
      onPress={onPress}
    >
      <Text style={[styles.label, { color: active ? '#FFF' : colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderWidth: 1 },
  label: { fontSize: 14, textTransform: 'capitalize' },
});
