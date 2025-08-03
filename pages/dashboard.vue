<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-2xl mx-auto bg-white shadow p-6 rounded">
      <h1 class="text-2xl font-bold mb-4">My TODO List</h1>

      <form @submit.prevent="addItem" class="mb-6">
        <div class="flex gap-2">
          <input v-model="newItem" class="flex-1 border p-2 rounded" placeholder="New task..." />
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add</button>
        </div>
      </form>

      <ul v-if="items.length > 0">
        <li v-for="item in items" :key="item.id" class="flex justify-between items-center border-b py-2">
          <div class="flex-1">
            <input
              v-if="editingId === item.id"
              v-model="editedText"
              class="border px-2 py-1 rounded w-full"
            />
            <span v-else>{{ item.text }}</span>
          </div>
          <div class="flex gap-2 ml-4">
            <button
              @click="startEdit(item)"
              class="text-blue-600 hover:underline"
              v-if="editingId !== item.id"
            >
              Edit
            </button>
            <button
              @click="saveEdit(item)"
              class="text-green-600 hover:underline"
              v-if="editingId === item.id"
            >
              Save
            </button>
            <button @click="deleteItem(item.id)" class="text-red-600 hover:underline">Delete</button>
          </div>
        </li>
      </ul>

      <div v-else class="text-gray-500 text-center mt-4">No items yet</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ['auth'],
})

const newItem = ref('')
const items = ref([])
const editingId = ref(null)
const editedText = ref('')

const { user, clear: clearSession } = useUserSession()

const fetchItems = async () => {
  items.value = await $fetch('/api/items')
}

onMounted(fetchItems)

const addItem = async () => {
  if (!newItem.value) return
  await $fetch('/api/items', {
    method: 'POST',
    body: { text: newItem.value }
  })
  newItem.value = ''
  fetchItems()
}

const deleteItem = async (id) => {
  await $fetch(`/api/items/${id}`, { method: 'DELETE' })
  fetchItems()
}

const startEdit = (item) => {
  editingId.value = item.id
  editedText.value = item.text
}

const saveEdit = async (item) => {
  await $fetch(`/api/items/${item.id}`, {
    method: 'PUT',
    body: { text: editedText.value }
  })
  editingId.value = null
  fetchItems()
}

async function logout() {
	await clearSession();
	await navigateTo('/login');
}
</script>
