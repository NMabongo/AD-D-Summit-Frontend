import SummitBg from '@/assets/images/svg/homeBanner';
import FeaturedSpeakersGrid from '@/components/featuredSpeakersGrid';
import HeaderWithMenu from '@/components/HeaderWithMenu';
import NavigationBar from '@/components/navigationBar';
import useTimer from '@/components/useTimer';
import { AgendaItem } from '@/constants/AgendaItem';
import { Route, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { default as Icon, default as Ionicons } from 'react-native-vector-icons/Ionicons';

export default function Home() {
  const [menuResetKey, setMenuResetKey] = useState(0);
  const [agendaData, setAgendaData] = useState<AgendaItem[]>([]);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const router = useRouter();

  const nextEventTime = (agendaData: AgendaItem[]) => {
    if (agendaData.length === 0) return new Date().getTime() + 10000;
    return Math.min(...agendaData.map(event => new Date(event.startTime).getTime()));
  };

  const timer = useTimer(nextEventTime(agendaData));
  const handleNavigationAndReset = (route: string) => {
    setMenuResetKey((prev) => prev + 1);
    router.push(route as Route);
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
            const transformedDate = event.date.split('T')[0];
            return {
              id: event.id,
              icon: (
                  <Ionicons name="mic" size={20}  color= '#8DD22A' />
              ),
              title: event.title,
              desc: event.description,
              time: `${event.startTime} - ${event.endTime}`,
              startTime: `${event.date.split('T')[0]}T${event.startTime}`,
              endTime: `${event.date.split('T')[0]}T${event.endTime}`,
              location: event.location,
              date: new Date(transformedDate).toDateString(),
              category: event.category,
            };
          });
          setAgendaData(transformed);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      fetchEvents();
    }, [])
  );

  const days = useMemo(() => {
    const grouped: { [key: string]: AgendaItem[] } = {};
    agendaData.forEach((item) => {
      const dayKey = new Date(item.startTime).toDateString();
      if (!grouped[dayKey]) grouped[dayKey] = [];
      grouped[dayKey].push(item);
    });

    const sortedKeys = Object.keys(grouped).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return sortedKeys.map((key, index) => ({
      date: key,
      dayNumber: index + 1,
      dayName: new Date(key).toLocaleDateString("en-US", { weekday: "long" }),
      agendaItems: grouped[key],
    }));
  }, [agendaData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.headerContainer}>
        <HeaderWithMenu resetSignal={menuResetKey} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80, zIndex: 100 }}>
        {/* Hero */}
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

        {days.map((day, index) => (
          <View key={index}>
            <View style={styles.agendaHeaderRow}>
              <Text style={styles.agendaTitle}>
                Day {day.dayNumber} - Agenda
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/agenda',
                    params: { initialDate: day.date },
                  })
                }
              >
                <Text style={styles.fullSchedule}>Full Schedule</Text>
              </TouchableOpacity>
            </View>

            {day.agendaItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/agenda',
                    params: { initialDate: day.date },
                  })
                }
              >
                <View style={styles.agendaCard}>
                  <View style={styles.iconBox}>{item.icon}</View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.agendaSessionTitle}>{item.title}</Text>
                    <Text style={styles.agendaSessionDesc}>{item.desc}</Text>
                    <View style={styles.agendaSessionInfoRow}>
                      <Text style={styles.agendaSessionTime}>
                        {new Date(item.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                      <Text style={styles.agendaSessionLocation}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View>
          <View style={styles.agendaHeaderRow}>
            <Text style={styles.agendaTitle}>Featured Speakers</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/featuredSpeakers')}>
              <Text style={styles.fullSchedule}>View All</Text>
            </TouchableOpacity>
          </View>
          <FeaturedSpeakersGrid horizontal={true} fromHome={true} />
        </View>

      <View style={styles.quickActionsContainer}>
          <Text style={styles.contactTitle}>Contact Us</Text>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/(tabs)/contactUs')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="chatbubble" size={24} color="green" />
          </View>
          <View>
            <Text style={styles.cardTitle}>Contact us</Text>
            <Text style={styles.cardSubtitle}>Send us a message</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <NavigationBar name="Home" onTabPress={handleNavigationAndReset} />
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
  quickActionsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: '#E6F5D6',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
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
    contactTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    paddingBottom: 5,
  },
  agendaSubtext:{
    fontWeight: 'normal',
  },
  fullSchedule: {
    color: '#8DD22A',
    fontSize: 16,
    fontWeight: '400',
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
    height: 50,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 15,
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
    backgroundColor: '#F2F2F2',
    color: '#8DD22A',
    fontWeight: 'normal',
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