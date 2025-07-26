import { Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const placeholderAvatar = require('@/assets/images/icon.png');

export default function SpeakerBio() {
  const {
    firstName,
    lastName,
    expertise,
    region,
    rating,
    talksGiven,
    yearsExperience,
    satisfaction,
    bio,
    imageUrl,
    fromHome,
  } = useLocalSearchParams();

  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const fromHomeBoolean = fromHome === 'true';

  const dropdownOptions = [
    {
      label: 'Contact Us',
      onPress: () => {
        setDropdownVisible(false);
        router.push('/(tabs)/contactUs');
      },
    },
    {
      label: 'Share',
      onPress: () => {
        setDropdownVisible(false);
        // To confirm
      },
    },
    {
      label: 'Subscribe',
      onPress: () => {
        setDropdownVisible(false);
        // To confirm
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() =>
            fromHomeBoolean
              ? router.push('/(tabs)/home')
              : router.push('/(tabs)/featuredSpeakers')
          }
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitleText}>Deloitte Partner Summit 2025</Text>

        <TouchableOpacity
          onPress={() => setDropdownVisible(true)}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          style={styles.dotsButton}
        >
          <Entypo name="dots-three-vertical" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={
              imageUrl
                ? { uri: `https://deloittesummitbe.azurewebsites.net${imageUrl}` }
                : placeholderAvatar
            }
            style={styles.avatar}
          />
          <View style={styles.checkCircle}>
            <MaterialIcons name="check" size={20} color="#fff" />
          </View>
        </View>
        <Text style={styles.name}>{firstName} {lastName}</Text>
        <Text style={styles.title}>{expertise}</Text>
        <View style={styles.locationRow}>
          <Entypo name="location-pin" size={18} color="#888" />
          <Text style={styles.locationText}>{region}</Text>
          <FontAwesome name="star" size={16} color="#FFD700" style={{ marginLeft: 12 }} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{talksGiven}</Text>
          <Text style={styles.statLabel}>Talks Given</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{yearsExperience}</Text>
          <Text style={styles.statLabel}>Years Exp</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{satisfaction}</Text>
          <Text style={styles.statLabel}>Satisfaction</Text>
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutHeader}>About</Text>
        <Text style={styles.aboutText}>{bio}</Text>
      </View>

   <Modal
        animationType="fade"
        transparent={true}
        visible={dropdownVisible}
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setDropdownVisible(false)}>
          <View style={styles.dropdownContainer}>
            {dropdownOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={option.onPress}
              >
                <Text style={styles.dropdownItemText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 3,
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  dotsButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 55,
    paddingRight: 10,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 5,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  profileSection: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  avatarWrapper: {
    borderWidth: 4,
    borderColor: "#7ed957",
    borderRadius: 60,
    padding: 4,
    position: "relative",
    marginBottom: 8,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  checkCircle: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#7ed957",
    borderRadius: 16,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginTop: 4,
  },
  title: {
    fontSize: 15,
    color: "#555",
    marginTop: 2,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 2,
  },
  ratingText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderRadius: 12,
    paddingVertical: 18,
    marginBottom: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  statLabel: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  aboutSection: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  aboutHeader: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
  },
  aboutText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    lineHeight: 20,
  },
});