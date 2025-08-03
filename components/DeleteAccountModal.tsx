import { getToken } from '@/utils/authToken';
import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';


interface DeleteAccountModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onFail: (message: string) => void; 
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  onFail,
}) => {

  const [step, setStep] = useState<'confirm' | 'verify'>('confirm');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInitialConfirm = () => {
    setStep('verify');
  };

  const handleFinalConfirm = async () => {
    const token = await getToken();

    setLoading(true);
    try {
      const res = await fetch(
        `https://deloittesummitbe.azurewebsites.net/api/User/getuserprofile?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (res.ok && data.profile?.password) {
        const storedPassword = data.profile.password;
        if (storedPassword === password) {
          onConfirm();
        } else {
          onFail?.('Incorrect password');
          onCancel();
        }
      } else {
        onFail?.('Failed to verify password');
         onCancel();
      }
    } catch (error) {
      console.error('Password check failed:', error);
      onFail?.('Server error occurred');
    } finally {
      setLoading(false);
      setPassword('');
      setStep('confirm');
    }
  };

  const handleCancel = () => {
    onCancel();
    setPassword('');
    setStep('confirm');
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Delete Account</Text>

          {step === 'confirm' ? (
            <>
              <Text style={styles.message}>
                Are you sure you want to permanently delete your account?
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleInitialConfirm}
                >
                  <Text style={styles.confirmButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.message}>Please re-enter your password to confirm:</Text>
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    { opacity: password ? 1 : 0.5 },
                  ]}
                  onPress={handleFinalConfirm}
                  disabled={!password || loading}
                >
                  <Text style={styles.confirmButtonText}>
                    {loading ? 'Validating...' : 'Confirm'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  paddingHorizontal: 12,
  paddingVertical: 8,
  width: '100%',
  marginBottom: 16,
  fontSize: 16,
},
error: {
  color: '#D22A2A',
  marginBottom: 10,
  textAlign: 'center',
  fontSize: 14,
},
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#222',
  },
  message: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    color: '#444',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 70,
    paddingTop: 4,
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#444',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#D22A2A', // red for destructive action
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
