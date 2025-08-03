<template>
  <div class="min-h-screen bg-gray-100">
    <div v-if="!isAuthenticated" class="min-h-screen">
      <Login @set-token="setToken" /> 
    </div>
    <div v-else class="container mx-auto p-4">
      <div class="navbar bg-base-100 shadow-lg mb-4">
        <div class="flex-1">
          <h1 class="text-2xl font-bold">Todo App</h1>
        </div>
        <div class="flex-none">
          <span class="mr-4">Welcome, {{ user?.username }}</span>
          <button
            v-if="user?.isAdmin"
            class="btn btn-primary mr-2"
            @click="openUserModal"
          >
            Add User
          </button>
          <button class="btn btn-error" @click="logout">Logout</button>
        </div>
      </div>
      <ItemList :token="token" :is-admin="user?.isAdmin ?? false" />
      <UserForm v-if="user?.isAdmin" :token="token" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

const token = ref<string | null>(null);
const user = ref<User | null>(null);

const tokenCookie = useCookie('token')

const isTokenExpired = computed(() => {
  const token = localStorage.get("token");
  if (!token) return true;
  const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
  const expiresAt = jwtPayload.exp;
  const now = Date.now();
  return expiresAt >= now;
});

const isAuthenticated = computed(() => {
  return token.value && !isTokenExpired.value;
});

onMounted(async () => {
  
  if (tokenCookie) {
    try {
      const res = await fetch(`/api/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      user.value = await res.json();
    } catch (err) {
      token.value = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    }
  }
});

const setToken = (newToken: string) => {
  token.value = newToken;
  if (typeof window !== "undefined") {
    localStorage.setItem("token", newToken);
  }
};

const logout = () => {
  token.value = null;
  user.value = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

const openUserModal = () => {
  const modal = document.getElementById("user-modal") as HTMLInputElement;
  if (modal) modal.checked = true;
};
</script>
