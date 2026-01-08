import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';

type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const plantImages: Record<string, string> = {
  maize:
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
  cassava:
    'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=600&q=80',
  sweetPotato:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  vegetables:
    'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=80',
};

const plantIcons: Record<string, any> = {
  maize: 'grass',
  cassava: 'nature',
  sweetPotato: 'spa',
  vegetables: 'local-florist',
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
      }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('title')}</Text>
          <Text style={styles.subtitle}>{t('subtitle')}</Text>
        </View>

        {/* Language Switch */}
        <View style={styles.languageButtons}>
          {['en', 'fr', 'rw'].map((lng) => (
            <TouchableOpacity
              key={lng}
              style={[
                styles.langButton,
                i18n.language === lng && styles.langActive,
              ]}
              onPress={() => changeLanguage(lng)}
            >
              <Text style={styles.langText}>
                {lng === 'en' ? '🇺🇸 EN' : lng === 'fr' ? '🇫🇷 FR' : '🇷🇼 RW'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Community')}
          >
            <Text style={styles.navButtonText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.navButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Plant Cards */}
        <View style={styles.grid}>
          {Object.keys(plantImages).map((key) => {
            const plant = {
              name: t(`plants.${key}.name`),
              info: t(`plants.${key}.info`),
              image: plantImages[key],
              icon: plantIcons[key],
            };

            return (
              <TouchableOpacity
                key={key}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('Detail', { plant })
                }
              >
                <ImageBackground
                  source={{ uri: plant.image }}
                  style={styles.cardImage}
                  imageStyle={{ borderRadius: 20 }}
                >
                  <View style={styles.cardOverlay}>
                    <MaterialIcons
                      name={plant.icon}
                      size={36}
                      color="#1b5e20"
                    />
                    <Text style={styles.cardText}>{plant.name}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },

  container: {
    padding: 20,
  },

  header: {
    marginBottom: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1b5e20',
  },

  subtitle: {
    fontSize: 14,
    color: '#444',
    marginTop: 6,
    textAlign: 'center',
  },

  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },

  langButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },

  langActive: {
    backgroundColor: '#4CAF50',
  },

  langText: {
    fontWeight: '600',
    color: '#000',
  },

  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  navButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  navButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#fff',
  },

  cardImage: {
    height: 140,
    justifyContent: 'flex-end',
  },

  cardOverlay: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 12,
    alignItems: 'center',
  },

  cardText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
    textAlign: 'center',
  },
});
