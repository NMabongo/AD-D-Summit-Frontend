import SummitBg from '@/assets/images/svg/homeBanner';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const deloitteLogo = require('@/assets/images/icon.png');
const micIcon = require('@/assets/images/icon.png');

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Image source={deloitteLogo} style={styles.logo} />
        <Text style={styles.headerTitle}>Leadership Summit 2025</Text>
        <TouchableOpacity>
          <View style={styles.avatarCircle}>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.heroContainer}>
          <View style={styles.heroBg}>
            <SummitBg width="100%" height="100%" />
          </View>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroOrg}>Africa Consulting Services</Text>
            <Text style={styles.heroTitle}>Leadership Summit 2025</Text>
            <Text style={styles.heroTagline}>Energy • Synergy • Thrive</Text>
            <View style={styles.heroInfoRow}>
              <Icon name="calendar-outline" size={18} color="#fff" />
              <Text style={styles.heroInfoText}> Sep 08 · 09 </Text>
              <Icon name="location-outline" size={18} color="#fff" />
              <Text style={styles.heroInfoText}>Kievits Kroon Gauteng</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>160+</Text>
            <Text style={styles.statLabel}>Attendees</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>Global Guests &{'\n'}Speakers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>Fun</Text>
            <Text style={styles.statLabel}>Unlimited</Text>
          </View>
        </View>

        <View style={styles.countdownCard}>
          <View style={styles.countdownHeader}>
            <Text style={styles.countdownTitle}>Event Starts In</Text>
            <Icon name="time-outline" size={20} color="#fff" />
          </View>
          <View style={styles.countdownRow}>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>12</Text>
              <Text style={styles.countdownLabel}>Days</Text>
            </View>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>08</Text>
              <Text style={styles.countdownLabel}>Hours</Text>
            </View>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>45</Text>
              <Text style={styles.countdownLabel}>Minutes</Text>
            </View>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>32</Text>
              <Text style={styles.countdownLabel}>Seconds</Text>
            </View>
          </View>
        </View>

        <View style={styles.agendaHeaderRow}>
          <Text style={styles.agendaTitle}>Day 1 Agenda</Text>
          <TouchableOpacity>
            <Text style={styles.fullSchedule}>Full Schedule</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.agendaCard}>
          <Image source={micIcon} style={styles.agendaIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.agendaSessionTitle}>Day 1: Opening</Text>
            <Text style={styles.agendaSessionDesc}>The Future of AI in Business</Text>
            <View style={styles.agendaSessionInfoRow}>
              <Text style={styles.agendaSessionTime}>9:00 AM</Text>
              <Text style={styles.agendaSessionLocation}>Main Hall</Text>
            </View>
          </View>
        </View>
        <View style={styles.agendaCard}>
          <Image source={micIcon} style={styles.agendaIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.agendaSessionTitle}>Day 1: Evening</Text>
            <Text style={styles.agendaSessionDesc}>The Future of AI in Business</Text>
            <View style={styles.agendaSessionInfoRow}>
              <Text style={styles.agendaSessionTime}>9:00 AM</Text>
              <Text style={styles.agendaSessionLocation}>Main Hall</Text>
            </View>
          </View>
        </View>
      </ScrollView>

            <View style={styles.bottomNav}>
              <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/home1')}>
                <Icon name="home" size={24} color="#8DD22A" />
                <Text style={styles.navLabelActive} >Home</Text>
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
                <Icon name="leaf" size={24} color="#BDBDBD" />
                <Text style={styles.navLabel} >Mindfulness</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem}>
                <Icon name="person" size={24} color="#BDBDBD" />
                <Text style={styles.navLabel}>Profile</Text>
              </TouchableOpacity>
            </View>
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
  },
  heroContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroBg: {
    width: '100%',
    height: 140,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heroOrg: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 2,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  heroTagline: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  heroInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8DD22A',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },
  heroInfoText: {
    color: '#fff',
    fontSize: 13,
    marginRight: 6,
    marginLeft: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: -28,
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
    marginBottom: 2,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  countdownCard: {
    backgroundColor: 'linear-gradient(90deg, #FF9800 0%, #FF5722 100%)', // fallback for web, use View+absolute bg for RN
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    backgroundColor: '#FF9800',
  },
  countdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  countdownTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  countdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countdownItem: {
    alignItems: 'center',
    flex: 1,
  },
  countdownNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  countdownLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  agendaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  agendaTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
  },
  fullSchedule: {
    color: '#8DD22A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  agendaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  agendaIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
    marginTop: 2,
  },
  agendaSessionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  agendaSessionDesc: {
    color: '#888',
    fontSize: 13,
    marginBottom: 4,
  },
  agendaSessionInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agendaSessionTime: {
    backgroundColor: '#E6F7D9',
    color: '#8DD22A',
    fontWeight: 'bold',
    fontSize: 12,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  agendaSessionLocation: {
    color: '#888',
    fontSize: 12,
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