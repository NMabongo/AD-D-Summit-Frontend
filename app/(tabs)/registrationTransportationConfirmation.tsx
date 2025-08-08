import ContactSupport from '@/components/contactSupport';
import ErrorModal from '@/components/ErrorModal';
import MapModal from '@/components/MapModal';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const transportationOptions = [
  { label: 'Hook me up with a lift from our Waterfall office', value: 'office' },
  { label: "I'll be driving there", value: 'own' },
];
  const profileBackground = require('@/assets/images/confirmTransportation.jpg')

export default function RegistrationTransportationConfirmation() {
  const [selected, setSelected] = useState('office');
  const [showMap, setShowMap] = useState(false);
  const { email } = useLocalSearchParams();
  const [arrivalTimeOffice, setArrivalTimeOffice] = useState(new Date());
  const [arrivalTimeVenue, setArrivalTimeVenue] = useState(new Date());

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalTitle, setErrorModalTitle] = useState('');
  const [errorModalMessage, setErrorModalMessage] = useState('');

  const nextScreen = () => {
    router.push({
        pathname: '/(tabs)/registrationDietTellUsAboutYou',
        params: { email: email, registered: 'true'}
      });
  };
  const handleUpdateTravel = async () => {

    try {
    
      const response = await fetch('https://deloittesummitbe.azurewebsites.net/api/User/ConfirmTravel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //Authorization: ``
        },
        body: JSON.stringify({
          travel: selected,
          email: email,
          arrivalTimeOffice: arrivalTimeOffice.toISOString(),
          arrivalTimeVenue: arrivalTimeVenue.toISOString(),
        }),
      });

      let data;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json();
        if (data.statusCode === 200) {
          nextScreen();
        }else{
          console.error('Error updating travel:', data.message);
          setErrorModalTitle('Error');            
          setErrorModalMessage(`Failed to update travel preference. Please try again later`);     
          setErrorModalVisible(true);
        }
      } else {
        data = null;
        console.error('Error updating travel: data is null', data);
        setErrorModalTitle('Error');            
        setErrorModalMessage(`Failed to update travel preference. Please try again later`);     
        setErrorModalVisible(true);
      }

    } catch (error) {
      console.error('Request failed:', error);
      setErrorModalTitle('Error');            
      setErrorModalMessage(`Failed to update travel preference. Please try again later`);     
      setErrorModalVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
        <ImageBackground
          source={profileBackground}
          style={styles.background}
          resizeMode="cover"
        >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Confirm your transportation</Text>
            <Text style={styles.title}>Let us know your preference</Text>
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => setShowMap(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.radioLabel}>View Map Location</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 18 }}>
              {transportationOptions.map((option) => (
                <View key={option.value}>
                  <TouchableOpacity
                    style={styles.radioRow}
                    onPress={() => setSelected(option.value)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.radioOuter}>
                      {selected === option.value && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.radioLabel}>{option.label}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdateTravel}>
              <Icon name="car-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <ContactSupport />
          </View>

        </View>
      </KeyboardAvoidingView>
      </ImageBackground>
      <ErrorModal
        visible={errorModalVisible}
        title={errorModalTitle}
        message={errorModalMessage}
        onClose={() => {
          setErrorModalVisible(false);
        }}
        onLoginPress={() => {
          setErrorModalVisible(false);
        }}
      />
      <MapModal
        visible={showMap}
        onClose={() => setShowMap(false)}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 18,
    padding: 24,
    marginHorizontal: 24,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B6E23A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#222',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#B6E23A',
  },
  radioLabel: {
    color: '#fff',
    fontSize: 15,
  },
  label: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#222',
    width: '100%',
    minHeight: 80,
    marginBottom: 18,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#8DD22A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  contactText: {
    color: '#8DD22A',
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginHorizontal: 24,
  },
  navButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', 
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  mapButton: {
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: 20,
    alignItems: 'center',
    borderColor: '#ffffff',
    borderWidth: 1,
  },
});