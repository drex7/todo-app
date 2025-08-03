<script setup lang="ts">
const token = useCookie("token");
if (token.value) {
  await navigateTo("/dashboard");
} else {
  await navigateTo("/login");
}
</script>

<template>
  <div class="text-center mt-20 text-gray-500">Redirecting...</div>
</template>
