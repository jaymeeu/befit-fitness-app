import '@azure/core-asynciterator-polyfill'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AuthContextProvider from '../contexts/AuthContext'
import UserContextProvider from '../contexts/RegContext';
import awsconfig from '../src/aws-exports'
import * as WebBrowser from "expo-web-browser";
import { Amplify } from 'aws-amplify';


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
  initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  "capriola": require('../assets/fonts/Capriola-Regular.ttf'),
  'work-san-light': require('../assets/fonts/WorkSans-Light.ttf'),
  'work-san': require('../assets/fonts/WorkSans-Regular.ttf'),
  'work-san-md': require('../assets/fonts/WorkSans-Medium.ttf'),
  'work-san-semibold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
  'work-san-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  'work-san-exBold': require('../assets/fonts/WorkSans-ExtraBold.ttf'),
  ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthContextProvider>
        <UserContextProvider>
          <Stack>
            <Stack.Screen name="index"
              options={{
                headerShown: false,
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
  );
}
