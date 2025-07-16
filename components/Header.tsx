import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const deloitteLogo = require('@/assets/images/deloitteLogo.jpg');

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={deloitteLogo} style={styles.logo} />
      <Text style={styles.headerTitle}>Leadership Summit 2025</Text>
      <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
        <View>
          <Icon name="person" size={25} color="#BDBDBD" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

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
});
