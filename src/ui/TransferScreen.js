import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { DEV_API_URL } from "@env";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function TransferScreen({ route, navigation }) {
  const { userId } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [pin, setPin] = useState("");
  const [bank, setBank] = useState("");

  async function makeTransfer() {
    try {
      setIsLoading(true);
      // console.log(amount);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/${userId}/transfers`,
        data: {
          fromAccount: fromAccount,
          toBank: bank,
          toAccount: toAccount,
          amount: Number(amount),
          narration: narration,
          pin: pin,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!response) throw new Error("response not found");
      console.log(response?.data?.data?.transfer);
      navigation.navigate("History", {
        transfer: response?.data?.data?.transfer,
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.backText}>&larr;</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.primaryText}>Enter Transfer Details</Text>
          <View>
            <Text style={styles.label}>From Account</Text>
            <TextInput
              style={styles.input}
              placeholder="select account to debit"
              onChangeText={(text) => setFromAccount(text)}
              value={fromAccount}
            />
          </View>
          <Text style={[styles.label, { marginTop: -0.5 }]}>To Bank</Text>
          <RNPickerSelect
            placeholder={{
              label: "Select Bank Name",
              value: null,
              color: "#ffffff",
            }}
            onValueChange={(bank) => setBank(bank)}
            items={[
              { label: "FBN", value: "FBN" },
              { label: "GTB", value: "GTB" },
              { label: "OPAY", value: "OPAY" },
              { label: "UNION", value: "UNION" },
              { label: "ZENITH", value: "ZENITH" },
              { label: "WEMA", value: "WEMA" },
              { label: "UBA", value: "UBA" },
            ]}
            style={pickerSelectStyles}
          />

          <View>
            <Text style={styles.label}>To Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Account Destination"
              onChangeText={(text) => setToAccount(text)}
              value={toAccount}
            />
          </View>
          <View>
            <Text style={[styles.label, { marginBottom: 2, marginTop: -0.5 }]}>
              Amount
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              onChangeText={(text) => setAmount(text)}
              value={amount}
            />
          </View>
          <View>
            <Text style={[styles.label, { marginBottom: 2, marginTop: -0.5 }]}>
              Narration
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Narration"
              onChangeText={(text) => setNarration(text)}
              value={narration}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#ffffff",
                textAlign: "center",
                marginTop: 30,
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              Enter Transaction PIN
            </Text>
            <TextInput
              style={{
                marginTop: 10,
                marginBottom: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: "35%",
                backgroundColor: "#ffffff",
                borderRadius: 6,
                fontSize: 16,
                padding: 10,
                textAlign: "center",
              }}
              onChangeText={(text) => setPin(text)}
              value={pin}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={makeTransfer}
            activeOpacity={0.4}
          >
            {isLoading ? (
              <View style={styles.horizontal}>
                <ActivityIndicator />
              </View>
            ) : (
              <Text style={styles.buttonText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  backText: {
    marginTop: 40,
    fontSize: 36,
    color: "#ffffff",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    paddingLeft: 15,
  },
  welcomeImage: {
    marginBottom: 50,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  skipText: {
    fontSize: 16,
    margin: 20,
    textAlign: "right",
    color: "#ffffff",
  },

  primaryText: {
    marginTop: 40,
    marginBottom: 15,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 24,
    color: "#ffffff",
  },
  input: {
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    padding: 12,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#F8B930",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginLeft: 20,
    margin: 10,
    width: "90%",
    padding: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    color: "#222",
    paddingRight: 30, // to ensure the text is never behind the icon
  },

  inputAndroid: {
    marginLeft: 20,
    width: "90%",
    padding: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "#222",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
