<template>
  <div>
    <input type="checkbox" id="user-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Add User</h3>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            v-model="form.username"
            type="text"
            placeholder="Username"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Admin</span>
            <input v-model="form.isAdmin" type="checkbox" class="checkbox" />
          </label>
        </div>
        <div class="modal-action">
          <button class="btn btn-primary" @click="submit">Create</button>
          <label for="user-modal" class="btn">Cancel</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface UserForm {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const props = defineProps<{
  token: string;
}>();

const form = ref<UserForm>({
  username: "",
  email: "",
  password: "",
  isAdmin: false,
});

const submit = async () => {
  try {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form.value),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    form.value = { username: "", email: "", password: "", isAdmin: false };
    const modal = document.getElementById("user-modal") as HTMLInputElement;
    if (modal) modal.checked = false;
    alert("User created successfully");
  } catch (err) {
    alert("Error creating user");
  }
};
</script>
