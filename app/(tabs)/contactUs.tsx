import ErrorModal from '@/components/ErrorModal';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ContactUs: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const[errorVisible, setErrorVisible] = useState(false);
    const[errorMessage, setErrorMessage] = useState('');
    const[errorModalTitle, setErrorModalTitle] = useState(''); 
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const profileBackground = require('@/assets/images/ContactUs.jpg')

    const clearData = () => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
    }
    const handleSubmit = async () => {
      const newErrors: { [key: string]: string } = {};

      if (!firstName.trim()) {
        newErrors.firstName = 'First name is required.';
      }

      if (!email.trim()) {
        newErrors.email = 'Email is required.';
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'Email format is invalid.';
      }

      if (!message.trim()) {
        newErrors.message = 'Message is required.';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        const response = await fetch('https://deloittesummitbe.azurewebsites.net/api/contactUs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            message,
          }),
        });

        if (response.ok) {
          setErrorMessage("Message sent!");
          setErrorModalTitle("Success");
          setErrorVisible(true);
          clearData();
        } else {
          setErrorModalTitle('Error');
          setErrorMessage('Failed to send message. Please try again.');
          setErrorVisible(true);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setErrorModalTitle('Internal Error');
        setErrorMessage('Message cannot be sent at this time, try again later.');
        setErrorVisible(true);
      }
    };

  return (
    <View style={{ flex: 1 }}>

      <ImageBackground
        source={profileBackground}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitleText}>Contact Us</Text>
          <View style={{ width: 32 }} />
        </View>

        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Get in Touch</Text>
              <Text style={styles.subtitle}>
                Fill in your details we will reach{'\n'}out as soon as possible
              </Text>

              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={[styles.input, styles.textInput]}
                    placeholder="Bheki"
                    placeholderTextColor="#ccc"
                    value={firstName}
                    onChangeText={setFirstName}
                  />       
                  {errors.firstName && <Text style={{ color: 'red', marginTop: 4 }}>{errors.firstName}</Text>}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={[styles.input, styles.textInput]}
                    placeholder="Ntshezi"
                    placeholderTextColor="#ccc"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, styles.textInput]}
                  placeholder="bntshezi@deloitte.com"
                  placeholderTextColor="#ccc"
                  value={email}
                  onChangeText={setEmail}
                />
                {errors.email && <Text style={{ color: 'red', marginTop: 4 }}>{errors.email}</Text>}
              </View>

              <View style={[styles.inputGroup, styles.messageGroup]}>
                <Text style={styles.label}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter your message"
                  placeholderTextColor="#ccc"
                  multiline
                  value={message}
                  onChangeText={setMessage}
                />           
                {errors.message && <Text style={{ color: 'red', marginTop: 4 }}>{errors.message}</Text>}
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
      <ErrorModal
        visible={errorVisible}
        title={errorModalTitle}
        message={errorMessage}
        onClose={() => {setErrorVisible(false)}}
      />
    </View>
  );
};

export default ContactUs;

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 10,
  },
  messageGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  textInput: {
    height: 44,
  },
  textArea: {
    height: 140,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#7ED957',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  backArrow: {
    fontSize: 24,
    color: '#222',
    width: 32,
    textAlign: 'left',
  },
  backButton: {
    padding: 5,
  },
  headerTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  topBarTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  content: {
    flex: 1,
    zIndex: 2,
    paddingHorizontal: 20,
  },
});
