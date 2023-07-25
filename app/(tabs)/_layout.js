import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';
import { getFormattedDate } from '../../utils/DateGetter';

function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const HomeLayout = () => {

  const colorScheme = useColorScheme()
  return (
    <Tabs>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Classic",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
       <Tabs.Screen
        name="settings/index"
        options={{
          title: "Me",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // headerRight: () => (
          //   <Link href="/" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? "light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}/>
    </Tabs>
  );
}

export default HomeLayout