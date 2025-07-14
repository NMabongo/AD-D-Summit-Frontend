import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const breakoutBg = require('@/assets/images/icon.png'); // Replace with your breakout banner image

const rooms = [
  {
    id: '1',
    title: 'Team A Discussion',
    desc: 'Discuss project updates and next steps.',
    location: 'Conference Room A',
    participants: 5,
  },
  {
    id: '2',
    title: 'Team B Brainstorming',
    desc: 'Generate ideas for the new marketing campaign.',
    location: 'Conference Room A',
    participants: 8,
  },
  {
    id: '3',
    title: 'Team C Review',
    desc: 'Evaluate the latest design mockups.',
    location: '',
    participants: 4,
  },
  {
    id: '4',
    title: 'Team D Strategy Session',
    desc: 'Plan for the upcoming product launch.',
    location: '',
    participants: undefined,
  },
];

export default function BreakoutRooms() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Breakout Rooms</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={breakoutBg} style={styles.bannerImg} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Breakout Rooms</Text>
          </View>
        </View>

        {/* Room Cards */}
        {rooms.map(room => (
          <View key={room.id} style={styles.roomCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.roomTitle}>{room.title}</Text>
              <Text style={styles.roomDesc}>{room.desc}</Text>
              {room.location ? (
                <Text style={styles.roomLocation}>{room.location}</Text>
              ) : null}
              {room.participants !== undefined ? (
                <Text style={styles.roomParticipants}>Participants: <Text style={{ color: '#8DD22A' }}>{room.participants}</Text></Text>
              ) : null}
            </View>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
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
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
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