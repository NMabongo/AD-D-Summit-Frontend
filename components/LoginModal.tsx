import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ErrorModal from './ErrorModal';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const clearData = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://localhost:7072/api/AppControllercs/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(email, password);
        clearData();
        router.push('/registration/registrationAttendanceConfirmation'); 
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
        setErrorVisible(true);
      }

      clearData();
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please check your connection.');
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    clearData();
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Login to your account</Text>

          <View style={styles.inputIconRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Email"
              placeholderTextColor="#bdbdbd"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (validateEmail(text)) {
                  setEmailError('');
                } else {
                  setEmailError('Invalid email format');
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Icon name="mail-outline" size={20} color="#bdbdbd" style={{ marginRight: 10 }} />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <View style={styles.inputIconRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              placeholderTextColor="#bdbdbd"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
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

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ErrorModal
        visible={errorVisible}
        title="Login Error"
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
      />
    </Modal>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#000',
  },
  inputIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
  },
  button: {
    backgroundColor: '#8DD22A',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#888',
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginLeft: 5,
  },
});
