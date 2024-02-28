import { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Drawer from "../../pages/Drawer";
import { AuthContext } from "../../context/AuthProvider";
import { formatCur } from "../../utils/helpers";

export default function HomeScreen({ navigation }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { auth } = useContext(AuthContext);
  const { user } = auth;
  // console.log(user, user?.movements, user?.history);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => setOpenDrawer(true)}>
            <MaterialCommunityIcons name="menu" size={24} color="#888" />
          </TouchableOpacity>
          <Text style={styles.navText}>Dashboard</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="bell" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialCommunityIcons name="camera" size={42} color="#888" />
            <View>
              <Text style={{ color: "#ffffff", fontSize: 16 }}>
                Hello, {user?.firstName} {user?.lastName}
              </Text>
              {user?.loggedOutAt && (
                <Text style={{ color: "#888", fontSize: 12, paddingTop: 5 }}>
                  Last Login{" "}
                  {new Date(user.loggedOutAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: "true",
                  })}
                </Text>
              )}
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ color: "#ffffff", fontSize: 16 }}>HISTORY</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Histories", {
                  movements: user?.movements,
                  history: user?.history,
                })
              }
            >
              <MaterialCommunityIcons name="calendar" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: "90%",
            backgroundColor: "#F8B930",
            padding: 15,
            marginLeft: "auto",
            marginRight: "auto",
            color: "#ffffff",
            borderRadius: 8,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#222", fontSize: 16, padding: 2 }}>
            ACCOUNT #{user?.accountNumber}
          </Text>
          <Text style={{ color: "#000000", fontSize: 22 }}>
            {formatCur(user?.balance, "en-US", "NGN")}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
            onPress={() =>
              navigation.navigate("Transfer", { userId: user?._id })
            }
          >
            <MaterialCommunityIcons name="transfer" size={32} color="#888" />
            <Text style={{ color: "#ffffff", fontSize: 16, padding: 2 }}>
              Transfer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <MaterialCommunityIcons name="cash" size={32} color="#888" />
            <Text style={{ color: "#ffffff", fontSize: 16, padding: 2 }}>
              Pay Bills
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <MaterialCommunityIcons name="phone" size={32} color="#888" />
            <Text style={{ color: "#ffffff", fontSize: 16, padding: 2 }}>
              Buy Airtime
            </Text>
          </TouchableOpacity>
        </View>
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    position: "relative",
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
  },

  navText: {
    color: "#ffffff",
    fontSize: 24,
  },
});
