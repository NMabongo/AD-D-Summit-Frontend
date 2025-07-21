import en from '@/assets/translations/en.json';
import ErrorModal from '@/components/ErrorModal';
import HeaderWithMenu from '@/components/HeaderWithMenu';
import NavigationBar from '@/components/navigationBar';
import { useFocusEffect } from '@react-navigation/native';
import { Route, router, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function Agenda() {
  
  const {initialDate} = useLocalSearchParams();
  const [agendaData, setAgendaData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [days, setDays] = useState<any[]>([]);
  const [menuResetKey, setMenuResetKey] = useState(0);

  const[errorVisible, setErrorVisible] = useState(false);
  const[errorMessage, setErrorMessage] = useState('');
  const[errorModalTitle, setErrorModalTitle] = useState('');  

  const handleNavigationAndReset = (route: string) => {
    setMenuResetKey((prev) => prev + 1); 
    useRouter().push(route as Route); 
  };

  const [months, setMonths] = useState<string[]>([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const getMonthKey = (dateString: string): string | null => {
  if (!dateString) return null;
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return null;

  return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
};

const extractUniqueMonths = (events: any[]): string[] => {
  const monthKeys = events
    .map((e) => getMonthKey(e.date))
    .filter((val): val is string => val !== null);

  return Array.from(new Set(monthKeys)).sort();
};

  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch('https://localhost:7072/api/Event', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const events = await response.json();

          const transformed = events.map((event: any) => {
            let color = '#E4FBE9';
            let iconBg = '#C2F0D0';
            let iconColor = '#1E9D4C';
            let iconSource;

            switch (event.category?.toLowerCase()) {
              case 'meeting':
                iconSource = require('@/assets/icons/standup.png');
                break;
              case 'presentation':
                iconSource = require('@/assets/icons/presentation.png');
                color = '#F3E9FE';
                iconBg = '#D8BDFB';
                iconColor = '#9B3BEB';
                break;
              case 'boardroom':
                iconSource = require('@/assets/icons/chart.png');
                color = '#FFF1E0';
                iconBg = '#FFD8AE';
                iconColor = '#F15C00';
                break;
              case 'workshop':
                iconSource = require('@/assets/icons/workshop.png');
                color = '#E3EAFE';
                iconBg = '#C5CAE9';
                iconColor = '#1A237E';
                break;
              case 'review':
                iconSource = require('@/assets/icons/chart.png');
                color = '#FEEBEB';
                iconBg = '#FFCDD2';
                iconColor = '#E53935';
                break;
              case 'seminar':
                iconSource = require('@/assets/icons/seminar.png');
                iconColor = '#E3F4FD';
                iconBg = '#B3E5FC';
                color = '#E8F3FD';
                break;
              default:
                iconSource = require('@/assets/icons/default.png');
            }

            return {
              id: event.id,
              icon: (
                <Image
                  source={iconSource}
                  style={{ width: 22, height: 22, resizeMode: 'contain' }}
                />
              ),
              title: event.title,
              desc: event.description,
              time: `${event.startTime} - ${event.endTime}`,
              location: event.location,
              color,
              iconBg,
              iconColor,
              date: event.date,
              category: event.category,
            };
          });

          setAgendaData(transformed);

          const uniqueMonths = extractUniqueMonths(events);
          setMonths(uniqueMonths);
          setCurrentMonthIndex(0);
        } catch (error) {
          console.error('Error fetching events:', error);
          setErrorModalTitle('Loading Error');
          setErrorMessage('Agenda data cannot be loaded at this time');
          setErrorVisible(true);
        }
      };

      fetchEvents();
    }, [])
  );

  useEffect(() => {
    if (months.length === 0 || agendaData.length === 0) return;

    const currentMonth = months[currentMonthIndex];
    const newDays = generateDaysForMonth(currentMonth, agendaData);

    setDays(newDays);
    if (newDays.length > 0) {
      initialDate? setSelectedDate(new Date(initialDate as string).toLocaleDateString('en-US')) :
      setSelectedDate(newDays[0].date);
    }
  }, [currentMonthIndex, months, agendaData]);

  const generateDaysForMonth = (month: string, data: typeof agendaData) => {
    const uniqueDates = Array.from(
      new Set(
        data
          .filter((item) => item.date.startsWith(month))
          .map((item) => item.date)
      )
    );
 
    return uniqueDates.map((dateStr, index) => {
      const dateObj = new Date(dateStr);
      const options = { weekday: 'short' } as const;

      return {
        label: dateObj.toLocaleDateString('en-US', options),
        date: dateStr,
        active: index === 0,
        disabled: false,
      };
    });
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.headerContainer}>
        <HeaderWithMenu resetSignal={menuResetKey} />
      </View>

      <View style={styles.monthRow}>
        <TouchableOpacity
          disabled={currentMonthIndex === 0}
          onPress={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
        >
          <Icon name="chevron-back-outline" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {months.length > 0 &&
            new Date(months[currentMonthIndex] + '-01').toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
        </Text>
        <TouchableOpacity
          disabled={currentMonthIndex === months.length - 1}
          onPress={() =>
            setCurrentMonthIndex((prev) => Math.min(months.length - 1, prev + 1))
          }
        >
          <Icon name="chevron-forward-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysScroll}>
        {days.map((d) => (
          <TouchableOpacity
            key={d.date}
            style={[
              styles.dayBtn,
              new Date(d.date).toLocaleDateString().startsWith(new Date(String(selectedDate)).toLocaleDateString()) && styles.dayBtnActive,
              d.disabled && styles.dayBtnDisabled,
            ]}
            disabled={d.disabled}
            onPress={() => setSelectedDate(d.date)}
          >
            <Text style={[styles.dayLabel, new Date(d.date).toLocaleDateString().startsWith(new Date(String(selectedDate)).toLocaleDateString()) && styles.dayLabelActive]}>
              {d.label}
            </Text>
            <Text style={[styles.dayDate, new Date(d.date).toLocaleDateString().startsWith(new Date(String(selectedDate)).toLocaleDateString()) && styles.dayDateActive]}>
              {new Date(d.date).getDate().toString().padStart(2, '0')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.dateRow}>
          <Text style={styles.dateTitle}>
            {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.eventsCount}>
            {agendaData.filter(item => item.date === selectedDate).length} events
          </Text>
        </View>
        {/* {agendaData.filter(item => item.date === selectedDate).map(item => ( */}
        {agendaData.filter(item => new Date(item.date).toLocaleDateString().startsWith(new Date(String(selectedDate)).toLocaleDateString())).map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push({
                pathname: '/(tabs)/breakoutRoom',
                params: { breakoutroomId: item.id },
              })}
            >
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
            </TouchableOpacity>
        ))}
      </ScrollView>

        <NavigationBar name={en.navigationOptions.agenda}
          onTabPress={handleNavigationAndReset} 
        />
        <ErrorModal
          visible={errorVisible}
          title={errorModalTitle}
          message={errorMessage}
          // eslint-disable-next-line no-unused-expressions
          onClose={() => {setErrorVisible(false)}}
        />
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
    paddingTop: 15,
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