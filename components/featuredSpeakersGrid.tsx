
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const deloitteLogo = require('@/assets/images/icon.png');
const avatarIcon = require('@/assets/images/icon.png');
const micBg = require('@/assets/images/mic-studio.jpg');

const demoSpeakers = [
    {
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "expertise": "Cloud Computing",
        "region": "North America",
        "rating": 4.7,
        "talksGiven": 12,
        "yearsExperience": 8,
        "satisfaction": 95,
        "bio": "Expert in scalable cloud architectures."
    },
    {
        "id": 2,
        "firstName": "Bob",
        "lastName": "Smith",
        "expertise": "Cybersecurity",
        "region": "Europe",
        "rating": 4.5,
        "talksGiven": 20,
        "yearsExperience": 12,
        "satisfaction": 90,
        "bio": "Renowned cybersecurity specialist."
    },
    {
        "id": 3,
        "firstName": "Carol",
        "lastName": "Lee",
        "expertise": "AI & ML",
        "region": "Asia",
        "rating": 4.8,
        "talksGiven": 15,
        "yearsExperience": 10,
        "satisfaction": 97,
        "bio": "Machine learning researcher and speaker."
    },
    {
        "id": 4,
        "firstName": "David",
        "lastName": "Kim",
        "expertise": "DevOps",
        "region": "Australia",
        "rating": 4.3,
        "talksGiven": 10,
        "yearsExperience": 7,
        "satisfaction": 88,
        "bio": "DevOps engineer with global experience."
    },
    {
        "id": 5,
        "firstName": "Eva",
        "lastName": "Martinez",
        "expertise": "Data Science",
        "region": "South America",
        "rating": 4.6,
        "talksGiven": 18,
        "yearsExperience": 11,
        "satisfaction": 92,
        "bio": "Data science leader and educator."
    },
    {
        "id": 6,
        "firstName": "Frank",
        "lastName": "Nguyen",
        "expertise": "Web Development",
        "region": "North America",
        "rating": 4.2,
        "talksGiven": 8,
        "yearsExperience": 5,
        "satisfaction": 85,
        "bio": "Front-end web development expert."
    },
    {
        "id": 7,
        "firstName": "Grace",
        "lastName": "Patel",
        "expertise": "Mobile Apps",
        "region": "Europe",
        "rating": 4.4,
        "talksGiven": 14,
        "yearsExperience": 9,
        "satisfaction": 89,
        "bio": "Mobile application architect."
    },
    {
        "id": 8,
        "firstName": "Henry",
        "lastName": "Olsen",
        "expertise": "IoT",
        "region": "Asia",
        "rating": 4.1,
        "talksGiven": 7,
        "yearsExperience": 6,
        "satisfaction": 83,
        "bio": "Internet of Things innovator."
    },
    {
        "id": 9,
        "firstName": "Ivy",
        "lastName": "Chen",
        "expertise": "Blockchain",
        "region": "Australia",
        "rating": 4.9,
        "talksGiven": 22,
        "yearsExperience": 13,
        "satisfaction": 98,
        "bio": "Blockchain technology evangelist."
    },
    {
        "id": 10,
        "firstName": "Jack",
        "lastName": "Brown",
        "expertise": "AR/VR",
        "region": "South America",
        "rating": 4,
        "talksGiven": 5,
        "yearsExperience": 4,
        "satisfaction": 80,
        "bio": "Augmented and virtual reality specialist."
    }
]

const numColumns = 2;
const cardWidth = (Dimensions.get('window').width - 48) / 2;

export default function FeaturedSpeakersGrid({horizontal = false, fromHome = false}) {
  const [menuResetKey, setMenuResetKey] = React.useState(0);
  const [speakers, setSpeakers] = React.useState(demoSpeakers);
  const router = useRouter(); 

  useFocusEffect(
      useCallback(() => {
        const fetchEvents = async () => {
          try {
            const response = await fetch('https://localhost:7072/api/Speaker/getAll', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
  
            const speakers = await response.json();
            console.log('Fetched speakers:', speakers);
            setSpeakers(speakers.speakers);
            
  
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
  
        fetchEvents();
      }, [])
    );

  return (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 } } horizontal={horizontal}>
          {/* Speakers Grid */}
          <View style={styles.speakersGrid}>
            {speakers.map((speaker) => (
              <TouchableOpacity
                key={speaker.id}
                onPress={() => router.push({ pathname: '/(tabs)/speaker-bio', params: { ...speaker, fromHome} })}
              >
                <View style={styles.speakerCard}>
                  <Image source={speaker.avatar} style={styles.speakerAvatar} />
                  <Text style={styles.speakerName}>{speaker.firstName + " " + speaker.lastName}</Text>
                  <Text style={styles.speakerTitle}>{speaker.expertise}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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