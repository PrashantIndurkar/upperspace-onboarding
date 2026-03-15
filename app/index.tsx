import { Redirect } from "expo-router";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { useAuth } from "./contexts/AuthContext";

export default function IndexScreen() {
  const { user, isHydrating } = useAuth();

  if (isHydrating) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Redirect href="/(root)/home" />;
  }

  return <Redirect href="/(root)/(auth)/onboarding-intro" />;
}
