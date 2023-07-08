import AsyncStorage from "@react-native-async-storage/async-storage";


export const Logout = async () => {
  try {
    await AsyncStorage.removeItem("@user_token");
    await AsyncStorage.removeItem("@user_onboard");
  } catch (e) {
    // remove error
  }
};
