import { Speaker } from '@/constants/Speaker';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorModal from './ErrorModal';

const placeholderAvatar = require('@/assets/icons/profile-icon.png');

interface FeaturedSpeakersGridProps {
  horizontal?: boolean;
  fromHome?: boolean;
  onSpeakersLoaded?: (hasSpeakers: boolean) => void;
}

export default function FeaturedSpeakersGrid({ horizontal = false, fromHome = false, onSpeakersLoaded = () => {}, }: FeaturedSpeakersGridProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const[errorVisible, setErrorVisible] = useState(false);
  const[errorMessage, setErrorMessage] = useState('');
  const[errorModalTitle, setErrorModalTitle] = useState(''); 

  const router = useRouter();

  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 16 * 2;
  const spacingBetweenCards = 16; 
  const cardWidth = (screenWidth - horizontalPadding - spacingBetweenCards) / 2;

  useFocusEffect(
    useCallback(() => {
      const fetchSpeakers = async () => {
        try {
          const response = await fetch('https://deloittesummitbe.azurewebsites.net/api/Speaker/getAll', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          if (response.ok) {
            const speakerList = data.speakers as Speaker[];
            setSpeakers(speakerList);
            onSpeakersLoaded(speakerList.length > 0);
          } else {
            setErrorModalTitle('Error');
            setErrorMessage('Failed to load Speaker data. Please try again later.');
            setErrorVisible(true);
            onSpeakersLoaded(false);
          }
        } catch (error) {
          console.error('Error fetching speakers:', error);
          setErrorModalTitle('Error');
          setErrorMessage("Speakers' data cannot be loaded at this time, please try again later.");
          setErrorVisible(true);
          onSpeakersLoaded(false);
        }
      };
      fetchSpeakers();
    }, [])
  );

return (
  <ScrollView contentContainerStyle={{}} horizontal={horizontal}>
    <View style={styles.speakersGrid}>
      {speakers.length > 0 &&
        speakers.map((speaker) => (
          <TouchableOpacity
            key={speaker.id}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/speaker-bio',
                params: {
                  ...speaker,
                  fromHome: fromHome ? 'true' : 'false',
                },
              })
            }
          >
            <View style={[styles.speakerCard, { width: cardWidth }]}>
              <Image
                source={
                  speaker.imageUrl
                    ? { uri: `https://deloittesummitbe.azurewebsites.net${speaker.imageUrl}` }
                    : placeholderAvatar
                }
                style={styles.speakerAvatar}
              />
              <Text style={styles.speakerName}>
                {speaker.firstName} {speaker.lastName}
              </Text>
              <Text style={styles.speakerTitle}>{speaker.expertise}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </View> 
    <ErrorModal
      visible={errorVisible}
      title={errorModalTitle}
      message={errorMessage}
      onClose={() => setErrorVisible(false)}
    />
  </ScrollView>
);
}

const styles = StyleSheet.create({
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
});