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
      <div v-if="success" class="alert alert-success">{{ success }}</div>
      <div v-if="error" class="alert alert-error">{{ error }}</div>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900"
          >Email address
					<span>*</span>
					</label
        >
        <input
          v-model="credentials.username"
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
            v-model="credentials.password"
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
import { ref, reactive } from "vue";
const { loggedIn, user, fetch: refreshSession } = useUserSession()

const credentials = reactive({
	username: "",
	password: ""
})

const error = ref("");
const success = ref("");

const login = async () => {
  try {

    const res = await $fetch(`/api/login`, {
      method: "POST",
      body: credentials
    });
		refreshCookie('token');
    await refreshSession();
    await navigateTo('/dashboard');
		console.log("navigate user to dashboard")
    success.value = "Login successful!";
    error.value = "";
  } catch (err) {
    success.value = "";
    error.value = "Invalid credentials";
  }
};
</script>

<style scoped>
@reference "./../assets/css/main.css";

.alert-error {
	@apply text-red-800 p-4 mb-4;
}
.alert-success {
	@apply text-green-800 p-4 mb-4;
}	
</style>