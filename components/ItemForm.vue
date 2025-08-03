<template>
  <div>
    <input type="checkbox" id="item-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">
          {{ editingItem ? "Edit Item" : "Add Item" }}
        </h3>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Title</span>
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Title"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            v-model="form.description"
            placeholder="Description"
            class="textarea textarea-bordered"
            required
          ></textarea>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Due Date</span>
          </label>
          <input
            v-model="form.dueDate"
            type="date"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select v-model="form.status" class="select select-bordered">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Priority</span>
          </label>
          <select v-model="form.priority" class="select select-bordered">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div class="modal-action">
          <button class="btn btn-primary" @click="submit">
            {{ editingItem ? "Update" : "Create" }}
          </button>
          <label for="item-modal" class="btn">Cancel</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Item {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
}

const props = defineProps<{
  token: string;
  editingItem: Item | null;
}>();

const emit = defineEmits(["fetch-items", "clear-editing"]);

const form = ref<Item>({
  title: "",
  description: "",
  dueDate: "",
  status: "Pending",
  priority: "Low",
});

watch(
  () => props.editingItem,
  (item) => {
    if (item) {
      form.value = {
        ...item,
        dueDate: new Date(item.dueDate).toISOString().split("T")[0],
      };
    }
  },
  { immediate: true }
);

const submit = async () => {
  try {
    if (props.editingItem?.id) {
      await fetch(`/api/items/${props.editingItem.id}`, {
        method: "PUT",
				body: JSON.stringify(form.value),
        headers: { Authorization: `Bearer ${props.token}` },
      });
    } else {
      await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(form.value),
        headers: { Authorization: `Bearer ${props.token}`, "Content-Type": "application/json" },
      });
    }
    form.value = {
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
      priority: "Low",
    };
    emit("fetch-items");
    emit("clear-editing");
    const modal = document.getElementById("item-modal") as HTMLInputElement;
    if (modal) modal.checked = false;
  } catch (err) {
    console.error(err);
  }
};

</script>
