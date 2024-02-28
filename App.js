import "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./src/pages/LandingPage";
import LoginScreen from "./src/features/auth/LoginScreen";
import ForgotPinScreen from "./src/features/auth/ForgotPinScreen";
import ResetPinScreen from "./src/features/auth/ResetPinScreen";
import RegisterScreen from "./src/features/auth/RegisterScreen";
import UpdatePinScreen from "./src/features/auth/UpdatePinScreen";
import VerifyOTPScreen from "./src/features/auth/VerifyOTPScreen";
import DashboardScreen from "./src/pages/Dashboard";
import TransferScreen from "./src/ui/TransferScreen";
import HistoryScreen from "./src/ui/HistoryScreen";
import HistoriesScreen from "./src/ui/HistoriesScreen";
import AuthContextProvider from "./src/context/AuthProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => null,
          }}
        >
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPin" component={ForgotPinScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ResetPin" component={ResetPinScreen} />
          <Stack.Screen name="UpdatePin" component={UpdatePinScreen} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Transfer" component={TransferScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Histories" component={HistoriesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    // alignItems: 'center',
    // justifyContent: 'center'
  },
});
