// cspell:words USSD ussd

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '../localization/strings';

const HomeScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const saveLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguage(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const crops = [
    { key: 'maize', label: strings[language].crops.maize },
    { key: 'cassava', label: strings[language].crops.cassava },
    { key: 'greenVegetables', label: strings[language].crops.greenVegetables },
    { key: 'sweetPotatoes', label: strings[language].crops.sweetPotatoes },
  ];

  const handleCropSelect = (crop) => {
    navigation.navigate('Camera', { crop });
  };

  const handleLanguageChange = () => {
    const languages = ['en', 'rw', 'fr'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    saveLanguage(nextLang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings[language].appName}</Text>
      <Text style={styles.subtitle}>{strings[language].welcome}</Text>

      <TouchableOpacity style={styles.languageButton} onPress={handleLanguageChange}>
        <Text style={styles.languageButtonText}>
          {strings[language].language}: {language === 'en' ? 'English' : language === 'rw' ? 'Kinyarwanda' : 'Français'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.instruction}>{strings[language].selectCrop}</Text>

      {crops.map((crop) => (
        <TouchableOpacity
          key={crop.key}
          style={styles.cropButton}
          onPress={() => handleCropSelect(crop.key)}
        >
          <Text style={styles.cropButtonText}>{crop.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsButtonText}>{strings[language].settings}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  languageButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  cropButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cropButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  settingsButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
