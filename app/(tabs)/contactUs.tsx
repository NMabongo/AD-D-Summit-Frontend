import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ContactUs: React.FC = () => {
  const profileBackground = require('@/assets/images/ContactUs.jpg')

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
            onPress={() => router.push('/(tabs)/home')}
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
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={[styles.input, styles.textInput]}
                    placeholder="Ntshezi"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, styles.textInput]}
                  placeholder="bntshezi@deloitte.com"
                />
              </View>

              <View style={[styles.inputGroup, styles.messageGroup]}>
                <Text style={styles.label}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter your message"
                  multiline
                />
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>

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
