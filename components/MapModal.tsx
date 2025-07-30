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
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');

  const venueLocation = {
    latitude: -25.6582,
    longitude: 28.2843,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const toggleMapType = () => {
    setMapType(prev => (prev === 'standard' ? 'satellite' : 'standard'));
  };

  useEffect(() => {
    if (visible) {
      setLoading(true);
      setUserLocation(null);

      if (Platform.OS !== 'web') {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setHasPermission(false);
            Alert.alert('Location permission denied', 'Map may not function correctly.');
          } else {
            setHasPermission(true);
            try {
              const location = await Location.getCurrentPositionAsync({});
              setUserLocation(location);
            } catch (e) {
              console.warn('Failed to get user location:', e);
            }
          }

          setTimeout(() => setLoading(false), 1000);
        })();
      } else {
        setTimeout(() => setLoading(false), 1000);
      }
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
            <>
            <MapView
                style={StyleSheet.absoluteFill}
                region={venueLocation}
                onMapReady={() => setLoading(false)}
                showsUserLocation={true}
                mapType={mapType}
            >
                <Marker coordinate={venueLocation} title="Kievits Kroon" />
                {userLocation && (
                <Marker
                    coordinate={{
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    }}
                    title="You are here"
                    pinColor="blue"
                />
                )}
            </MapView>
            <TouchableOpacity onPress={toggleMapType} style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>
                {mapType === 'standard' ? 'Satellite View' : 'Standard View'}
                </Text>
            </TouchableOpacity>
            </>
          ) : (
            <View style={styles.permissionDenied}>
            <Text style={{ color: '#fff', fontSize: 16 }}>
                Location permission is required to show the map.
            </Text>
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
  toggleButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 1000,
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});
