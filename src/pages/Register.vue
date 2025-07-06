<template>
  <div class="page-container">
    <div class="header">
      <h1 class="brand-title">Kanban Board</h1>
    </div>

    <div class="form-container">
      <form @submit.prevent="handleRegister" class="register-form">
        <h2 class="form-title">Create your account</h2>

        <p v-if="error" class="error-message">{{ error }}</p>

        <div class="form-group">
          <label class="form-label">Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="form-input"
            placeholder="Name"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="form-input"
            placeholder="Email"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="form-input"
            placeholder="Password"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="form-input"
            placeholder="Confirm Password"
          />
        </div>

        <button
          type="submit"
          class="submit-button"
          :class="{ active: isFormValid, inactive: !isFormValid }"
          :disabled="!isFormValid"
        >
          Register
        </button>

        <p class="login-link">
          Already have an account?
          <router-link to="/login" class="link">Log in</router-link>
        </p>
      </form>
    </div>

    <div
      v-if="showSuccessModal"
      class="modal-backdrop"
    >
      <div class="modal-content">
        <h3 class="modal-title">สมัครสมาชิกสำเร็จ</h3>
        <p class="modal-text">กำลังพาไปยังหน้า Login...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getUsers, saveUsers, setCurrentUser } from "../utils/user";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const error = ref(null);
    const showSuccessModal = ref(false);
    const router = useRouter();

    const isFormValid = computed(() => {
      return (
        name.value.trim() &&
        email.value.trim() &&
        password.value &&
        confirmPassword.value &&
        password.value === confirmPassword.value
      );
    });

    function handleRegister() {
      error.value = null;
      if (!isFormValid.value) {
        error.value = "กรุณากรอกข้อมูลให้ครบ และตรวจสอบรหัสผ่าน";
        return;
      }

      const users = getUsers();
      if (users.find((u) => u.email === email.value)) {
        error.value = "อีเมลนี้มีผู้ใช้งานแล้ว";
        return;
      }

      const newUser = {
        id: "u" + Date.now(),
        name: name.value,
        email: email.value,
        password: password.value,
      };
      users.push(newUser);
      saveUsers(users);
      setCurrentUser(newUser.id);

      showSuccessModal.value = true;
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      error,
      handleRegister,
      showSuccessModal,
      isFormValid,
    };
  },
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: sans-serif;
}

.header {
  padding: 16px;
}

.brand-title {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  padding: 20px;
}

.register-form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 320px;
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
  color: #333;
}

.error-message {
  margin-bottom: 20px;
  color: #dc2626;
  text-align: center;
  font-size: 14px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  font-size: 14px;
  background-color: #f8f9fa;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #4f46e5;
  background-color: #ffffff;
}

.submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
  transition: background-color 0.3s;
}

.submit-button.inactive {
  background-color: #d1d5db;
  color: #6b7280;
  cursor: not-allowed;
}

.submit-button.active {
  background-color: #16a34a;
  color: white;
  cursor: pointer;
}

.submit-button.active:hover {
  background-color: #15803d;
}

.login-link {
  margin-top: 16px;
  text-align: center;
  color: #6b7280;
  font-size: 13px;
}

.link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  width: 320px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #16a34a;
  margin-bottom: 8px;
}

.modal-text {
  color: #6b7280;
  font-size: 14px;
}
</style>
