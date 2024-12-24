import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { supabase } from "../lib/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";

type Props = {};

const LoginWithGoogle = (props: Props) => {
  const config = {
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  };
  const redirectTo = makeRedirectUri();

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    return data.session;
  };

  const performOAuth = async (valueProvider: string = "github") => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: valueProvider as any,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );

    console.log(redirectTo);

    if (res.type === "success") {
      const { url } = res;
      console.log(url);
      await createSessionFromUrl(url);
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("access token", token);
      console.log(authentication);
      getUserProfile(token);
    }
  };

  const getUserProfile = async (token: any) => {
    if (!token) return;
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await res.json();
      performOAuth("google");
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  return (
    <View style={styles.container}>
      <Button onPress={() => promptAsync()} title="Sign in with Google" />
    </View>
  );
};

export default LoginWithGoogle;

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
