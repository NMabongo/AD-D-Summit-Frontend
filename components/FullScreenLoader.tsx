import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const FullScreenLoader: React.FC = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#7EC60B" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullScreenLoader;
