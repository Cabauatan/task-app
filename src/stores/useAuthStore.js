import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "@/http/apiAuth";
export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  const fetchUser = async () => {
    const { data } = await getUser();
    user.value = data;
    // console.log(user.value);
  };
  const handleLogin = async (credentials) => {
    await csrfCookie();
    await login(credentials).then((data) => {
      // console.log(data);
      // console.log(data.data.token);
      console.log(data.data.user);
      localStorage.setItem("token", data.data.token);
    });

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
    user.value = null;
    await logout();
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
