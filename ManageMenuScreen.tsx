import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from './MenuContext';
import { MenuItem, COURSES } from './MenuItem';

const FALLBACK_IMG = require('./assets/cafe_logo.jpg');

const ManageMenuScreen = () => {
  const { menuItems, addMenuItem, removeMenuItem } = useMenu();

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<MenuItem['course']>(COURSES[0]);
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAdd = () => {
    const priceNum = parseFloat(price);

    if (!dishName.trim() || !description.trim()) {
      Alert.alert('Error', 'Please enter a dish name and description.');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price.');
      return;
    }

    addMenuItem({
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: priceNum,
      imageUrl: imageUrl.trim(), 
    });

    setDishName('');
    setDescription('');
    setPrice('');
    setCourse(COURSES[0]);
    setImageUrl('');
  };

  const renderItem = ({ item }: { item: MenuItem }) => {
    const hasImage = item.imageUrl && item.imageUrl.trim() !== '';
    return (
      <View style={styles.menuItemRow}>
        {hasImage ? (
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        ) : (
          <Image source={FALLBACK_IMG} style={styles.itemImage} />
        )}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.itemTitle}>
            {item.dishName} (R{item.price.toFixed(2)})
          </Text>
          <Text style={styles.itemSubtitle}>{item.description}</Text>
          <Text style={styles.itemSubtitleSmall}>
            Course: {item.course.toUpperCase()}
          </Text>
        </View>
        <Button title="X" onPress={() => removeMenuItem(item.id)} color="#e74c3c" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Menu Item</Text>

      <TextInput
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        style={styles.input}
        placeholderTextColor="#F5E6CA"
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholderTextColor="#F5E6CA"
      />

      <Text style={styles.label}>Select Course:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={course}
          onValueChange={(val) => setCourse(val as MenuItem['course'])}
          style={{ color: '#F5E6CA' }}
        >
          {COURSES.map((c) => (
            <Picker.Item key={c} label={c.toUpperCase()} value={c} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Price (e.g. 89.99)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#F5E6CA"
      />

      <TextInput
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
        placeholderTextColor="#F5E6CA"
        autoCapitalize="none"
      />

      <Button title="Add Item" onPress={handleAdd} color="#A97449" />

      <Text style={[styles.header, { marginTop: 16 }]}>Current Menu</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3E2723', padding: 16 },
  header: { fontSize: 20, fontWeight: '700', color: '#F5E6CA', marginBottom: 12 },
  label: { color: '#F5E6CA', marginBottom: 4 },
  input: {
    backgroundColor: '#6D4C41',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    color: '#F5E6CA',
  },
  pickerContainer: {
    backgroundColor: '#6D4C41',
    borderRadius: 6,
    marginBottom: 10,
  },
  menuItemRow: {
    flexDirection: 'row',
    backgroundColor: '#6D4C41',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: { width: 50, height: 50, borderRadius: 6, backgroundColor: '#3E2723' },
  itemTitle: { color: '#F5E6CA', fontSize: 16, fontWeight: '600' },
  itemSubtitle: { color: '#F5E6CA', fontSize: 12, marginTop: 2 },
  itemSubtitleSmall: { color: '#F5E6CA', fontSize: 11, marginTop: 2 },
});

export default ManageMenuScreen;