// cspell:ignore USSD ussd
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import { strings } from '../localization/strings';

const ResultsScreen = ({ navigation, route }) => {
  const { result, imageUri, crop } = route.params;
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadLanguage();
    saveResult();
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

  const saveResult = async () => {
    try {
      const history = await AsyncStorage.getItem('resultsHistory');
      const historyArray = history ? JSON.parse(history) : [];
      const newResult = {
        id: Date.now(),
        crop,
        problem: result.problem,
        solution: result.solution,
        date: new Date().toISOString(),
        imageUri,
      };
      historyArray.unshift(newResult);
      // Keep only last 50 results
      if (historyArray.length > 50) {
        historyArray.splice(50);
      }
      await AsyncStorage.setItem('resultsHistory', JSON.stringify(historyArray));
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  const shareViaWhatsApp = async () => {
    const message = `${strings[language].shareMessage}\n\n${strings[language].crop}: ${strings[language].crops[crop]}\n${strings[language].problem}: ${result.problem}\n${strings[language].solution}: ${result.solution}`;
    try {
      await Sharing.shareAsync(null, {
        dialogTitle: strings[language].shareTitle,
        mimeType: 'text/plain',
        UTI: 'public.plain-text',
      });
      // Note: For actual WhatsApp sharing, you might need to use Linking.openURL with whatsapp:// URL
      Alert.alert(strings[language].shared, strings[language].sharedMessage);
    } catch (error) {
      Alert.alert(strings[language].error, strings[language].shareError);
    }
  };

  const showUSSDCode = () => {
    Alert.alert(
      strings[language].ussdTitle,
      `${strings[language].ussdMessage}\n\n*123*1#`,
      [{ text: strings[language].ok }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{strings[language].results}</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      
      <View style={styles.resultContainer}>
        <Text style={styles.cropText}>
          {strings[language].crop}: {strings[language].crops[crop]}
        </Text>
        <Text style={styles.problemText}>
          {strings[language].problem}: {result.problem}
        </Text>
        <Text style={styles.solutionText}>
          {strings[language].solution}: {result.solution}
        </Text>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={shareViaWhatsApp}>
        <Text style={styles.shareButtonText}>{strings[language].shareWhatsApp}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ussdButton} onPress={showUSSDCode}>
        <Text style={styles.ussdButtonText}>{strings[language].ussdCode}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.newScanButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.newScanButtonText}>{strings[language].newScan}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2e7d32',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  cropText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  problemText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#d32f2f',
  },
  solutionText: {
    fontSize: 16,
    color: '#1976d2',
  },
  shareButton: {
    backgroundColor: '#25d366',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  ussdButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  ussdButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  newScanButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
  },
  newScanButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ResultsScreen;
