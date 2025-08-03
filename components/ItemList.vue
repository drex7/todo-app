<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Todo Items</h2>
    <button class="btn btn-primary mb-4" @click="openItemModal">Add Item</button>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ new Date(item.dueDate).toLocaleDateString() }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.priority }}</td>
            <td>
              <button
                v-if="isAdmin || item.userId === items[0]?.userId"
                class="btn btn-sm btn-warning mr-2"
                @click="editItem(item)"
              >
                Edit
              </button>
              <button
                v-if="isAdmin || item.userId === items[0]?.userId"
                class="btn btn-sm btn-error"
                @click="deleteItem(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ItemForm :token="token" :editing-item="editingItem" @fetch-items="fetchItems" @clear-editing="editingItem = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Item {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  userId: number;
}

const props = defineProps<{
  token: string;
  isAdmin: boolean;
}>();

const items = ref<Item[]>([]);
const editingItem = ref<Item | null>(null);

const fetchItems = async () => {
  const res = await fetch(`/api/items`, {
    headers: { Authorization: `Bearer ${props.token}` },
  });
  items.value = await res.json();
};

const deleteItem = async (id: number) => {
  await fetch(`/api/items/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${props.token}` },
  });
  await fetchItems();
};

const editItem = (item: Item) => {
  editingItem.value = item;
  const modal = document.getElementById('item-modal') as HTMLInputElement;
  if (modal) modal.checked = true;
};

const openItemModal = () => {
  editingItem.value = null;
  const modal = document.getElementById('item-modal') as HTMLInputElement;
  if (modal) modal.checked = true;
};

const openItemModal1 = () => {
  const modal = document.getElementById('item-modal') as HTMLInputElement;
  if (modal) modal.checked = true;
};

onMounted(fetchItems);
</script>