import ErrorModal from '@/components/ErrorModal';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


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
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Other', value: 'Other' },
];

const jacketSizeOptions = [
  { label: 'Small', value: 'Small' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Large', value: 'Large' },
  { label: 'X-Large', value: 'X-Large' },
  { label: 'XX-Large', value: 'XX-Large' },
];

  
export default function RegistrationAttendanceConfirmation() {
  const [selected, setSelected] = useState('');
  const [jacketSizeSelected, setJacketSizeSelected] = useState<{ label: string; value: string } | null>(null);
  const [funFact, setFunFact] = useState('');
  const { email } = useLocalSearchParams();

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalTitle, setErrorModalTitle] = useState('');
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [dietarySelected, setDietarySelected] = useState('None');
  const [otherDietary, setOtherDietary] = useState('');
  const [roommate, setRoommate] = useState('');
  const [requireAccommodation, setRequireAccommodation] = useState(false);
  const [selectJacketSize, setSelectJacketSize] = useState(false);

  const nextScreen = () => {
  router.push({
    pathname: '/home', 
    params: { 
      email: email,
    }} );
}

  const clearErrors = () => {
    setErrorModalVisible(false);
    setErrorModalTitle('');
    setErrorModalMessage('');
  };

  const validateParameters = () => {
    if (!jacketSizeSelected) {
      setErrorModalTitle('Error');
      setErrorModalMessage('Please select a jacket size.');
      setErrorModalVisible(true);
      return false;
    }
    return true;
  };

const handleUpdateAttendance = async () => {

    if (!validateParameters()) {
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
          requireAccommodation: requireAccommodation,
          jacketSize: jacketSizeSelected  ? jacketSizeSelected.value : null,
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
            <Text style={styles.title}>Tell us about you</Text>
            <Text style={styles.subtitle}>Summit dates:  8 - 10 Sep '25</Text>

            <View style={{ marginTop: 16, width: '100%' }}>
              
              <Text style={[styles.radioLabel, {marginBottom: 8}]}> What is your food Preference</Text>
              {dietaryOptions.map(option => (
                <View  key={option.value}>
                  <TouchableOpacity
                    key={option.value}
                    style={styles.radioRow}
                    onPress={() => (
                      setDietarySelected(option.value)
                    )}
                    activeOpacity={0.7}
                  >
                    <View style={styles.radioOuter}>
                      {dietarySelected === option.value && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.radioLabel}>{option.label}</Text>
                  </TouchableOpacity>
                  {option.value === 'Other' && dietarySelected === 'Other' && (
                    <View >
                      <TextInput
                        style={[styles.inputRoomShare]}
                        placeholder="please enter your food preference"
                        placeholderTextColor="#bdbdbd"
                        value={otherDietary}
                            onChangeText={setOtherDietary}
                            textAlignVertical="top"
                          />
                      </View>
                  )}
                </View>
              ))}
              <View style={{ marginTop: 8}}>
                <Text style={styles.radioLabel}>Do you require accommodation?</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginLeft: 36 }}>
                    <TouchableOpacity
                      style={[styles.radioRow, { marginRight: 16 }]}
                      onPress={() => setRequireAccommodation(true)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.radioOuter}>
                        {requireAccommodation && <View style={styles.radioInner} />}
                      </View>
                      <Text style={styles.radioLabel}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.radioRow}
                      onPress={() => setRequireAccommodation(false)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.radioOuter}>
                        {!requireAccommodation && <View style={styles.radioInner} />}
                      </View>
                      <Text style={styles.radioLabel}>No</Text>
                    </TouchableOpacity>
                  </View>
                {requireAccommodation && (
                  <View> 
                    <Text style={[styles.radioLabel, { marginBottom: 8, marginLeft: 36 }]}>Please provide the name of a colleague you wish to share a room with. Leave blank if you don't have anyone in mind.</Text>
                    <TextInput
                      style={styles.inputRoomShare}
                      placeholder="Room share colleague's name"
                      placeholderTextColor="#bdbdbd"
                      value={roommate}
                      onChangeText={setRoommate}
                      textAlignVertical="top"
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={[styles.radioLabel, {marginBottom: 8}]}>please select your jacket size?</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setSelectJacketSize(true)}
              >
                <Text style={jacketSizeSelected ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {jacketSizeSelected ? jacketSizeSelected.label : 'Select your jacket size'}
                </Text>
                <Icon name="chevron-down-outline" size={22} color="#bdbdbd" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 18 }}>
              <Text style={[styles.radioLabel, { marginRight: 12, marginBottom: 0 }]}>Tell us about you</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Fun Fact, hidden talent, or anything else you'd like us to know"
              placeholderTextColor="#bdbdbd"
              value={funFact}
              onChangeText={setFunFact}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdateAttendance}>
              <Icon name="person-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <Text style={[styles.footerText, { marginTop: 20 }]}>
                Having problems?{' '}
              </Text>
              <Text style={styles.footerText} >
                {'  Email:  '} 
                <Text style={styles.contactText} onPress={() =>
                    Linking.openURL('mailto:nhngcobo@deloitte.co.za?subject=AD-D-Summit Registration Issue')}>
                  nhngcobo@deloitte.co.za
                </Text>
              </Text>
              <Text style={styles.footerText}>{'  OR:  '}</Text>
              <Text style={styles.contactText} onPress={() => {
                clearErrors();
                router.push('/(tabs)/contactUs')
              }}>
                Contact us
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={selectJacketSize}
        onRequestClose={() => setSelectJacketSize(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => {}}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={jacketSizeOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.jacketSizeOption}
                  onPress={() => {
                    setJacketSizeSelected(item);
                    setSelectJacketSize(false)
                  }}
                >
                  <Text style={styles.dropdownText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    minHeight: 40,
    marginBottom: 18,
    marginLeft: 36,
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
    width: '100%',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 12,
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
  dropdownTrigger: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  textInputLong: {
    width: '100%',
  },
  dropdownText: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: '#bdbdbd',
    flex: 1,
  },
  jacketSizeOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  jacketSizeOptionText: {
    fontSize: 16,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: '50%',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
