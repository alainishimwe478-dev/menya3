import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '../localization/strings';

const SettingsScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadLanguage();
    loadHistory();
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

  const loadHistory = async () => {
    try {
      const historyData = await AsyncStorage.getItem('resultsHistory');
      if (historyData) {
        setHistory(JSON.parse(historyData));
      }
    } catch (error) {
      console.error('Error loading history:', error);
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

  const handleLanguageChange = () => {
    const languages = ['en', 'rw', 'fr'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    saveLanguage(nextLang);
  };

  const clearHistory = () => {
    Alert.alert(
      strings[language].clearHistory,
      'Are you sure you want to clear all scan history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('resultsHistory');
              setHistory([]);
              Alert.alert(strings[language].historyCleared);
            } catch (error) {
              console.error('Error clearing history:', error);
            }
          },
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyCrop}>{strings[language].crops[item.crop]}</Text>
      <Text style={styles.historyProblem}>{item.problem}</Text>
      <Text style={styles.historyDate}>{new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{strings[language].settings}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings[language].language}</Text>
        <TouchableOpacity style={styles.languageButton} onPress={handleLanguageChange}>
          <Text style={styles.languageButtonText}>
            {language === 'en' ? 'English' : language === 'rw' ? 'Kinyarwanda' : 'Français'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>{strings[language].history}</Text>
          {history.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
              <Text style={styles.clearButtonText}>{strings[language].clearHistory}</Text>
            </TouchableOpacity>
          )}
        </View>
        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.noHistory}>{strings[language].noHistory}</Text>
        )}
      </View>
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
    marginBottom: 30,
    color: '#2e7d32',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  languageButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 8,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  clearButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  historyCrop: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  historyProblem: {
    fontSize: 14,
    color: '#d32f2f',
    marginTop: 5,
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  noHistory: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SettingsScreen;
