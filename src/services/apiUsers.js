import { Alert } from "react-native";
import { Axios } from "../hooks/useAxios";
import axios from "axios";

// signup
export async function createUser(form) {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.DEV_API_URL}/users/signup`,
      data: form,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    Alert.alert("Error", error);
  }
}

// getAllUsers
export const getUsers = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.DEV_API_URL}/users`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    Alert.alert("Error", error);
  }
};

// login
export const login = async (form) => {
  try {
    const { response } = await Axios.post("/users/login", JSON.stringify(form));
    console.log(form, response);
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert("Error", error);
  }
};

// forgot pin
export async function forgotPin(data) {
  try {
    const { data } = await Axios.post("/users/forgot-pin", data);
    return data;
  } catch (error) {
    console.log(error);
    Alert.alert("Error", error);
  }
}

// reset pin
export async function resetPin(data) {
  try {
    const { data } = await Axios.post("/users/reset-pin", data);
    return data;
  } catch (error) {
    console.log(error);
    Alert.alert("Error", error);
  }
}
