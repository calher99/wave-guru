import "dotenv/config";

export default {
  android: {
    package: "com.calher99.waveguru", 
},
    extra: {
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
        backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL,
        tideApiKey: process.env.EXPO_PUBLIC_TIDE_API_KEY,
        tideApiUrl: process.env.EXPO_PUBLIC_TIDE_API_URL,
        tokenSecureStore: EXPO_PUBLIC_TOKEN_KEY_SECURE_STORE,
        eas: {
          projectId: "dcd1320a-3133-4b41-98cc-f4a3b7377095"
      }
      },
};
