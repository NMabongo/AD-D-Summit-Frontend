import en from '@/assets/translations/en.json';
import Header from "@/components/header";
import NavigationBar from "@/components/navigationBar";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SpeakerBio() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.avatar}
          />
          <View style={styles.checkCircle}>
            <MaterialIcons name="check" size={20} color="#fff" />
          </View>
        </View>
        <Text style={styles.name}>Bheki Ntshezi</Text>
        <Text style={styles.title}>Keynote Speaker & Tech Innovator</Text>
        <View style={styles.locationRow}>
          <Entypo name="location-pin" size={18} color="#888" />
          <Text style={styles.locationText}>South Africa</Text>
          <FontAwesome name="star" size={16} color="#FFD700" style={{ marginLeft: 12 }} />
          <Text style={styles.ratingText}>5.0</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>150+</Text>
          <Text style={styles.statLabel}>Talks Given</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Years Exp</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>Satisfaction</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutHeader}>About</Text>
        <Text style={styles.aboutText}>
          Lisa Wang is a renowned technology innovator and keynote speaker with over 12 years of experience in artificial intelligence and machine learning. She has delivered transformative presentations at major conferences worldwide.
        </Text>
        <Text style={styles.aboutText}>
          As the former Chief Technology Officer at TechVision Inc., she led groundbreaking projects that revolutionized how businesses approach digital transformation. Her expertise spans across AI, ethics, and leadership.
        </Text>
      </View>

      {/* Footer */}
      <NavigationBar name={en.navigationOptions.featuredSpeakers}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
    position: "relative",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  menuIcon: {
    position: "absolute",
    right: 20,
    top: 18,
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
  }  
});