import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function App() {
  const [selectedPlant, setSelectedPlant] = useState(null);

  const plantData = {
    maize: {
      name: 'Maize',
      info:
        'Maize grows well in fertile, well-drained soil. Plant at the beginning of the rainy season. Common problems include fall armyworm.',
    },
    cassava: {
      name: 'Cassava',
      info:
        'Cassava is drought-resistant. It grows well in sandy soil. Harvest after 8–12 months.',
    },
    sweetPotato: {
      name: 'Sweet Potato',
      info:
        'Sweet potato prefers warm climates and loose soil. Harvest after 3–5 months.',
    },
    vegetables: {
      name: 'Green Vegetables',
      info:
        'Green vegetables need regular watering and organic manure. Harvest frequently for better yield.',
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌱 Menya Leaf AI</Text>
      <Text style={styles.subtitle}>
        Select a plant to view farming information
      </Text>

      {Object.keys(plantData).map((key) => (
        <TouchableOpacity
          key={key}
          style={styles.button}
          onPress={() => setSelectedPlant(plantData[key])}
        >
          <Text style={styles.buttonText}>
            {plantData[key].name}
          </Text>
        </TouchableOpacity>
      ))}

      {selectedPlant && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            {selectedPlant.name}
          </Text>
          <Text style={styles.infoText}>
            {selectedPlant.info}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f9f0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
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
  infoBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2e7d32',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
});
