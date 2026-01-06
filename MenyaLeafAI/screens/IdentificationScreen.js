import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { identifyProblem } from '../utils/mockAI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '../localization/strings';

const IdentificationScreen = ({ navigation, route }) => {
  const { imageUri, crop } = route.params;
  const [language, setLanguage] = useState('en');
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadLanguage();
    simulateIdentification();
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

  const simulateIdentification = () => {
    // Simulate AI processing time
    setTimeout(() => {
      const identificationResult = identifyProblem(crop);
      setResult(identificationResult);
      // Auto-navigate to results after identification
      setTimeout(() => {
        navigation.replace('Results', { result: identificationResult, imageUri, crop });
      }, 2000);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings[language].identifying}</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <ActivityIndicator size="large" color="#4caf50" style={styles.loader} />
      <Text style={styles.processingText}>{strings[language].processing}</Text>
      {result && (
        <Text style={styles.resultText}>
          {strings[language].problemFound}: {result.problem}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  loader: {
    marginBottom: 20,
  },
  processingText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default IdentificationScreen;
