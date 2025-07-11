import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const deloitteLogo = require('@/assets/images/icon.png'); // Replace with your logo
const avatarIcon = require('@/assets/images/icon.png'); // Replace with your avatar
const mindfulnessBg = require('@/assets/images/icon.png'); // Replace with your mindfulness banner image

const activities = [
  {
    id: '1',
    title: 'Deloitte Partner Summit 2025',
    desc: 'Start your day with a 10-minute guided meditation session focusing on breath awareness and intention setting.',
    duration: '5hr 30min',
  },
  {
    id: '2',
    title: 'Deloitte Partner Summit 2025',
    desc: 'Practice mindful movement with a guided walking meditation in nature, focusing on each step and breath.',
    duration: '5hr 30min',
  },
  {
    id: '3',
    title: 'Deloitte Partner Summit 2025',
    desc: 'Deep relaxation technique that guides you through releasing tension from every part of your body.',
    duration: '5hr 30min',
  },
];

export default function MindfulnessActivity() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={deloitteLogo} style={styles.logo} />
        <Text style={styles.headerTitle}>Leadership Summit 2025</Text>
        <TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Image source={avatarIcon} style={styles.avatarImg} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={mindfulnessBg} style={styles.bannerImg} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Mindfulness</Text>
          </View>
        </View>

        {/* Activities List */}
        {activities.map(activity => (
          <View key={activity.id} style={styles.activityCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDesc}>{activity.desc}</Text>
              <View style={styles.activityInfoRow}>
                <Text style={styles.activityDuration}>🕒 {activity.duration}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.registerBtn}>
              <Text style={styles.registerBtnText}>Register</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImg: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    position: 'absolute',
    top: '40%',
    width: '100%',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  activityDesc: {
    color: '#888',
    fontSize: 13,
    marginBottom: 8,
  },
  activityInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  activityDuration: {
    color: '#888',
    fontSize: 12,
  },
  registerBtn: {
    backgroundColor: '#8DD22A',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 8,
    height: 36,
  },
  registerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});