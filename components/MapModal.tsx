import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type MapModalProps = {
  visible: boolean;
  onClose: () => void;
};

const mapsImage = require('@/assets/images/mapsHeader.jpg');

export default function MapModal({ visible, onClose }: MapModalProps) {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);

  const venueLocation = {
    latitude: -25.6582, 
    longitude: 28.2843,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    if (visible) {
      setLoading(true);

      if (Platform.OS !== 'web') {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setHasPermission(false);
            Alert.alert('Location permission denied', 'Map may not function correctly.');
          } else {
            setHasPermission(true);
          }
        })();
      }

      const timeout = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide">
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
              <ActivityIndicator size="large" color="#7EC60B" />
            </View>
          )}

          {Platform.OS === 'web' ? (
            <iframe
              src="https://maps.google.com/maps?q=Kievits%20Kroon%20Gauteng&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              onLoad={() => setLoading(false)}
            />
          ) : hasPermission ? (
            <MapView
              style={StyleSheet.absoluteFill}
              region={venueLocation}
              onMapReady={() => setLoading(false)}
              showsUserLocation={true}
            >
              <Marker coordinate={venueLocation} title="Kievits Kroon" />
            </MapView>
          ) : (
            <View style={styles.permissionDenied}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Location permission is required to show the map.</Text>
            </View>
          )}
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
    paddingTop: 30,
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
  permissionDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 20,
  },
});
