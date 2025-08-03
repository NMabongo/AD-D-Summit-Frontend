import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

const ContactSupport: React.FC = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={[styles.footerText, { marginTop: 20 }]}>
                Having problems?{' '}
            </Text>
            <Text style={styles.footerText}>
                {'  Email:  '}
                <Text
                    style={styles.contactText}
                    onPress={() =>
                        Linking.openURL(
                            'mailto:nhngcobo@deloitte.co.za?subject=AD-D-Summit Registration Issue'
                        )
                    }
                >
                    nhngcobo@deloitte.co.za
                </Text>
            </Text>
            <Text style={styles.footerText}>{'  OR:  '}</Text>
            <Text
                style={styles.contactText}
                onPress={() => {
                    router.push({ pathname: '/contactUs' });
                }}
            >
                Contact us
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 16,
        width: '100%',
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
});

export default ContactSupport;