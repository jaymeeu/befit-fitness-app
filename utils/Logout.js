import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "aws-amplify";


export const Logout = async () => {
  try {
    await Auth.signOut()
    await AsyncStorage.removeItem("@db_user");
    await AsyncStorage.removeItem("@user_onboard");
  } catch (e) {
    // remove error
  }
};
