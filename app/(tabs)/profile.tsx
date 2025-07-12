import en from '@/assets/translations/en.json';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const profileAvatar = require('@/assets/images/icon.png');

export default function Profile() {
  const [firstName, setFirstName] = useState('Bheki');
  const [lastName, setLastName] = useState('Ntshezi');
  const [email, setEmail] = useState('bntshezi@deloitte.com');
  const [region, setRegion] = useState('South Africa');
  const [password, setPassword] = useState('***********************');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={profileAvatar} style={styles.avatarImg} />
            <View style={styles.avatarCheck}>
              <Icon name="checkmark" size={28} color="#fff" />
            </View>
          </View>
          <Text style={styles.profileName}>Bheki Ntshezi</Text>
          <Text style={styles.profileSubtitle}>Update and save your profile</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Bheki"
                placeholderTextColor="#bdbdbd"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Ntshezi"
                placeholderTextColor="#bdbdbd"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputIconRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="bntshezi@deloitte.com"
                placeholderTextColor="#bdbdbd"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Icon name="mail-outline" size={20} color="#bdbdbd" style={{ marginRight: 10 }} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Region</Text>
            <View style={styles.inputIconRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="South Africa"
                placeholderTextColor="#bdbdbd"
                value={region}
                onChangeText={setRegion}
              />
              <Icon name="chevron-down-outline" size={22} color="#bdbdbd" style={{ marginRight: 10 }} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Create Password</Text>
            <View style={styles.inputIconRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="***********************"
                placeholderTextColor="#bdbdbd"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color="#bdbdbd"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/home1')}>
          <Icon name="home" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>{en.navigationOptions.home}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/agenda')}>
          <Icon name="calendar" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>{en.navigationOptions.agenda}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/featuredSpeakers')}>
          <Icon name="people" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>{en.navigationOptions.featuredSpeakers}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/mindful')}>
          <Icon name="cloud" size={24} color="#BDBDBD" />
          <Text style={styles.navLabel}>{en.navigationOptions.mindful}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}  onPress={() => router.push('/(tabs)/profile')}>
          <Icon name="person" size={24} color="#8DD22A" />
          <Text style={styles.navLabelActive}>{en.navigationOptions.profile}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 18,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#fff',
  },
  avatarCheck: {
    position: 'absolute',
    right: -8,
    bottom: 8,
    backgroundColor: '#8DD22A',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  profileName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  profileSubtitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 18,
    textAlign: 'center',
  },
  formContainer: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 15,
  },
  inputContainer: {
    marginVertical: 6,
  },
  inputContainerHalf: {
    flex: 1,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
    minHeight: 40,
  },
  inputIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#8DD22A',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
    width: 200,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
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
