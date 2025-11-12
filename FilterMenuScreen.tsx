import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useMenu } from './MenuContext';
import { MenuItem, COURSES } from './MenuItem';

const FALLBACK_IMG = require('./assets/cafe_logo.jpg');

const FilterMenuScreen = () => {
  const { menuItems } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<'all' | string>('all');

  const filtered =
    selectedCourse === 'all'
      ? menuItems
      : menuItems.filter((item) => item.course === selectedCourse);

  const renderItem = ({ item }: { item: MenuItem }) => {
    const hasImage = item.imageUrl && item.imageUrl.trim() !== '';
    return (
      <View style={styles.menuItem}>
        {hasImage ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          <Image source={FALLBACK_IMG} style={styles.image} />
        )}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.dishName}>{item.dishName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Guest Menu</Text>

      <View style={styles.courseRow}>
        <TouchableOpacity
          style={[styles.courseBtn, selectedCourse === 'all' && styles.courseBtnActive]}
          onPress={() => setSelectedCourse('all')}
        >
          <Text style={styles.courseText}>ALL</Text>
        </TouchableOpacity>

        {COURSES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.courseBtn, selectedCourse === c && styles.courseBtnActive]}
            onPress={() => setSelectedCourse(c)}
          >
            <Text style={styles.courseText}>{c.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>
        Showing {selectedCourse === 'all' ? 'all items' : selectedCourse} ({filtered.length})
      </Text>

      <FlatList data={filtered} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3E2723', padding: 16 },
  header: { fontSize: 22, fontWeight: '700', color: '#F5E6CA', marginBottom: 12 },
  courseRow: { flexDirection: 'row', marginBottom: 12, flexWrap: 'wrap' },
  courseBtn: {
    backgroundColor: '#6D4C41',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  courseBtnActive: {
    backgroundColor: '#A97449',
  },
  courseText: { color: '#F5E6CA', fontWeight: '600', fontSize: 12 },
  subtitle: { color: '#F5E6CA', marginBottom: 10 },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#6D4C41',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { width: 50, height: 50, borderRadius: 6, backgroundColor: '#3E2723' },
  dishName: { color: '#F5E6CA', fontSize: 16, fontWeight: '600' },
  description: { color: '#F5E6CA', fontSize: 12, marginTop: 2 },
  price: { color: '#A97449', fontSize: 14, marginTop: 4, fontWeight: '600' },
});

export default FilterMenuScreen;