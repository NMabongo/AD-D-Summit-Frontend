import en from '@/assets/translations/en.json';
import ErrorModal from '@/components/ErrorModal';
import HeaderWithMenu from '@/components/HeaderWithMenu';
import LoginModal from '@/components/LoginModal';
import { getToken } from '@/utils/authToken';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false)
  const[errorVisible, setErrorVisible] = useState(false);
  const[errorMessage, setErrorMessage] = useState('');
  const[errorModalTitle, setErrorModalTitle] = useState('');

  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const regions = [
    'North America',
    'EMEA (Europe, Middle East, Africa)',
    'Asia Pacific',
    'Latin America',
    'Africa',
    'Oceania',
  ];

  //need to fix this; deprecated version
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        setErrorModalTitle('Permission denied');
        setErrorMessage('We need access to your media library to select a profile picture.');
        setErrorVisible(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true, // Needed for  sending images over the web
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);

      if (Platform.OS === 'web' && asset.base64) {
        const base64Response = await fetch(`data:image/jpeg;base64,${asset.base64}`);
        const blob = await base64Response.blob();
        const file = new File([blob], asset.fileName || 'profile.jpg', {
          type: blob.type,
        });
        setSelectedImageFile(file);
      }
    }
  };

  const validatePassword = (text: string) => {
    const isValid = text.length >= 8 && /[A-Z]/.test(text) && /[0-9]/.test(text);
    if (!isValid) {
      setPasswordError(
        'Password must be at least 8 characters long, contain an uppercase letter, and a number'
      );
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const validateInput = () => {
    let isValid = true;

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!validatePassword(password)) {
      isValid = false;
    }

    return isValid;
  };

  const clearData = () => {
    setFirstName('');
    setLastName('');
    setEmail('mail@gmail.com');
    setRegion('');
    setPassword('');
  };

  const handleHomePress = () => {
    clearData();
    router.push('/(tabs)/home');
  };
  const handleAgendaPress = () => {
    clearData();
    router.push('/(tabs)/agenda');
  };
  const handleFeaturedSpeakersPress = () => {
    clearData();
    router.push('/(tabs)/featuredSpeakers');
  };
  const handleMindfulPress = () => {
    clearData();
    router.push('/(tabs)/mindful');
  };
  const handleProfilePress = () => {
    clearData();
    router.push('/(tabs)/profile');
  };


  const handleLoadProfile = async (authToken: string) => {
    try {
      const response = await fetch(
        `https://localhost:7072/api/User/getuserprofile?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.profile) {
        setFirstName(data.profile.firstName);
        setLastName(data.profile.lastName);
        setEmail(data.profile.email);
        setRegion(data.profile.region);
        setPassword(data.profile.password);
        // We need to load the image location (local/cloud)
        const fullImageUrl = `https://localhost:7072${data.profile.avatarPath}`;
        setSelectedImage(fullImageUrl);
      } else {
        console.error('Error', data.message || 'Failed to load profile.');
        setErrorModalTitle('Profile Error');
        setErrorMessage('User profile cannot be loaded');
        setErrorVisible(true);
      }
    } catch (error) {
        console.error('Error',error);
        setErrorModalTitle('Server Error');
        setErrorMessage('An unexpected error occurred.');
        setErrorVisible(true);
    }
  };

  const handleUpdateProfile = async () => {
    const isValid = validateInput();
    if (!isValid) return;

    try {
      setLoading(true);
      const token = await getToken();

      const formData = new FormData();
      formData.append('email', email);
      formData.append('lastName', lastName);
      formData.append('region', region);
      formData.append('password', password);

      if (Platform.OS === 'web' && selectedImageFile) {
        formData.append('profilePicture', selectedImageFile);
      } else if (selectedImage) {
        const uriParts = selectedImage.split('.');
        const fileType = uriParts[uriParts.length - 1].split('?')[0]; 
        formData.append('profilePicture', {
          uri: selectedImage,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }


      const response = await fetch('https://localhost:7072/api/User/updateprofile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      let data;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = null;
      }

      if (response.ok) {
        showAnimatedCheckmark();
      } else {
        const errorMsg = data?.message || response.statusText || 'Profile update failed.';
        console.error('Server responded with an error:', errorMsg);
        setErrorModalTitle('Profile Error');
        setErrorMessage(errorMsg);
        setErrorVisible(true);
      }
    } catch (error) {
      console.error('Request failed:', error);
      setErrorModalTitle('Server Error');
      setErrorMessage('An unexpected error occurred. Please try again.');
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const verifyAuthAndLoad = async () => {
        const token = await getToken();
        if (!token) {
          router.push('/(tabs)/home')
          setLoginModalVisible(true);
        } else {
          handleLoadProfile(token);
        }
      };

      verifyAuthAndLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );


  const showAnimatedCheckmark = () => {
    setShowCheckmark(true);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowCheckmark(false);
        });
      }, 2000);
    });
  };

  const profileAvatar = require('@/assets/images/icon.png');
  const profileBackground = require('@/assets/images/profilebackground.png')

  return (
    <ImageBackground
      source={profileBackground}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerContainer}>
          <HeaderWithMenu hideProfileIcon={true} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image
                  source={selectedImage ? { uri: selectedImage } : profileAvatar}
                  style={styles.avatarImg}
                />
                <TouchableOpacity style={styles.avatarOverlay} onPress={pickImage}>
                  <View style={styles.avatarCheck}>
                    <Icon name="camera-outline" size={26} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.profileName}>{`${firstName} ${lastName}`}</Text>
              <Text style={styles.profileSubtitle}>Update and save your profile</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Doe"
                  placeholderTextColor="#bdbdbd"
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    if (text.trim()) setLastNameError('');
                  }}
                />
                {lastNameError ? (
                  <Text style={styles.warningText}>⚠️ {lastNameError}</Text>
                ) : null}
              </View>
            </View>

            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputIconRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={email}
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Icon name="mail-outline" size={20} color="#bdbdbd" style={{ marginRight: 10 }} />
              </View>
            </View>

            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={styles.label}>Region</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setModalVisible(true)}
              >
                <Text style={region ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {region || 'Select your region'}
                </Text>
                <Icon name="chevron-down-outline" size={22} color="#bdbdbd" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, styles.textInputLong]}>
              <Text style={styles.label}>Create Password</Text>
              <View style={styles.inputIconRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter new password"
                  placeholderTextColor="#bdbdbd"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    validatePassword(text);
                  }}
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
              {passwordError ? (
                <Text style={styles.warningText}>⚠️ {passwordError}</Text>
              ) : (
                <Text style={styles.warningText}>⚠️ Do not use your Deloitte password</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateProfile}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={handleHomePress}>
            <Icon name="home" size={24} color="#BDBDBD" />
            <Text style={styles.navLabel}>{en.navigationOptions.home}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleAgendaPress}>
            <Icon name="calendar" size={24} color="#BDBDBD" />
            <Text style={styles.navLabel}>{en.navigationOptions.agenda}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleFeaturedSpeakersPress}>
            <Icon name="people" size={24} color="#BDBDBD" />
            <Text style={styles.navLabel}>{en.navigationOptions.featuredSpeakers}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleMindfulPress}>
            <Icon name="cloud" size={24} color="#BDBDBD" />
            <Text style={styles.navLabel}>{en.navigationOptions.mindful}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleProfilePress}>
            <Icon name="person" size={24} color="#8DD22A" />
            <Text style={styles.navLabelActive}>{en.navigationOptions.profile}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={regions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.regionOption}
                    onPress={() => {
                      setRegion(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.regionOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </TouchableOpacity>
        </Modal>
        {showCheckmark && (
          <Animated.View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [
                { translateX: -40 },
                { translateY: -40 },
                { scale: scaleAnim },
              ],
              width: 80,
              height: 80,
              backgroundColor: '#8DD22A',
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              elevation: 10,
            }}
          >
            <Icon name="checkmark" size={42} color="#fff" />
          </Animated.View>
        )}
        <LoginModal
          visible={loginModalVisible}
          onClose={() => setLoginModalVisible(false)}
          onLogin={() => {
            setLoginModalVisible(false);
          }}
          onRegister={() => {
            setLoginModalVisible(true);
          }}
        />
        <ErrorModal
            visible={errorVisible}
            title={errorModalTitle}
            message={errorMessage}
            // eslint-disable-next-line no-unused-expressions
            onClose={() => {setErrorVisible(false), router.push('/(tabs)/home')}}
          />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1000,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 18,
    padding: 24,
    width: '92%',
    marginTop: 0,
    marginBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  overlayText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 15,
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 10,
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
  label: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#222',
    borderWidth: 0,
    marginBottom: 0,
  },
  textInputLong: {
    width: '100%',
  },
  inputIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingRight: 0,
  },
  warningText: {
    color: '#FFD600',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#8DD22A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
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
  footerText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  contactText: {
    color: '#8DD22A',
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 12,
  },
  secondaryButton: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginHorizontal: 6,
    backgroundColor: '#111',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    minHeight: 44,
  },
  dropdownText: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: '#bdbdbd',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: '50%',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  regionOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  regionOptionText: {
    fontSize: 16,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
