import { Redirect } from "expo-router";
import { useAuth } from "./contexts/AuthContext";
import { LoadingScreen } from "./components/common/LoadingScreen";

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
