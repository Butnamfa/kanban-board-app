<template>
  <div class="login-container">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <h1 class="logo-text"> Kanban Board </h1>
      </div>
    </div>

    <!-- Login Form -->
    <div class="form-wrapper">
      <form @submit.prevent="handleLogin" class="login-form">
        <h2 class="form-title">Welcome back</h2>
        
        <!-- Email Field -->
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="form-input"
            placeholder="Email"
          />
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="form-input"
            placeholder="Password"
          />
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>

        <!-- General Error Message -->
        <p v-if="error" class="error-message general-error">{{ error }}</p>

        <!-- Login Button -->
        <button type="submit" class="login-button">
          Log in
        </button>

        <!-- Sign up link -->
        <p class="signup-link">
          Don't have an account? 
          <router-link to="/register" class="signup-link-text">
            Sign up
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getUsers, setCurrentUser } from "../utils/user";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    const emailError = ref(null);
    const passwordError = ref(null);

    function handleLogin() {
      // Reset errors
      error.value = null;
      emailError.value = null;
      passwordError.value = null;

      // Basic validation
      if (!email.value.trim()) {
        emailError.value = "กรุณากรอก Email";
        return;
      }

      if (!password.value.trim()) {
        passwordError.value = "กรุณากรอก Password";
        return;
      }

      const users = getUsers();
      const user = users.find(
        (u) => u.email === email.value && u.password === password.value
      );

      if (!user) {
        error.value = "Email หรือ Password ไม่ถูกต้อง";
        return;
      }

      setCurrentUser(user.id);

      // ไปหน้า dashboard ด้วย router.push (SPA)
      router.push("/app/dashboard");
    }

    return { 
      email, 
      password, 
      error, 
      emailError, 
      passwordError, 
      handleLogin 
    };
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.header {
  padding: 16px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.form-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
}

.login-form {
  width: 100%;
  max-width: 384px;
  padding: 24px;
  margin: 0 auto;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
  color: #374151;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  background-color: #ffffff;
  box-shadow: 0 0 0 2px #3b82f6;
}

.form-input::placeholder {
  color: #9ca3af;
}

.error-message {
  margin-top: 8px;
  font-size: 14px;
  color: #dc2626;
}

.general-error {
  margin-bottom: 16px;
  text-align: center;
  margin-top: 0;
}

.login-button {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  background-color: #3b82f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 16px;
}

.login-button:hover {
  background-color: #2563eb;
}

.login-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6, 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.signup-link {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.signup-link-text {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.signup-link-text:hover {
  color: #2563eb;
}

/* Responsive */
@media (max-width: 640px) {
  .login-form {
    padding: 16px;
  }
  
  .form-wrapper {
    margin-top: 32px;
  }
}
</style>
