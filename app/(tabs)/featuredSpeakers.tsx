import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const deloitteLogo = require('@/assets/images/icon.png'); // Replace with your logo
const avatarIcon = require('@/assets/images/icon.png'); // Replace with your avatar
const micBg = require('@/assets/images/icon.png'); // Replace with your featured speakers banner image

const speakers = [
  {
    id: '1',
    name: 'Bheki Ntshezi',
    title: 'AI Expert',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '2',
    name: 'Mark Davis',
    title: 'Tech CEO',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '3',
    name: 'Lisa Wang',
    title: 'Blockchain',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '4',
    name: 'Lisa Chen',
    title: 'AI Expert',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '5',
    name: 'Lisa Chen',
    title: 'AI Expert',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '6',
    name: 'Mark Davis',
    title: 'Tech CEO',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '7',
    name: 'Lisa Wang',
    title: 'Blockchain',
    avatar: require('@/assets/images/icon.png'),
  },
  {
    id: '8',
    name: 'Lisa Chen',
    title: 'AI Expert',
    avatar: require('@/assets/images/icon.png'),
  },
];

const numColumns = 2;
const cardWidth = (Dimensions.get('window').width - 48) / 2;

export default function FeaturedSpeakers() {
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
          <Image source={micBg} style={styles.bannerImg} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Featured Speakers</Text>
          </View>
        </View>

        {/* Speakers Grid */}
        <View style={styles.speakersGrid}>
          {speakers.map((speaker) => (
            <View key={speaker.id} style={styles.speakerCard}>
              <Image source={speaker.avatar} style={styles.speakerAvatar} />
              <Text style={styles.speakerName}>{speaker.name}</Text>
              <Text style={styles.speakerTitle}>{speaker.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="people" size={24} color="#8DD22A" />
          <Text style={styles.navLabelActive}>Speakers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="leaf" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>Mindfulness</Text>
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
  speakersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  speakerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    width: cardWidth,
    marginBottom: 18,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  speakerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  speakerName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  speakerTitle: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
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
  }
});