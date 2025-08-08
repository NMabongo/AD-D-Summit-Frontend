import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SummitFAQCard() {
  return (
    <View style={styles.card}>

      <Text style={styles.sectionTitle}>🎯 Who can attend?</Text>
      <Text style={styles.bodyText}>• Partners, Senior ADs, and ADs of Africa Consulting Services.</Text>

      <Text style={styles.sectionTitle}>📅 Dates & Times</Text>
      <Text style={styles.bodyText}>• Start: 2:00 PM, Mon 8 Sep 2025</Text>
      <Text style={styles.bodyText}>• End: 10:00 AM, Wed 10 Sep 2025 (after check-out)</Text>
      <Text style={styles.bodyText}>
        • Partners join the Deloitte Africa Leadership (DALS) Summit from 10–12 Sep 2025.
      </Text>

      <Text style={styles.sectionTitle}>📍 Location</Text>
      <Text style={styles.bodyText}>• Kieveets Kroon, Pretoria.</Text>

      <Text style={styles.sectionTitle}>🗂 Agenda</Text>
      <Text style={styles.bodyText}>
        • The detailed agenda will be shared on this app a few days before the summit.
      </Text>

      <Text style={styles.sectionTitle}>🚐 Transport</Text>
      <Text style={styles.bodyText}>• To venue: Shuttle departs Deloitte Waterfall Office ~12:00 PM, Mon 8 Sep.</Text>
      <Text style={styles.bodyText}>• Return: Shuttle leaves Kieveets Kroon at 10:00 AM, Wed 10 Sep.</Text>

      <Text style={styles.sectionTitle}>🛏 Accommodation</Text>
      <Text style={styles.bodyText}>
        • Overnight stay is recommended — evening events run late, and you don’t want to miss the late-night stories!
      </Text>
      <Text style={styles.bodyText}>
        • Limited rooms available — you’ll share with a roommate of your choice.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
});
