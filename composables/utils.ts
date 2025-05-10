export const useLoadingState = () => {
  return useState("isLoading", () => false);
};

// guest token if not authed
export const getGuestToken = async () => {
  const stored = useCookie("guest_token", {
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
  });
  if (!stored.value) {
    const uuid = await crypto.randomUUID();
    stored.value = uuid;
  }
  return stored.value;
};
