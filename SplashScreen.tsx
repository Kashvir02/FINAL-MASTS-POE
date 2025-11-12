import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

 

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('./assets/cafe_bg.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Image
            source={require('./assets/cafe_logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Christoffel's Menu</Text>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('Home')}
          >
            <Text style={styles.buttonText}>Open My Menu</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>Powered by Kashvir Dhanampal</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 60,
  },
  centerContent: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#a97449',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
    marginTop: 10,
    opacity: 0.9,
  },
});

export default SplashScreen;