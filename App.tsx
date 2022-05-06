import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import  Widget from './src/components/FeedbackButton/Widget';
import { theme } from './src/theme';
import FlashMessage from 'react-native-flash-message';
import { LogBox } from 'react-native';
   LogBox.ignoreLogs([
  "[react-native-gesture-handler]",
]);
export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  });
  if (!fontsLoaded) {
    return null;
  }
  SplashScreen.hideAsync();
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "height" : "padding"}
    style={{flex: 1}}>
      <View style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <StatusBar 
          style="light" 
          backgroundColor="transparent" 
          translucent
        />
        <FlashMessage position="top" />
        <Widget />
      </View>
    </KeyboardAvoidingView>
  );
}