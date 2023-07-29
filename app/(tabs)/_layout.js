import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';
import { getFormattedDate } from '../../utils/DateGetter';
import { Auth, DataStore } from 'aws-amplify';
import { Logout } from '../../utils/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../contexts/AuthContext';


const HomeLayout = () => {

  const router = useRouter()

  const { setDbUser } = useAuthContext()


  const colorScheme = useColorScheme()
  return (
    <Tabs>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Classic",
          tabBarIcon: ({ color }) =><Ionicons name="ios-barbell" color={color} size={28} style={{ marginBottom: -3 }} />,
          headerRight: () => (
              <TouchableOpacity>
                <Feather 
                  name="search" 
                  size={24} 
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
          ),
          headerLeft: () => (
            <View style={{marginLeft : 15, backgroundColor :'transparent'}}>
              <Text>{getFormattedDate()}</Text>
              <Text style={{color : Colors[colorScheme ?? "light"].text, fontFamily : 'capriola', fontSize:20}}>Befit</Text>
            </View>
        ),
        }}
      />
       <Tabs.Screen
        name="plans/index"
        options={{
          headerShown : false,
          title: "Plans",
          tabBarIcon: ({ color }) =>  <Entypo name="progress-two" color={color} size={28} style={{ marginBottom: -3 }} />,
        }}
      />
       <Tabs.Screen
        name="settings/index"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => <AntDesign name="ellipsis1" color={color} size={28} style={{ marginBottom: -3 }} />,
          headerRight: () => (
              <Pressable
              onPress={ async()=>{
                await Auth.signOut();
                await AsyncStorage.removeItem('@db_user')
                await DataStore.clear();
                setDbUser(null)
                setTimeout(() => {
                  router.replace('/');
                }, 2000);

              }}
              >
                {({ pressed }) => (
                  <Entypo 
                    name="login" 
                    size={20}
                    color={'red'}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
        }}/>
    </Tabs>
  );
}

export default HomeLayout