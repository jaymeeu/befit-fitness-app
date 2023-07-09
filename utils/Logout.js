import AsyncStorage from "@react-native-async-storage/async-storage";


export const Logout = async () => {
  try {
    await AsyncStorage.removeItem("@db_user");
    await AsyncStorage.removeItem("@user_onboard");
  } catch (e) {
    // remove error
  }
};
