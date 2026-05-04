import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const principal = identity?.getPrincipal();
  const principalText = principal?.toString() ?? "";

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  return {
    login,
    logout: handleLogout,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isIdle: loginStatus === "idle",
    principal,
    principalText,
    identity,
  };
}
