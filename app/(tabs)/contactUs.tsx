import WelcomePageBackground from '@/assets/images/svg/welcomePageBackground';
import { getToken } from '@/utils/authToken';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ContactUs() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [navigationBarVisible, setNavigationBarVisible] = React.useState(true);
    const [loading, setLoading] = useState(false);
    const [showCheckmark, setShowCheckmark] = useState(false);
    
      const scaleAnim = useRef(new Animated.Value(0)).current;


    useFocusEffect(
      useCallback(() => {
        const verifyAuthAndLoad = async () => {
         const token = await getToken();
         if (token) {
            setNavigationBarVisible(true);
         } 
        };
  
        verifyAuthAndLoad();
      }, [])
    );

    const createContactUsRequest = async () => {
        // const isValid = validateInput();
        // if (!isValid) return;
    
        try {
          setLoading(true);
          const token = await getToken();
          const response = await fetch('https://localhost:5226/Create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email,
              firstName,
              lastName,
              message,
            }),
          });
    
          const data = await response.json();
          if (data.statusCode === 200) {
            showAnimatedCheckmark();
          } else {
            Alert.alert('Update Failed', data.message || 'Profile update failed.');
          }
        } catch (error) {
          Alert.alert('Update Failed', 'An unexpected error occurred during update.');
        } finally {
          setLoading(false);
        }
      };

      const showAnimatedCheckmark = () => {
          setShowCheckmark(true);
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setTimeout(() => {
              Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start(() => {
                setShowCheckmark(false);
              });
            }, 2000);
          });
        };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ flex: 1 }}>
        <WelcomePageBackground style={StyleSheet.absoluteFillObject} />
        {/* Contact Us page does not have a header as per design */}
        
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.heading}>Get in Touch</Text>
            <Text style={styles.subheading}>
              Fill in your details we will reach{"\n"}out as soon as possible
            </Text>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Bheki"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor="#aaa"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ntshezi"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.emailInputWrapper}>
                <TextInput
                  style={[styles.input, { flex: 1, borderWidth: 0 }]}
                  placeholder="bntshezi@deloitte.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor="#aaa"
                />
                <Ionicons name="mail-outline" size={20} color="#aaa" />
              </View>
            </View>

            <View style={styles.inputContainerMessage}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Enter your message"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                placeholderTextColor="#aaa"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => createContactUsRequest()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {/* Contact Us does not have a footer*/ }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    marginTop:150,
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 6,
  },
    inputContainerMessage: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
    marginTop: 0,
  },
  emailInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  button: {
    backgroundColor: '#8DD22A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
