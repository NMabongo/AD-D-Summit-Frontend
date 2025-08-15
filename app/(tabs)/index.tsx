import en from "@/assets/translations/en.json";
import * as AuthSession from 'expo-auth-session';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



  const profileBackground = require('@/assets/images/WelcomeBackground-2.png')
const azureConfig = {
    clientId: 'YOUR_AZURE_CLIENT_ID', // From Junaid
    tenantId: 'YOUR_AZURE_TENANT_ID', // From Junaid
    redirectUri: AuthSession.makeRedirectUri({}),
    scopes: ['openid', 'profile', 'email', 'User.Read'],
    useNonce: true,
    usePKCE: true,
};

const serviceConfig = {
    authorizationEndpoint: `https://login.microsoftonline.com/${azureConfig.tenantId}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://login.microsoftonline.com/${azureConfig.tenantId}/oauth2/v2.0/token`,
};

export default function homeScreen(){
  // Auth state variables
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
          clientId: azureConfig.clientId,
          redirectUri: azureConfig.redirectUri,
          scopes: azureConfig.scopes,
          responseType: AuthSession.ResponseType.Token,
      }, serviceConfig);  

  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
          if (response?.type === 'success') {
              const { access_token } = response.params;
              fetchUserInfo(access_token);
          }
      }, [response]);
  
      const fetchUserInfo = async (token: string) => {
          setLoading(true);
          try {
              const res = await fetch('https://graph.microsoft.com/v1.0/me', {
                  headers: { Authorization: `Bearer ${token}` },
              });
              const data = await res.json();
              setUserInfo(data);
          } catch (e) {
              setUserInfo(null);
          }
          setLoading(false);
      };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={profileBackground}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={
          { flex: 1, justifyContent: 'center', alignItems: 'center' }
        } >
          <Text style={styles.title}>{en.africaConsulting}</Text>
          <Text style={styles.subtitle}>{en.welcomePage.subtitle}</Text>
          <View style={styles.card}>
            <Text style={styles.builtBy}>{en.welcomePage.builtBy}</Text>
            <Text style={styles.cardTitle}>{en.welcomePage.cardTitle}</Text>
            <Text style={styles.cardSubtitle}>{en.welcomePage.cardSubtitle}</Text>
            <View style={styles.divider} />
            <Text style={styles.hostedBy}>{en.welcomePage.hostedBy}</Text>
            <Text style={styles.cardSubtitle}>{en.welcomePage.cardSubtitlePractice}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={ () => promptAsync()}>
            <Text style={styles.buttonText}>{en.welcomePage.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerImage: {
    width: 220,
    height: 180,
    marginBottom: 32,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#181818',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    width: '100%',
    marginBottom: 40,
  },
  builtBy: {
    color: '#B6E23A',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  hostedBy: {
    color: '#B6E23A',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 13,
    textAlign: 'center',
  },
  divider: {
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#B6E23A',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 16,
    marginBottom: 32,
    width: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonHover: {
  backgroundColor: 'darkgreen',
},
  footerImage: {
    position: 'absolute',
    bottom: 0,
    width: '120%',
    height: 120,
    left: '-10%',
    opacity: 0.5,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});