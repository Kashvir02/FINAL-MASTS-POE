import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useMenu } from './MenuContext';
import { MenuItem, COURSES } from './MenuItem';

const { width } = Dimensions.get('window');

const FALLBACK_IMG = require('./assets/cafe_logo.jpg');

const HomeScreen = ({ navigation }: any) => {
  const { menuItems } = useMenu();

  const totalItems = menuItems.length;

  const calculateAveragePrice = (course: string) => {
    const list = menuItems.filter((item) => item.course === course);
    if (list.length === 0) return 0;
    let total = 0;
    list.forEach((item) => {
      total = total + item.price;
    });
    return total / list.length;
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const hasImage = item.imageUrl && item.imageUrl.trim() !== '';
    return (
      <View style={styles.menuItem}>
        {hasImage ? (
          <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />
        ) : (
          <Image source={FALLBACK_IMG} style={styles.menuImage} />
        )}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.dishName}>
            {item.dishName} - R{item.price.toFixed(2)}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.course}>Course: {item.course.toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 180 }}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>Chef Dashboard</Text>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Dishes:</Text>
              <Text style={styles.statValue}>{totalItems}</Text>
            </View>

            <Text style={styles.subHeader}>Average Price by Course (R)</Text>
            <View style={styles.statsContainer}>
              {COURSES.map((course) => (
                <View key={course} style={styles.avgCard}>
                  <Text style={styles.avgCourse}>{course.toUpperCase()}</Text>
                  <Text style={styles.avgPrice}>
                    R{calculateAveragePrice(course).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={[styles.subHeader, { marginBottom: 0 }]}>Full Menu</Text>
          </View>
        }
      />

      <View style={styles.buttonGroup}>
        <Button
          title="Manage Menu Items"
          onPress={() => navigation.navigate('ManageMenu')}
          color="#A97449"
        />
        <View style={{ height: 8 }} />
        <Button
          title="View/Filter Menu"
          onPress={() => navigation.navigate('FilterMenu')}
          color="#6D4C41"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3E2723' },
  header: { fontSize: 24, fontWeight: '700', padding: 15, color: '#F5E6CA' },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 8,
    color: '#F5E6CA',
  },
  statBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    backgroundColor: '#A97449',
    borderRadius: 8,
    marginBottom: 10,
  },
  statLabel: { color: '#3E2723', fontSize: 16 },
  statValue: { color: '#3E2723', fontSize: 28, fontWeight: 'bold' },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  avgCard: {
    width: width / 2 - 25,
    backgroundColor: '#6D4C41',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  avgCourse: { fontSize: 12, color: '#F5E6CA', fontWeight: '600' },
  avgPrice: { fontSize: 18, fontWeight: '700', color: '#A97449', marginTop: 4 },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#6D4C41',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  menuImage: {
    width: 55,
    height: 55,
    borderRadius: 6,
    backgroundColor: '#3E2723',
  },
  dishName: { fontSize: 16, fontWeight: '700', color: '#F5E6CA' },
  description: { fontSize: 13, color: '#F5E6CA', marginTop: 4 },
  course: { fontSize: 12, color: '#F5E6CA', marginTop: 6 },
  buttonGroup: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 24,
  },
});

export default HomeScreen;