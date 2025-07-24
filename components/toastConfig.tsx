import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast, ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  info: (props) => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    borderLeftColor: 'green',
    borderLeftWidth: 5,
    backgroundColor: '#fff', 
  },
  content: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  text2: {
    fontSize: 10,
    color: '#555',
  },
});
