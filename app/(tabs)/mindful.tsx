import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const mindfulBanner = require('@/assets/images/icon.png');

const sessions = [
  {
    id: '1',
    title: 'Deloitte Partner Summit 2025',
    description: 'Start your day with a 10-minute guided meditation session focusing on breath awareness and intention setting.',
    duration: '5hr 30min',
  },
  {
    id: '2',
    title: 'Deloitte Partner Summit 2025',
    description: 'Practice mindful movement with a guided walking meditation in nature, focusing on each step and breath.',
    duration: '5hr 30min',
  },
  {
    id: '3',
    title: 'Deloitte Partner Summit 2025',
    description: 'Deep relaxation technique that guides you through releasing tension from every part of your body.',
    duration: '5hr 30min',
  },
];

export default function Mindful() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Image source={mindfulBanner} style={styles.logo} />
        <Text style={styles.headerTitle}>Leadership Summit 2025</Text>
        <TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Image source={mindfulBanner} style={styles.avatarImg} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.bannerContainer}>
          <Image source={mindfulBanner} style={styles.bannerImg} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Mindfulness</Text>
          </View>
        </View>

        {sessions.map((session) => (
          <View key={session.id} style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>{session.title}</Text>
            <Text style={styles.sessionDescription}>{session.description}</Text>
            <View style={styles.sessionFooter}>
              <Icon name="time-outline" size={18} color="#888" />
              <Text style={styles.sessionDuration}>{session.duration}</Text>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/home1')}>
          <Icon name="home" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel} >Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/agenda')}>
          <Icon name="calendar" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel} >Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/featuredSpeakers')}>
          <Icon name="people" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel} >Speakers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/mindful')}>
          <Icon name="cloud" size={24} color="#8DD22A" />
          <Text style={styles.navLabelActive} >Mindfulness</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}  onPress={() => router.push('/(tabs)/profile')}>
          <Icon name="person" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    justifyContent: 'space-between',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  bannerContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    marginBottom: 12,
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  sessionTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    marginBottom: 6,
  },
  sessionDescription: {
    color: '#444',
    fontSize: 15,
    marginBottom: 12,
  },
  sessionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionDuration: {
    color: '#888',
    fontSize: 14,
    marginLeft: 6,
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#8DD22A',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginLeft: 12,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingVertical: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navLabel: {
    color: '#BDBDBD',
    fontSize: 12,
    marginTop: 2,
  },
  navLabelActive: {
    color: '#8DD22A',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
  },
});
