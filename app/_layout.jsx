import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, SplashScreen, Stack, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme, Linking, Pressable } from 'react-native';
import { Amplify } from 'aws-amplify';
import * as WebBrowser from "expo-web-browser";
import awsconfig from '../src/aws-exports'
import AuthContextProvider, { useAuthContext } from '../contexts/AuthContext';
import Colors from '../constants/Colors';
import UserContextProvider from '../contexts/RegContext';

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
  const [loaded, error] = useFonts({
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

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}


function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function RootLayoutNav() {

  const colorScheme = useColorScheme();
  const { dbUser, userOnboard } = useAuthContext()

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthContextProvider>
          <UserContextProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
          </UserContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}
