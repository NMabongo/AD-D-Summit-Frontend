import { useAuth } from '@/context/AuthContext';
import { getToken } from '@/utils/authToken';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LogoutConfirmModal from './LogoutConfirmModal';

interface HeaderWithMenuProps {
  resetSignal?: number;
  hideProfileIcon?: boolean;
}

const deloitteLogo = require('@/assets/images/deloitteLogo.jpg');
const defaultAvatar = require('@/assets/icons/profile-icon.png');

const HeaderWithMenu: React.FC<HeaderWithMenuProps> = ({ resetSignal, hideProfileIcon }) => {
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

        const response = await fetch('https://localhost:7072/api/User/getuserprofile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.warn('Failed to fetch profile');
          return;
        }

        const data = await response.json();
        if (data?.profile?.avatarPath) {
          const fullImageUrl = `https://localhost:7072${data.profile.avatarPath}`;
          setAvatarUrl(fullImageUrl);
        }
      } catch (err) {
        console.error('Error loading profile picture:', err);
      }
    };

    if (isAuthenticated) {
      fetchAvatar();
    }
  }, [isAuthenticated])
);

  const handleLogout = async () => {
    await logout();
    setAvatarUrl(null);
    setLogoutModalVisible(false);
    router.replace('/');
  };

  return (
    <View style={styles.header}>
      <Image source={deloitteLogo} style={styles.logo} />
      {hideProfileIcon ? (
        <Text style={styles.headerTitleUser}>User Details</Text>
      ) : (
        <Text style={styles.headerTitle}>Leadership Summit 2025</Text>
      )}

      {!hideProfileIcon && (
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.avatarCircle}>
          <Image
            source={avatarUrl ? { uri: avatarUrl } : defaultAvatar}
            style={styles.avatarImg}
          />
        </TouchableOpacity>
      )}

      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push('/(tabs)/profile');
            }}
          >
            <Text style={styles.menuText}>View Profile</Text>
          </TouchableOpacity>

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
    </View>
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
  headerTitleUser:{
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelText: {
    color: '#888',
    fontSize: 16,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
