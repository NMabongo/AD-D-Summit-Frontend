import en from '@/assets/translations/en.json';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


interface NavigationBarProps {
  name: string; 
  onTabPress: (route: string) => void;
}
//This resets the dropdown when another tab is selected
const NavigationBar: React.FC<NavigationBarProps> = ({name, onTabPress}) => {
  const handleTabPress = (route: string) => {
    onTabPress(route);
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('../(tabs)/home')}>
        <Icon name="home" size={24} color={name===en.navigationOptions.home? "#8DD22A" : "#BDBDBD"} />
        <Text style={[name===en.navigationOptions.home? styles.navLabelActive : styles.navLabel]}>{en.navigationOptions.home}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}  onPress={() => handleTabPress('../(tabs)/agenda')}>
        <Icon name="calendar" size={24} color={name===en.navigationOptions.agenda? "#8DD22A" : "#BDBDBD"} />
        <Text style={[name===en.navigationOptions.agenda? styles.navLabelActive : styles.navLabel]}>{en.navigationOptions.agenda}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/featuredSpeakers')}>
        <Icon name="people" size={24} color={name===en.navigationOptions.featuredSpeakers? "#8DD22A" : "#BDBDBD"} />
        <Text style={[ name===en.navigationOptions.featuredSpeakers? styles.navLabelActive : styles.navLabel]}>{en.navigationOptions.featuredSpeakers}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/mindful')}>
        <Icon name="cloud" size={24} color={name===en.navigationOptions.mindful? "#8DD22A" : "#BDBDBD"} />
        <Text style={[ name===en.navigationOptions.mindful? styles.navLabelActive : styles.navLabel]}>{en.navigationOptions.mindful}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/profile')}>
        <Icon name="person" size={24} color={name===en.navigationOptions.profile? "#8DD22A" : "#BDBDBD"} />
        <Text style={[name===en.navigationOptions.profile? styles.navLabelActive : styles.navLabel]}>{en.navigationOptions.profile}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default NavigationBar;