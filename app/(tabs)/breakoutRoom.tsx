import ErrorModal from '@/components/ErrorModal';
import { Room } from '@/constants/BreakroomItem';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const breakoutBg = require('@/assets/images/kick.jpg'); 

export default function BreakoutRooms() {
  const { eventId, fromHome } = useLocalSearchParams();
const [errorVisible, setErrorVisible] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [errorModalTitle, setErrorModalTitle] = useState('');
const [rooms, setRooms] = useState<Room[]>([]);

useEffect(() => {
  if (!eventId) return;

  fetch(`https://localhost:7072/api/BreakoutRoom?eventId=${eventId}`)
    .then(res => res.json())
    .then(data => setRooms(data))
    .catch(err => {
      setErrorModalTitle('Loading Error');
      setErrorMessage('Breakout Rooms cannot be loaded at this time');
      setErrorVisible(true);
      console.error('Failed to fetch breakout rooms:', err);
    });
}, [eventId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => fromHome? router.push('/(tabs)/home'): router.push('/(tabs)/agenda')}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
        <Text style={styles.headerTitleText}>Breakout Rooms</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.bannerContainer}>
          <Image source={breakoutBg} style={styles.bannerImg} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Breakout Rooms</Text>
          </View>
        </View>

        {rooms.map(room => (
          <View key={room.id} style={styles.roomCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.roomTitle}>{room.breakoutRoomTitle }</Text>
              <Text style={styles.roomSubtitle}>{room.topic}</Text>
              <Text style={styles.roomDesc}>{room.roomName}</Text>
              {room.participants !== undefined ? (
                <Text style={styles.roomParticipants}>
                  Participants: <Text >{room.participants}</Text>
                </Text>
              ) : null}
            </View>
          </View>
        ))}
      </ScrollView>
      <ErrorModal
          visible={errorVisible}
          title={errorModalTitle}
          message={errorMessage}
          onClose={() => {setErrorVisible(false)}}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  bannerContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImg: {
    width: '100%',
    height: 160,
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
  roomCard: {
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
  roomTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    marginBottom: 2,
  },
  roomSubtitle: {
    fontSize: 17,
    color: 'grey',
    marginBottom: 5,
  },
  roomDesc: {
    color: '#888',
    fontSize: 13,
    marginBottom: 8,
  },
  roomLocation: {
    color: '#8DD22A',
    fontSize: 13,
    marginBottom: 2,
  },
  roomParticipants: {
    fontSize: 12,
    marginBottom: 2,
    color: '#8DD22A' ,
  },
  joinBtn: {
    backgroundColor: '#8DD22A',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 8,
    height: 36,
  },
  joinBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});