import RegistrationScreen1Background from '@/assets/images/svg/registrationScreen1Background';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const attendanceOptions = [
  { label: "Wouldn't miss it!", value: 'yes' },
  { label: 'Catch you the next time!', value: 'no' },
  { label: 'Mulling It over', value: 'maybe' },
];

export default function RegistrationAttendanceConfirmation() {
  const [selected, setSelected] = useState('yes');
  const [message, setMessage] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#000'}}>
      <RegistrationScreen1Background />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.overlay, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.title}>Confirm your attendance</Text>
          <Text style={styles.subtitle}>Summit dates:  8 - 9 Sep '25</Text>
          <View style={{ marginTop: 16, marginBottom: 18 }}>
            {attendanceOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioRow}
                onPress={() => setSelected(option.value)}
                activeOpacity={0.7}
              >
                <View style={styles.radioOuter}>
                  {selected === option.value && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your message"
            placeholderTextColor="#bdbdbd"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.button}>
            <Icon name="person-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            Having problems? <Text style={styles.contactText}>Contact us</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 18,
    padding: 24,
    margin: 24,
    marginTop: 80,
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
    marginLeft: 2,
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
    alignSelf: 'center',
    marginTop: 8,
  },
  contactText: {
    color: '#8DD22A',
    fontWeight: 'bold',
  },
});