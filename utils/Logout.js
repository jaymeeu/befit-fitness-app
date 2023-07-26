import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "aws-amplify";


export const Logout = async () => {
  try {
    await Auth.signOut()
    await AsyncStorage.removeItem("@db_user");
  } catch (e) {
    // remove error
  }
};
