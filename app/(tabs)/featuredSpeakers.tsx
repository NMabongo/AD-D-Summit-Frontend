import en from '@/assets/translations/en.json';
import HeaderWithMenu from '@/components/HeaderWithMenu';
import { Route, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NavigationBar from '../../components/navigationBar';


const deloitteLogo = require('@/assets/images/icon.png');
const avatarIcon = require('@/assets/images/icon.png');
const micBg = require('@/assets/images/mic-studio.jpg');

const speakers = [
  {
    id: '1',
    name: 'Bheki Ntshezi',
    title: 'AI Expert',
    avatar: require('@/assets/images/portrait-male.jpg'),
  },
  {
    id: '2',
    name: 'Mark Davis',
    title: 'Tech CEO',
    avatar: require('@/assets/images/portrait-male.jpg'),
  },
  {
    id: '3',
    name: 'Lisa Wang',
    title: 'Blockchain',
    avatar: require('@/assets/images/portrait-female.jpg'),
  },
  {
    id: '4',
    name: 'Lisa Chen',
    title: 'AI Expert',
    avatar: require('@/assets/images/portrait-female.jpg'),
  },
  {
    id: '5',
    name: 'Lisa Chen',
    title: 'AI Expert',
    avatar: require('@/assets/images/portrait-female.jpg'),
  },
  {
    id: '6',
    name: 'Mark Davis',
    title: 'Tech CEO',
    avatar: require('@/assets/images/portrait-male.jpg'),
  },
  {
    id: '7',
    name: 'Lisa Wang',
    title: 'Blockchain',
    avatar: require('@/assets/images/portrait-female.jpg'),
  },
  {
    id: '8',
    name: 'Lisa Chen',
    title: 'AI Expert',
    avatar: require('@/assets/images/portrait-female.jpg'),
  },
];

const numColumns = 2;
const cardWidth = (Dimensions.get('window').width - 48) / 2;

export default function FeaturedSpeakers() {
  const [menuResetKey, setMenuResetKey] = React.useState(0);
  const router = useRouter(); 

  const handleNavigationAndReset = (route: string) => {
    setMenuResetKey((prev) => prev + 1);
    router.push(route as Route);
  };

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <HeaderWithMenu resetSignal={menuResetKey} />
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
              <TouchableOpacity
                key={speaker.id}
                onPress={() => router.push({ pathname: '/(tabs)/speaker-bio', params: { speakerId: speaker.id } })}
              >
                <View style={styles.speakerCard}>
                  <Image source={speaker.avatar} style={styles.speakerAvatar} />
                  <Text style={styles.speakerName}>{speaker.name}</Text>
                  <Text style={styles.speakerTitle}>{speaker.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <NavigationBar
          name={en.navigationOptions.featuredSpeakers}
          onTabPress={handleNavigationAndReset}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1000,
    position: 'relative', 
  },
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
    width: cardWidth, // This `cardWidth` needs to be correctly calculated or imported
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
    alignItems: 'center',
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
  }
});