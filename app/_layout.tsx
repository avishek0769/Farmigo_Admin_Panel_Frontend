import TabLayout from "@/src/TabNavigator";
import Login from "@/src/screens/Login";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const Stack = createNativeStackNavigator()
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });


  return (
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#fff", }}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={[]}>
              <StatusBar translucent backgroundColor="transparent" style="dark" />

              <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Tabs" component={TabLayout} />
              </Stack.Navigator>
          </SafeAreaView>
        </SafeAreaProvider>
    </GestureHandlerRootView >
  );
}
