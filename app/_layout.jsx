import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack, Tabs } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useColorScheme, Linking, Pressable, View, Text } from 'react-native';
import { Amplify } from 'aws-amplify';
import * as WebBrowser from "expo-web-browser";
import awsconfig from '../src/aws-exports'
import AuthContextProvider, { useAuthContext } from '../contexts/AuthContext';
import Colors from '../constants/Colors';
import UserContextProvider from '../contexts/RegContext';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

const isLocalHost = Boolean(__DEV__);

const [productionRedirectSignIn, localRedirectSignIn] =
  awsconfig.oauth.redirectSignIn.split(",");

const [productionRedirectSignOut, localRedirectSignOut] =
  awsconfig.oauth.redirectSignOut.split(",");

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

const updatedConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalHost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalHost
      ? localRedirectSignOut
      : productionRedirectSignOut,
    urlOpener,
  },
};
Amplify.configure(updatedConfig)

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {

  const [appIsReady, setAppIsReady] = useState(false);

  const colorScheme = useColorScheme();


  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   "capriola": require('../assets/fonts/Capriola-Regular.ttf'),
  //   'work-san-light': require('../assets/fonts/WorkSans-Light.ttf'),
  //   'work-san': require('../assets/fonts/WorkSans-Regular.ttf'),
  //   'work-san-md': require('../assets/fonts/WorkSans-Medium.ttf'),
  //   'work-san-semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
  //   'work-san-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  //   'work-san-exBold': require('../assets/fonts/WorkSans-ExtraBold.ttf'),
  //   ...FontAwesome.font,
  // });


  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
          "capriola": require('../assets/fonts/Capriola-Regular.ttf'),
          'work-san-light': require('../assets/fonts/WorkSans-Light.ttf'),
          'work-san': require('../assets/fonts/WorkSans-Regular.ttf'),
          'work-san-md': require('../assets/fonts/WorkSans-Medium.ttf'),
          'work-san-semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
          'work-san-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
          'work-san-exBold': require('../assets/fonts/WorkSans-ExtraBold.ttf'),
          ...FontAwesome.font,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


  return (

    <View onLayout={onLayoutRootView}>

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthContextProvider>
        <UserContextProvider>

          <Text>Layout</Text>
          <Stack>
            <Stack.Screen name="index" 
              options={{ 
                headerShown: false ,
              }} 
            />
            <Stack.Screen name="boarding" options={{ headerShown: false }} />
            <Stack.Screen name="workout" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="registration" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </UserContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </View>
  );
}

// function RootLayoutNav() {

//   const colorScheme = useColorScheme();
//   const { dbUser, userOnboard } = useAuthContext()

//   return (
//     <>
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         <AuthContextProvider>
//           <UserContextProvider>
//             <Stack>
//               <Stack.Screen name="index" 
//                 options={{ 
//                   headerShown: false ,
//                 }} 
//               />
//               <Stack.Screen name="boarding" options={{ headerShown: false }} />
//               {/* <Stack.Screen name="workout/[workout_id]" options={{ headerShown: false }} /> */}
//               <Stack.Screen name="workout" options={{ headerShown: false }} />
//               <Stack.Screen name="auth" options={{ headerShown: false }} />
//               <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//               <Stack.Screen name="registration" options={{ headerShown: false }} />
//               <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//             </Stack>
//           </UserContextProvider>
//         </AuthContextProvider>
//       </ThemeProvider>
//     </>
//   );
// }
