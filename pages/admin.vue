<template>
  <div class="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Admin: Add New User</h2>
      <form @submit.prevent="addUser">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Username</label>
          <input v-model="username" class="w-full p-2 border rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Password</label>
          <input type="password" v-model="password" class="w-full p-2 border rounded" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-1">Role</label>
          <select v-model="role" class="w-full p-2 border rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button class="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
          Add User
        </button>
      </form>
      <div v-if="message" class="text-green-600 mt-4 text-center">{{ message }}</div>
      <div v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
const username = ref('')
const password = ref('')
const role = ref('user')
const message = ref('')
const error = ref('')

const addUser = async () => {
  try {
    await $fetch('/api/user', {
      method: 'POST',
      body: { username: username.value, password: password.value, role: role.value }
    })
    message.value = `User ${username.value} added!`
    username.value = ''
    password.value = ''
    role.value = 'user'
    error.value = ''
  } catch (err) {
    error.value = err?.data?.message || 'Failed to add user'
    message.value = ''
  }
}
</script>
