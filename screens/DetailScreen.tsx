import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const screenWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

// Mock disease guidance based on plant
const getDiseaseGuidance = (plantKey: string) => {
  const guidances: Record<string, any> = {
    maize: {
      commonDiseases: ['Fall Armyworm', 'Maize Streak Virus'],
      symptoms: 'Holes in leaves, yellowing, stunted growth.',
      treatments: 'Use organic pesticides, crop rotation.',
    },
    cassava: {
      commonDiseases: ['Cassava Mosaic Disease', 'Cassava Brown Streak Disease'],
      symptoms: 'Mosaic patterns on leaves, brown streaks.',
      treatments: 'Use resistant varieties, remove infected plants.',
    },
    sweetPotato: {
      commonDiseases: ['Sweet Potato Virus Disease', 'Fusarium Wilt'],
      symptoms: 'Yellowing leaves, wilting.',
      treatments: 'Crop rotation, fungicides.',
    },
    vegetables: {
      commonDiseases: ['Aphid Infestation', 'Powdery Mildew'],
      symptoms: 'Sticky residue, white powdery coating.',
      treatments: 'Neem oil, beneficial insects.',
    },
  };
  return guidances[plantKey] || { commonDiseases: [], symptoms: 'N/A', treatments: 'Consult expert.' };
};

export default function DetailScreen({ route, navigation }: Props) {
  const { plant } = route.params;
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);

  const guidance = getDiseaseGuidance(Object.keys(plant).find(key => plant[key as keyof typeof plant] === plant.name)?.toLowerCase() || '');

  // Request permissions
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
        Alert.alert(
          'Permissions Required',
          'Camera and gallery permissions are required to upload or take photos.'
        );
      }
    })();
  }, []);

  // Pick from gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Could not open gallery. Try again.');
    }
  };

  // Take photo
  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Could not open camera. Try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{plant.name}</Text>
      <Text style={styles.infoText}>{plant.info}</Text>

      <TouchableOpacity
        style={styles.guidanceButton}
        onPress={() => setShowGuidance(!showGuidance)}
      >
        <Text style={styles.guidanceButtonText}>
          {showGuidance ? 'Hide Disease Guidance' : 'Show Disease Guidance'}
        </Text>
      </TouchableOpacity>

      {showGuidance && (
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceTitle}>Disease Guidance</Text>
          <Text style={styles.guidanceText}>
            <Text style={styles.bold}>Common Diseases:</Text> {guidance.commonDiseases.join(', ')}
          </Text>
          <Text style={styles.guidanceText}>
            <Text style={styles.bold}>Symptoms:</Text> {guidance.symptoms}
          </Text>
          <Text style={styles.guidanceText}>
            <Text style={styles.bold}>Treatments:</Text> {guidance.treatments}
          </Text>
        </View>
      )}

      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadCard} onPress={pickImage}>
          <Text style={styles.plantIcon}>{plant.icon}</Text>
          <MaterialIcons name="photo-library" size={30} color="#4caf50" />
          <Text style={styles.uploadText}>Upload from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadCard} onPress={takePhoto}>
          <Text style={styles.plantIcon}>{plant.icon}</Text>
          <MaterialIcons name="camera-alt" size={30} color="#4caf50" />
          <Text style={styles.uploadText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: screenWidth - 40, height: screenWidth - 40, marginTop: 20, borderRadius: 8 }}
        />
      )}

      {image && <Text style={styles.subtitle}>Image uploaded successfully!</Text>}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#388e3c' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>⬅ Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  uploadCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  plantIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
});
