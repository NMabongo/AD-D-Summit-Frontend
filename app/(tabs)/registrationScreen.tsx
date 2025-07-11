import RegistrationScreenBackground from '@/assets/images/svg/registrationScreenBackground';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
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
                  onChangeText={setFirstName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Doe"
                  placeholderTextColor="#bdbdbd"
                  value={lastName}
                  onChangeText={setLastName}
                />
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
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Icon name="mail-outline" size={20} color="#bdbdbd" style={{ marginRight: 10 }} />
              </View>
            </View>

            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={styles.label}>Region</Text>
              <View style={styles.inputIconRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder=""
                  placeholderTextColor="#bdbdbd"
                  value={region}
                  onChangeText={setRegion}
                />
                <Icon name="chevron-down-outline" size={22} color="#bdbdbd" style={{ marginRight: 10 }} />
              </View>
            </View>

            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={styles.label}>Create Password</Text>
              <View style={styles.inputIconRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter new password"
                  placeholderTextColor="#bdbdbd"
                  value={password}
                  onChangeText={setPassword}
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
              <Text style={styles.warningText}>⚠️ Do not use your Deloitte password</Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Register Now</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Having problems? <Text style={styles.contactText}  onPress={() => router.push('/(tabs)/contactUs')}>Contact us</Text>
            </Text>
          </View>

          {/* Bottom navigation buttons */}
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/(tabs)/registrationAttendanceConfirmation')}
            >
              <Text style={styles.secondaryButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
});
