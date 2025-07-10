import WelcomePageBackground from '@/assets/images/svg/welcomePageBackground';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomePage({  }) {
  return (
    <View style={styles.container}>
      <WelcomePageBackground />
      <View style={
        { flex: 1, justifyContent: 'center', alignItems: 'center' }
      } >
        <Text style={styles.title}>Africa Consulting Services</Text>
        <Text style={styles.subtitle}>Leadership Summit 2025</Text>
        <View style={styles.card}>
          <Text style={styles.builtBy}>BUILT BY</Text>
          <Text style={styles.cardTitle}>Deloitte Africa</Text>
          <Text style={styles.cardSubtitle}>Product &amp; Platform Engineering</Text>
          <View style={styles.divider} />
          <Text style={styles.hostedBy}>HOSTED BY</Text>
          <Text style={styles.cardSubtitle}>Microsoft Practice</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={ () => { /* Navigate to next screen */ }}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerImage: {
    width: 220,
    height: 180,
    marginBottom: 32,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#181818',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    width: '100%',
    marginBottom: 40,
  },
  builtBy: {
    color: '#B6E23A',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  hostedBy: {
    color: '#B6E23A',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 13,
    textAlign: 'center',
  },
  divider: {
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#B6E23A',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 16,
    marginBottom: 32,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
    width: '120%',
    height: 120,
    left: '-10%',
    opacity: 0.5,
  },
});