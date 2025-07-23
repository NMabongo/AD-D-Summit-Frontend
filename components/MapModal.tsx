import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type MapModalProps = {
  visible: boolean;
  onClose: () => void;
};

const mapsImage = require('@/assets/images/mapsHeader.jpg');

export default function MapModal({ visible, onClose }: MapModalProps) {
  const [loading, setLoading] = useState(true);

  // Delay for loader effect
  useEffect(() => {
    if (visible) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 4000); 
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (Platform.OS !== 'web') {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <Text>Maps not supported on this platform.</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <ImageBackground source={mapsImage} style={styles.headerImage}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitleText}>Venue Location</Text>
          </View>
        </ImageBackground>

        <View style={styles.mapContainer}>
          {loading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="#7EC60B"  />
            </View>
          )}
          <iframe
            src="https://maps.google.com/maps?q=Kievits%20Kroon%20Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            onLoad={() => setLoading(false)} // in case it fires
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  topBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    paddingRight: 135,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 10,
  },
});
