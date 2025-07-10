import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const deloitteLogo = require('@/assets/images/icon.png'); // Replace with your logo
const avatarIcon = require('@/assets/images/icon.png'); // Replace with your avatar

const days = [
  { label: 'Mon', date: '08', active: true, disabled: false },
  { label: 'Tue', date: '09', active: false, disabled: false },
  { label: 'Wed', date: '10', active: false,   disabled: false },
];

const agendaData = [
  {
    id: '1',
    icon: <Icon name="rocket-outline" size={22} color="#4FC3F7" />,
    title: 'Product Launch Presentation',
    desc: 'Q4 product roadmap and feature announcements for the upcoming release cycle.',
    time: '9:00 - 13:30 AM',
    location: 'Conference Room A',
    color: '#E3F4FD',
    iconBg: '#B3E5FC',
  },
  {
    id: '2',
    icon: <Icon name="people-outline" size={22} color="#43A047" />,
    title: 'Team Standup Meeting',
    desc: 'Daily sync with development team to discuss progress and blockers.',
    time: '11:00 - 11:30 AM',
    location: 'Meeting Room 2',
    color: '#E6F7D9',
    iconBg: '#C8E6C9',
  },
  {
    id: '3',
    icon: <Icon name="restaurant-outline" size={22} color="#8E24AA" />,
    title: 'Lunch & Learn Session',
    desc: 'Guest speaker on emerging technologies and industry trends.',
    time: '12:30 - 1:30 PM',
    location: 'Main Auditorium',
    color: '#F3E6FB',
    iconBg: '#E1BEE7',
  },
  {
    id: '4',
    icon: <Icon name="trending-up-outline" size={22} color="#FF9800" />,
    title: 'Quarterly Review',
    desc: 'Performance metrics analysis and goal setting for next quarter.',
    time: '11:00 - 11:30 AM',
    location: 'Meeting Room 2',
    color: '#FFF3E0',
    iconBg: '#FFE0B2',
  },
];

export default function Agenda() {
  const [selectedDay, setSelectedDay] = useState(0);

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

      {/* Month Selector */}
      <View style={styles.monthRow}>
        <TouchableOpacity>
          <Icon name="chevron-back-outline" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>September 2025</Text>
        <TouchableOpacity>
          <Icon name="chevron-forward-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Days Row */}
      <View  style={styles.daysScroll}>
        {days.map((d, idx) => (
          <TouchableOpacity
            key={d.label}
            style={[
              styles.dayBtn,
              d.active && styles.dayBtnActive,
              d.disabled && styles.dayBtnDisabled,
            ]}
            disabled={d.disabled}
            onPress={() => setSelectedDay(idx)}
          >
            <Text style={[styles.dayLabel, d.active && styles.dayLabelActive, d.disabled && styles.dayLabelDisabled]}>
              {d.label}
            </Text>
            <Text style={[styles.dayDate, d.active && styles.dayDateActive, d.disabled && styles.dayLabelDisabled]}>
              {d.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Date and Events Count */}
        <View style={styles.dateRow}>
          <Text style={styles.dateTitle}>Monday, Sep 08</Text>
          <Text style={styles.eventsCount}>6 events</Text>
        </View>

        {/* Agenda List */}
        {agendaData.map(item => (
          <View key={item.id} style={[styles.agendaCard, { backgroundColor: item.color }]}>
            <View style={[styles.agendaIconWrap, { backgroundColor: item.iconBg }]}>
              {item.icon}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.agendaTitle}>{item.title}</Text>
              <Text style={styles.agendaDesc}>{item.desc}</Text>
              <View style={styles.agendaInfoRow}>
                <Icon name="time-outline" size={15} color="#888" style={{ marginRight: 2 }} />
                <Text style={styles.agendaTime}>{item.time}</Text>
                <Icon name="location-outline" size={15} color="#888" style={{ marginLeft: 10, marginRight: 2 }} />
                <Text style={styles.agendaLocation}>{item.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar" size={24} color="#8DD22A" />
          <Text style={styles.navLabelActive}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="people" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>Speakers</Text>
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
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  monthTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  daysScroll: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  dayBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    minWidth: 48,
  },
  dayBtnActive: {
    backgroundColor: '#8DD22A',
  },
  dayBtnDisabled: {
    backgroundColor: '#F2F2F2',
    opacity: 0.5,
  },
  dayLabel: {
    color: '#888',
    fontSize: 13,
    fontWeight: 'bold',
  },
  dayLabelActive: {
    color: '#fff',
  },
  dayLabelDisabled: {
    color: '#bbb',
  },
  dayDate: {
    color: '#888',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dayDateActive: {
    color: '#fff',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  dateTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  eventsCount: {
    color: '#888',
    fontSize: 13,
  },
  agendaCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#F2F2F2',
  },
  agendaIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  agendaTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  agendaDesc: {
    color: '#888',
    fontSize: 13,
    marginBottom: 6,
  },
  agendaInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  agendaTime: {
    color: '#888',
    fontSize: 12,
    marginRight: 8,
  },
  agendaLocation: {
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