import { Redirect } from "expo-router";

import useAuthStore from "../store/authStore";

export default function App() {
  const { session } = useAuthStore();

  return <Redirect href={session?.user ? "/(tabs)/home" : "/(auth)/sign-in"} />;
}
