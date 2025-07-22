import en from '@/assets/translations/en.json';
import FeaturedSpeakersGrid from '@/components/featuredSpeakersGrid';
import HeaderWithMenu from '@/components/HeaderWithMenu';
import { Route, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationBar from '../../components/navigationBar';

const micBg = require('@/assets/images/mic-studio.jpg');

export default function FeaturedSpeakers() {
  const [menuResetKey, setMenuResetKey] = React.useState(0);
  const router = useRouter();

  const handleNavigationAndReset = (route: string) => {
    setMenuResetKey((prev) => prev + 1);
    router.push(route as Route);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.headerContainer}>
        <HeaderWithMenu resetSignal={menuResetKey} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.bannerContainer}>
          <Image source={micBg} style={styles.bannerImg} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Featured Speakers</Text>
          </View>
        </View>
        <FeaturedSpeakersGrid horizontal={false} fromHome={false} />
      </ScrollView>
      <NavigationBar
        name={en.navigationOptions.featuredSpeakers}
        onTabPress={handleNavigationAndReset}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1000,
    position: 'relative',
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
});