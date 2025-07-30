import en from '@/assets/translations/en.json';
import HeaderWithMenu from '@/components/HeaderWithMenu';
import NavigationBar from '@/components/navigationBar';
import { Route, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const mindfulBanner = require('@/assets/images/yoga.jpg');

export default function Mindful() {
    const [menuResetKey, setMenuResetKey] = useState(0);
    const [mindfulnessActivities, setMindfulnessActivities] = useState<any[]>([]);

    useFocusEffect(
          useCallback(() => {
            const fetchEvents = async () => {
              try {
                const response = await fetch('https://deloittesummitbe.azurewebsites.net/mindfulness/getAll', {
                  method: 'GET', 
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
      
                const mindfulnessActivities = await response.json();
                if (!Array.isArray(mindfulnessActivities.mindfulnessAcitivity)) {
                  throw new Error('Invalid data format');
                }
                // Update state with the fetched mindfulness activities 
                 const transformedActivities = mindfulnessActivities.mindfulnessAcitivity.map((activity: any) => {
                            return {
                              id: activity.id,
                              title: activity.title,
                              description: activity.description,
                              time: activity.startTime,
                              startTime: `${activity.date.split('T')[0]}T${activity.startTime}`,
                              endTime: `${activity.date.split('T')[0]}T${activity.endTime}`,
                              location: activity.location,
                              date: activity.date,
                            };
                          });
                setMindfulnessActivities(transformedActivities);
                
      
              } catch (error) {
                console.error('Error fetching events:', error);
              }
            };
      
            fetchEvents();
          }, [])
        );
    const handleNavigationAndReset = (route: string) => {
      setMenuResetKey((prev) => prev + 1); 
      useRouter().push(route as Route); 
    };

    const diffMs = (startTime: string, endTime: string) => {
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();
      return end - start;
    }

    const hourDifference = (startTime: string, endTime: string) => {
      const diff = diffMs(startTime, endTime);  
      const hours = Math.floor(diff / (1000 * 60 * 60));
      return hours;
    }

    const minuteDifference = (startTime: string, endTime: string) => {
      const diff = diffMs(startTime, endTime);  
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return minutes;
    }

    const days = useMemo(() => {
        const grouped: { [key: string]: any[] } = {};
        mindfulnessActivities.forEach((item) => {
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
          mindfulnessActivities: grouped[key],
        }));
      }, [mindfulnessActivities]);
    

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>      
      <View style={styles.headerContainer}>
        <HeaderWithMenu resetSignal={menuResetKey}/>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.bannerContainer}>
          <Image source={mindfulBanner} style={styles.bannerImg} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Mindfulness</Text>
          </View>
        </View>
        
        {days.map((day, index) => {
          const isPastDate = new Date(day.date).getTime() <= new Date().getTime();

          if (isPastDate) return null;

          return (
            <View key={index}>
              <View style={styles.activityHeaderRow}>
                <Text style={styles.activityTitle}>
                  Day {day.dayNumber} - Activities
                </Text>
              </View>

              {day.mindfulnessActivities.map((session) => (
                <View key={session.id} style={styles.sessionCard}>
                  <Text style={styles.sessionTitle}>{session.title}</Text>
                  <Text style={styles.sessionDescription}>{session.description}</Text>
                  <View style={styles.sessionFooter}>
                    <Icon name="time-outline" size={18} color="#888" />
                    <Text style={styles.sessionDuration}>
                      {hourDifference(session.startTime, session.endTime) + 'h' + minuteDifference(session.startTime, session.endTime)}
                    </Text>
                    <Icon name="time-outline" size={15} color="#888" style={{ marginRight: 2 }} />
                    <Text style={styles.sessionDuration}>{session.time}</Text>
                    <Icon name="location-outline" size={15} color="#888" style={{ marginLeft: 10, marginRight: 2 }} />
                    <Text style={styles.sessionDuration}>{session.location}</Text>
                  </View>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>

      <NavigationBar name={en.navigationOptions.mindful} 
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
    container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  sessionTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
    marginBottom: 6,
  },
  sessionDescription: {
    color: '#444',
    fontSize: 15,
    marginBottom: 12,
  },
  sessionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionDuration: {
    color: '#888',
    fontSize: 14,
    marginLeft: 6,
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#8DD22A',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginLeft: 12,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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
  activityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
  }
});
