import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '../localization/strings';

const CameraScreen = ({ navigation, route }) => {
  const { crop } = route.params;
  const [language, setLanguage] = useState('en');
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    loadLanguage();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
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

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImageUri(photo.uri);
      } catch (error) {
        Alert.alert(strings[language].error, 'Failed to take picture');
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(strings[language].error, 'Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const proceedWithImage = () => {
    if (imageUri) {
      navigation.navigate('Identification', { imageUri, crop });
    }
  };

  const retakePicture = () => {
    setImageUri(null);
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {!imageUri ? (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
              >
                <Text style={styles.text}>Flip</Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.captureText}>📸</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <Text style={styles.galleryText}>{strings[language].gallery}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
          <View style={styles.previewControls}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
              <Text style={styles.retakeText}>{strings[language].retake}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={proceedWithImage}>
              <Text style={styles.proceedText}>{strings[language].proceed}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureText: {
    fontSize: 30,
  },
  galleryButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
  },
  galleryText: {
    color: 'white',
    fontSize: 16,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#000',
  },
  retakeButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
  },
  retakeText: {
    color: 'white',
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
  },
  proceedText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CameraScreen;
