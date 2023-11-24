import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "@/http/apiAuth";
export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  const fetchUser = async () => {
    const { data } = await getUser();
    user.value = data;
  };
  const handleLogin = async (credentials) => {
    await login(credentials).then((data) => {
      console.log(data);
    });
    await csrfCookie();
    await fetchUser();
  };
  const handleRegister = async (newUser) => {
    console.log(newUser);
    await register(newUser);
    await handleLogin({
      email: newUser.email,
      password: newUser.password,
    });
  };
  const handleLogout = async () => {
    await logout();
    user.value = null;
  };
  return {
    user,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
});
