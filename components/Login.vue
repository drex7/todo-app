<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-2/5 mx-auto">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
    <!-- <form action="#" method="POST" class="space-y-6"> -->
      <div v-if="error" class="alert alert-error">{{ error }}</div>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900"
          >Email address
					<span>*</span>
					</label
        >
        <input
          v-model="username"
          data-cy="username"
          type="text"
          placeholder="Username"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          required
        />
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm/6 font-medium text-gray-900"
            >Password 
						<span>*</span>
						</label
          >
        </div>
        <div class="mt-2">
          <input
            data-cy="password"
            type="password"
            placeholder="Password"
            v-model="password"
            required
            autocomplete="current-password"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          @click="login"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    <!-- </form> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["set-token"]);
const username = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  try {

    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
		if (!res.ok) {
			error.value = "Invalid credentials";
			return;
		}
    // emit("set-token", res.data?.token);
		refreshCookie('token');
    
    await navigateTo('/');
		// navigate user to 
    error.value = "";
  } catch (err) {
    error.value = "Invalid credentials";
  }
};
</script>
