import en from '@/assets/translations/en.json';
import HeaderWithMenu from '@/components/HeaderWithMenu';
import { Route, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const avatarIcon = require('@/assets/images/icon.png');

export default function Agenda() {
  const [agendaData, setAgendaData] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [menuResetKey, setMenuResetKey] = useState(0);

  const days = [
    { label: 'Mon', date: '08', active: true, disabled: false },
    { label: 'Tue', date: '09', active: false, disabled: false },
    { label: 'Wed', date: '10', active: false, disabled: false },
  ];

  const handleTabPress = (route: string) => {
    setMenuResetKey((prev) => prev + 1);
    router.push(route as Route);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://localhost:7072/api/Event', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const events = await response.json();

        const transformed = events.map((event: {
          id: number;
          title: string;
          description: string;
          startTime: string;
          endTime: string;
          location: string;
          date: string;
          category: string;
        }) => ({
          id: event.id,
          icon: <Icon name="calendar-outline" size={22} color="#4FC3F7" />,
          title: event.title,
          desc: event.description,
          time: `${event.startTime} - ${event.endTime}`,
          location: event.location,
          color: '#E3F4FD',
          iconBg: '#B3E5FC',
          date: event.date,
          category: event.category,
        }));

        setAgendaData(transformed);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <HeaderWithMenu resetSignal={menuResetKey} />
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
      <View style={styles.daysScroll}>
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
            <Text style={[
              styles.dayLabel,
              d.active && styles.dayLabelActive,
              d.disabled && styles.dayLabelDisabled
            ]}>
              {d.label}
            </Text>
            <Text style={[
              styles.dayDate,
              d.active && styles.dayDateActive,
              d.disabled && styles.dayLabelDisabled
            ]}>
              {d.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Date and Events Count */}
        <View style={styles.dateRow}>
          <Text style={styles.dateTitle}>Monday, Sep 08</Text>
          <Text style={styles.eventsCount}>{agendaData.length} events</Text>
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
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/home1')}>
          <Icon name="home" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>{en.navigationOptions.home}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/agenda')}>
          <Icon name="calendar" size={24} color="#8DD22A" />
          <Text style={styles.navLabelActive}>{en.navigationOptions.agenda}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/featuredSpeakers')}>
          <Icon name="people" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>{en.navigationOptions.featuredSpeakers}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/mindful')}>
          <Icon name="cloud" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>{en.navigationOptions.mindful}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/profile')}>
          <Icon name="person" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>{en.navigationOptions.profile}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1000,
    position: 'relative',
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