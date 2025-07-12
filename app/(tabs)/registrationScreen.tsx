import RegistrationScreenBackground from '@/assets/images/svg/registrationScreenBackground';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
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

export default function RegistrationScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [regionError, setRegionError] = useState('');

  const regions = [
    'North America',
    'EMEA (Europe, Middle East, Africa)',
    'Asia Pacific',
    'Latin America',
    'Africa',
    'Oceania',
  ];

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const validatePassword = (text: string) => {
    const isValid = text.length >= 8 && /[A-Z]/.test(text) && /[0-9]/.test(text);
    if (!isValid) {
      setPasswordError(
        'Password must be at least 8 characters long, contain an uppercase letter, and a number'
      );
    }
    return isValid;
  };

  const validateInput = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!email.trim() || !validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!region.trim()) {
      setRegionError('Region is required');
      isValid = false;
    } else {
      setRegionError('');
    }

    if (!validatePassword(password)) {
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const backTrigger = () => {
    clearErrors();
    router.back();
  };

  const clearErrors = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setRegion('');
    setPassword('');

    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setRegionError('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <RegistrationScreenBackground />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            <Text style={styles.title}>Leadership Summit 2025</Text>
            <Text style={styles.subtitle}>Register here</Text>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John"
                  placeholderTextColor="#bdbdbd"
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    if (text.trim()) setFirstNameError('');
                  }}
                />
                {firstNameError ? (
                  <Text style={styles.warningText}>⚠️ {firstNameError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Doe"
                  placeholderTextColor="#bdbdbd"
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    if (text.trim()) setLastNameError('');
                  }}
                />
                {lastNameError ? (
                  <Text style={styles.warningText}>⚠️ {lastNameError}</Text>
                ) : null}
              </View>
            </View>

            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputIconRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Johndoe@deloitte.com"
                  placeholderTextColor="#bdbdbd"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (!validateEmail(text)) {
                      setEmailError('Invalid email format');
                    } else {
                      setEmailError('');
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Icon name="mail-outline" size={20} color="#bdbdbd" style={{ marginRight: 10 }} />
              </View>
              {emailError ? (
                <Text style={styles.warningText}>⚠️ {emailError}</Text>
              ) : null}
            </View>

            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={styles.label}>Region</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setModalVisible(true)}
              >
                <Text style={region ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {region || 'Select your region'}
                </Text>
                <Icon name="chevron-down-outline" size={22} color="#bdbdbd" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              {regionError ? (
                <Text style={styles.warningText}>⚠️ {regionError}</Text>
              ) : null}
            </View>

            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={styles.label}>Create Password</Text>
              <View style={styles.inputIconRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter new password"
                  placeholderTextColor="#bdbdbd"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (validatePassword(text)) {
                      setPasswordError('');
                    }
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#bdbdbd"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.warningText}>⚠️ {passwordError}</Text>
              ) : (
                <Text style={styles.warningText}>⚠️ Do not use your Deloitte password</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (validateInput()) {
                  console.log('All valid!');
                }
              }}
            >
              <Text style={styles.buttonText}>Register Now</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Having problems?{' '}
              <Text style={styles.contactText} onPress={() => {
                clearErrors();
                router.push('/(tabs)/contactUs')
              }}>
                Contact us
              </Text>
            </Text>
          </View>

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity style={styles.secondaryButton} onPress={backTrigger}>
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                clearErrors();
                router.push('/(tabs)/registrationAttendanceConfirmation')
              }}
            >
              <Text style={styles.secondaryButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={regions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.regionOption}
                  onPress={() => {
                    setRegion(item);
                    setRegionError('');
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.regionOptionText}>{item}</Text>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 18,
    padding: 24,
    width: '92%',
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 8,
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  label: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#222',
    borderWidth: 0,
    marginBottom: 0,
  },
  textInputLong: {
    width: '100%',
  },
  inputIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingRight: 0,
  },
  warningText: {
    color: '#FFD600',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#8DD22A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
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
    alignItems: 'center',
    marginBottom: 40,
    gap: 12,
  },
  secondaryButton: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginHorizontal: 6,
    backgroundColor: '#111',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    minHeight: 44,
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
  regionOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  regionOptionText: {
    fontSize: 16,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
});
