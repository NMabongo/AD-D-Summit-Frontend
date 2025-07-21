import SummitBg from '@/assets/images/svg/homeBanner';
import en from '@/assets/translations/en.json';
import FeaturedSpeakersGrid from '@/components/featuredSpeakersGrid';
import HeaderWithMenu from '@/components/HeaderWithMenu';
import NavigationBar from '@/components/navigationBar';
import useTimer from '@/components/useTimer';
import { Route, router, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const testAgendaData = [
  {
    id: '1',
    icon: <Icon name="rocket-outline" size={22} color="#4FC3F7" />,
    title: 'Product Launch Presentation',
    desc: 'Q4 product roadmap and feature announcements for the upcoming release cycle.',
    startTime: '2025-09-08T09:00:00',
    endTime: '2025-09-08T13:00:00',
    location: 'Conference Room A',
    color: '#E3F4FD',
    iconBg: '#B3E5FC',
  },
  {
    id: '2',
    icon: <Icon name="people-outline" size={22} color="#43A047" />,
    title: 'Team Standup Meeting',
    desc: 'Daily sync with development team to discuss progress and blockers.',
    startTime: '2025-09-09T09:00:00',
    endTime: '2025-09-09T13:00:00',
    location: 'Meeting Room 2',
    color: '#E6F7D9',
    iconBg: '#C8E6C9',
  },
  {
    id: '3',
    icon: <Icon name="restaurant-outline" size={22} color="#8E24AA" />,
    title: 'Lunch & Learn Session',
    desc: 'Guest speaker on emerging technologies and industry trends.',
    startTime: '2025-09-10T09:00:00',
    endTime: '2025-09-10T13:00:00',
    location: 'Main Auditorium',
    color: '#F3E6FB',
    iconBg: '#E1BEE7',
  },
  {
    id: '4',
    icon: <Icon name="trending-up-outline" size={22} color="#FF9800" />,
    title: 'Quarterly Review',
    desc: 'Performance metrics analysis and goal setting for next quarter.',
    startTime: '2025-09-08T09:00:00',
    endTime: '2025-09-11T13:00:00',
    location: 'Meeting Room 2',
    color: '#FFF3E0',
    iconBg: '#FFE0B2',
  },
];

const eventDays = [
  {
    Date: '2025-09-08T00:00:00',
    DayNumber: 1,
    DayName: 'Monday',
  },
  {
    Date: '2025-09-09T00:00:00',
    DayNumber: 2,
    DayName: 'Tuesday',
  }, 
  {
    Date: '2025-09-10T00:00:00',
    DayNumber: 3,
    DayName: 'Wednesday',
  },
]

export default function Home() {
  const [menuResetKey, setMenuResetKey] = React.useState(0);
  const [agendaData, setAgendaData] = React.useState([testAgendaData]);

  const nextEventTime =  (agendaData: any[]) => {
    let localNextEventTime = new Date('2026-09-08T13:00:00').getTime();
  agendaData.forEach(event => {
    localNextEventTime = Math.min(localNextEventTime, new Date (event.startTime).getTime());
  });
  return localNextEventTime;
}
  const timer = useTimer(nextEventTime(agendaData));
  const handleNavigationAndReset = (route: string) => {
    setMenuResetKey((prev) => prev + 1); 
    useRouter().push(route as Route); 
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
            
            const transformedDate = event.date.split('T')[0];
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

            // @ts-ignore
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
              startTime: event.date.split('T')[0]+'T'+event.startTime,
              endTime: event.date.split('T')[0]+'T'+event.endTime,
              location: event.location,
              color,
              iconBg,
              iconColor,
              date: new Date(transformedDate).toDateString() ,
              category: event.category,
            };
          });
          console.log('Fetched and transformed events:', transformed);
          setAgendaData(transformed);

        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };

      fetchEvents();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <HeaderWithMenu resetSignal={menuResetKey}/>
      </View>

      
      <ScrollView contentContainerStyle={{ paddingBottom: 80, zIndex: 100 }}>
        {/* Banner Section */}
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
            <Icon name="time-sharp" size={20} color="#fff" />
          </View>
          <View style={styles.countdownRow}>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>{timer.days}</Text>
              <Text style={styles.countdownLabel}>Days</Text>
            </View>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>{timer.hours}</Text>
              <Text style={styles.countdownLabel}>Hours</Text>
            </View>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>{timer.minutes}</Text>
              <Text style={styles.countdownLabel}>Minutes</Text>
            </View>
            <View style={styles.countdownItem}>
              <Text style={styles.countdownNumber}>{timer.seconds}</Text>
              <Text style={styles.countdownLabel}>Seconds</Text>
            </View>
          </View>
        </View>

        {eventDays.map((day, index) => (
          <View>
            <View key={index} style={styles.agendaHeaderRow}>
              <Text style={styles.agendaTitle}>Day {day.DayNumber} - {day.DayName}</Text>
              <TouchableOpacity onPress={() => router.push({
                              pathname: '/(tabs)/agenda',
                              params: { initialDate: day.Date },
                            })}>
                <Text style={styles.fullSchedule}>Full Schedule</Text>
              </TouchableOpacity>
            </View>
            {agendaData.map(item => (
              (new Date(item.startTime).toLocaleDateString().startsWith(new Date(day.Date).toLocaleDateString())))? (
                <TouchableOpacity onPress={() => router.push({
                                pathname: '/(tabs)/breakoutRoom',
                                params: { breakoutroomId: item.id,
                                  fromHome: true,
                                 },
                              })}>
                <View style={styles.agendaCard}>
                  <View style={styles.iconBox}>
                    <Icon name="mic" color='#8DD22A' size={24} style={styles.agendaIcon} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.agendaSessionTitle}>{item.title}</Text>
                    <Text style={styles.agendaSessionDesc}>{item.desc}</Text>
                    <View style={styles.agendaSessionInfoRow}>
                      <Text style={styles.agendaSessionTime}>{new Date(item.startTime).getHours().toLocaleString('en-Us', {minimumIntegerDigits: 2}) + ':' + new Date(item.startTime).getMinutes().toLocaleString('en-Us', {minimumIntegerDigits: 2})}</Text>
                      <Text style={styles.agendaSessionLocation}>{item.location}</Text>
                    </View>
                  </View>
                </View>
            </TouchableOpacity>
            ) : null)}
          </View>
          ))}
          
      <View>
        <View style={styles.agendaHeaderRow}>
              <Text style={styles.agendaTitle}>Featured Speakers</Text>
              <TouchableOpacity onPress={() => router.push({
                              pathname: '/(tabs)/featuredSpeakers',
                            })}>
                <Text style={styles.fullSchedule}>View All</Text>
              </TouchableOpacity>
            </View>
        <FeaturedSpeakersGrid horizontal={true} fromHome={true}/>
      </View>
      </ScrollView>
      {/* Footer Navigation Bar */}
      <NavigationBar name={en.navigationOptions.home}  
          onTabPress={handleNavigationAndReset} 
         />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   headerContainer:{
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
  },
  heroContainer: {
    zIndex: -1,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBg: {
    width: '100%',
    height: 200,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
    //backgroundColor: 'linear-gradient(90deg, #FF9800 0%, #FF5722 100%)', 
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
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  iconBox: {
    width: 32,
    height: 40,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    marginRight: 12,
  },
  agendaIcon: {
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
  }
});