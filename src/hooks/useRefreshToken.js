import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Axios } from "./useAxios";
import { Alert } from "react-native";

const useRefreshToken = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const response = await Axios.post("/refresh", {
        headers: { "X-Refresh-Token": `${auth?.refreshToken}` },
      });
      if (!response) throw new Error("response not found");

      setAuth((prev) => {
        return {
          ...prev,
          userToken: response.userToken,
          refreshToken: response.refreshToken,
        };
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Error", err);
    }
  };

  return refresh;
};

export default useRefreshToken;
