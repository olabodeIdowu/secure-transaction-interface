import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../features/dashboardScreens/HomeScreen';
import BeneficiaryScreen from '../features/dashboardScreens/BeneficiaryScreen';
import TransactionScreen from '../features/dashboardScreens/TransactionScreen';
import SettingScreen from '../features/dashboardScreens/SettingScreen';
import FeedbackScreen from '../features/dashboardScreens/FeedbackScreen';

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function DashboardScreen() {
  return (
    // <NavigationContainer>

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            size = focused ? 28 : 24;
          } else if (route.name === 'Beneficiary') {
            iconName = 'account-circle-outline';
            size = focused ? 28 : 24;
          } else if (route.name === 'Transactions') {
            iconName = 'heart';
            size = focused ? 28 : 24;
          } else if (route.name === 'Feedback') {
            iconName = 'comment-multiple-outline';
            size = focused ? 28 : 24;
          } else if (route.name === 'Settings') {
            iconName = 'cog-outline';
            size = focused ? 28 : 24;
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            </View>
          );
        },
        header: () => null
      })}
      labeled={false}
      shifting={false}
      activeColor="#D9A525"
      inactiveColor="#C2B9A5"
      barStyle={{
        backgroundColor: '#111111',
        borderTopWidth: 0
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Beneficiary" component={BeneficiaryScreen} />
      <Tab.Screen name="Transactions" component={TransactionScreen} />

      <Tab.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{ tabBarBadge: true }}
      />

      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }
});
