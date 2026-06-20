import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';

export default function ProfileScreen() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Mi Perfil</Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Nombre</Text>
        <View style={[styles.input, { backgroundColor: colors.input }]}>
          <Text style={{ color: colors.text }}>Usuario Demo</Text>
        </View>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
        <View style={[styles.input, { backgroundColor: colors.input }]}>
          <Text style={{ color: colors.text }}>demo@naturapp.com</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferencias</Text>

        <View style={styles.row}>
          <Text style={[styles.rowLabel, { color: colors.text }]}>Tema Oscuro</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <View style={styles.row}>
          <Text style={[styles.rowLabel, { color: colors.text }]}>Notificaciones</Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>
      </View>

      <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={() => Alert.alert('Éxito', 'Perfil actualizado')}>
        <Text style={styles.saveText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 16, elevation: 1 },
  label: { fontSize: 13, marginBottom: 4, marginTop: 8 },
  input: { borderRadius: 8, padding: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rowLabel: { fontSize: 15 },
  saveBtn: { borderRadius: 10, padding: 16, alignItems: 'center' },
  saveText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
