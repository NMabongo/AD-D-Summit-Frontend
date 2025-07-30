import { useAuth } from '@/context/AuthContext';
import { getToken } from '@/utils/authToken';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LogoutConfirmModal from './LogoutConfirmModal';

interface HeaderWithMenuProps {
  resetSignal?: number;
  hideProfileIcon?: boolean;
  animatedStyle?: Animated.WithAnimatedValue<ViewStyle>;
}

const deloitteLogo = require('@/assets/images/deloitteLogo.jpg');
const defaultAvatar = require('@/assets/icons/profile-icon.png');

const HeaderWithMenu: React.FC<HeaderWithMenuProps> = ({
  resetSignal,
  hideProfileIcon,
  animatedStyle,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setMenuVisible(false);
    if (!isAuthenticated) {
      setAvatarUrl(null);
    }
  }, [isAuthenticated, resetSignal]);

  useFocusEffect(
    useCallback(() => {
      const fetchAvatar = async () => {
        try {
          const token = await getToken();
          if (!token) return;

          const response = await fetch(
            'https://deloittesummitbe.azurewebsites.net/api/User/getuserprofile',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            console.warn('Failed to fetch profile');
            return;
          }

          const data = await response.json();
          if (data?.profile?.avatarPath) {
            const fullImageUrl = `https://deloittesummitbe.azurewebsites.net${data.profile.avatarPath}`;
            setAvatarUrl(fullImageUrl);
          }
        } catch (err) {
          console.error('Error loading profile picture:', err);
        }
      };

      // fetchAvatar(); // Uncomment when ready to show avatar from API
    }, [isAuthenticated])
  );

  const handleLogout = async () => {
    await logout();
    setAvatarUrl(null);
    setLogoutModalVisible(false);
    router.replace('/');
  };

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <Image source={deloitteLogo} style={styles.logo} />
      {hideProfileIcon ? (
        <Text style={styles.headerTitleUser}>User Details</Text>
      ) : (
        <Text style={styles.headerTitle}>Leadership Summit 2025</Text>
      )}

      {!hideProfileIcon && (
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.avatarCircle}>
          <Image source={avatarUrl ? { uri: avatarUrl } : defaultAvatar} style={styles.avatarImg} />
        </TouchableOpacity>
      )}

      {menuVisible && (
        <View style={styles.dropdownMenu}>
          {/* View Profile disabled for now */}
          {false && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/(tabs)/profile');
              }}
            >
              <Text style={styles.menuText}>View Profile</Text>
            </TouchableOpacity>
          )}
          {isAuthenticated && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setLogoutModalVisible(true);
              }}
            >
              <Text style={styles.menuText}>Log Out</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <LogoutConfirmModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />
    </Animated.View>
  );
};

export default HeaderWithMenu;

const styles = StyleSheet.create({
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
  },
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
    zIndex: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  headerTitleUser: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    flex: 1,
    textAlign: 'center',
    paddingRight: 30,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    paddingLeft: 7,
    paddingRight: 7,
  },
  menuItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    color: '#333',
    fontSize: 14,
  },
});
