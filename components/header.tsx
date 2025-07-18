import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const deloitteLogo = require('@/assets/images/deloitte-logo.png');
const avatarIcon = require('@/assets/images/portrait-female.jpg');

const Header = () => (
  <View style={styles.header}>
    <Image source={deloitteLogo} style={styles.logo} />
    <Text style={styles.headerTitle}>Leadership Summit 2025</Text>
    <TouchableOpacity>
      <View style={styles.avatarCircle}>
        <Image source={avatarIcon} style={styles.avatarImg} />
      </View>
    </TouchableOpacity>
  </View>
);

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
    borderRadius: '18%',
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
  }
});

export default Header;