import ErrorModal from '@/components/ErrorModal';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


const attendanceOptions = [
  { label: "Wouldn't miss it!", value: 'yes' },
  { label: 'Catch you the next time!', value: 'no' },
  { label: 'Mulling It over', value: 'maybe' },
];
const profileBackground = require('@/assets/images/confirmAttendance.jpg')

const dietaryOptions = [
  { label: "None", value: 'None' },
  { label: 'Halaal', value: 'Halaal' },
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Other', value: 'Other' },
];

  
export default function RegistrationAttendanceConfirmation() {
  const [selected, setSelected] = useState('');
  const [funFact, setFunFact] = useState('');
  const { email } = useLocalSearchParams();

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorModalTitle, setErrorModalTitle] = useState('');
    const [errorModalMessage, setErrorModalMessage] = useState('');
    const [dietarySelected, setDietarySelected] = useState('None');
    const [otherDietary, setOtherDietary] = useState('');
    const [roommate, setRoommate] = useState('');
    const [requireAccommodation, setRequireAccommodation] = useState(false);

  const nextScreen = () => {
    if (selected === 'yes') {
      router.push({
        pathname: '/registrationTransportationConfirmation',
        params: {
          email: email,
        }
      });
    } else {
      router.push({
        pathname: '/home',
        params: {
          email: email,
        }
      });
    }
}

const handleUpdateAttendance = async () => {
  if (!selected) {
    setErrorModalTitle('Error');
    setErrorModalMessage('Please select an attendance option.');
    setErrorModalVisible(true);
    return;
  }

  try {
    const response = await fetch('https://deloittesummitbe.azurewebsites.net/api/User/ConfirmAttendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         // Authorization: ``
        },
        body:JSON.stringify({
          attending: selected,
          email: email,
          funFact: funFact,
          dietaryPreference: dietarySelected === 'Other' ? otherDietary : dietarySelected,
          roommate: roommate,
          requireAccommodation: requireAccommodation
        }),

      });

      let data;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json();
        console.log('Response data:', data);
        if (data.statusCode === 200) {
          nextScreen();
        }else{
          console.error('Confirm attandance Failed;', {response})
          setErrorModalTitle('Error');            
          setErrorModalMessage(`Could not confirm your attandance at this time. Please try again later`);     
          setErrorModalVisible(true);
        }
      } else {
        data = null;
          console.error('Confirm attandance Failed;', {response})
          setErrorModalTitle('Error');            
          setErrorModalMessage(`Could not confirm your attandance at this time. Please try again later`);     
          setErrorModalVisible(true);
      }

    } catch (error) {
      console.error('Confirm attandance Failed;', {error})
      setErrorModalTitle('Error');            
      setErrorModalMessage(`Could not confirm your attandance at this time. Please try again later`);     
      setErrorModalVisible(true);
    }
  };



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ImageBackground
          source={profileBackground}
          style={styles.background}
          resizeMode="cover"
        >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Confirm your attendance</Text>
            <Text style={styles.subtitle}>Summit dates:  8 - 10 Sep '25</Text>

            <View style={{ marginTop: 16, marginBottom: 18 }}>
              {attendanceOptions.map(option => (
                <View  key={option.value}>
                  <TouchableOpacity
                    key={option.value}
                    style={styles.radioRow}
                    onPress={() => (
                      setSelected(option.value))}
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
            <TouchableOpacity style={styles.button} onPress={handleUpdateAttendance}>
              <Ionicons name="person-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Having problems?{' '}
              <Text
                style={styles.contactText}
                onPress={() => router.push('/(tabs)/contactUs')}
              >
                Contact us
              </Text>
            </Text>
          </View>
        </ScrollView>
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
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 18,
    padding: 24,
    paddingTop: 10,
    margin: 24,
    marginTop: 75,
    marginBottom: 24,
    alignItems: 'flex-start',
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
  inputRoomShare: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#222',
    width: '100%',
    minHeight: 40,
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
    alignSelf: 'center',
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
});
