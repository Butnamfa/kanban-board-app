<template>
  <header class="header">
    <div class="logo">
      <div class="logo-icon">📋</div>
      <span class="logo-text">Kanban Board</span>
    </div>
    <div class="user-info">
      <div class="user-avatar">
        <i class="user-icon">👤</i>
      </div>
      <span class="user-name">{{ userName }}</span>
      <button class="btn-logout" @click="logout">
        <span class="logout-icon"></span>
        Logout
      </button>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from "vue";
import { getSessionUser } from "../utils/user";

export default {
  name: "Header",
  setup() {
    const userName = ref("Guest");

    function loadUser() {
      const user = getSessionUser();
      userName.value = user ? user.name : "Guest";
    }

    function logout() {
      localStorage.removeItem("currentUserId");
      window.location.href = "/login";
    }

    onMounted(() => {
      loadUser();
    });

    return { userName, logout };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: #578FCA;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  box-shadow: 0 4px 20px rgba(162, 213, 198, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.8rem;
  position: relative;
  z-index: 1;
}

.logo-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  animation: pulse 2s infinite;
}

.logo-text {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #d1d5db, #9ca3af);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(156, 163, 175, 0.4);
  transition: all 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(156, 163, 175, 0.6);
}

.user-icon {
  font-size: 1.2rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.user-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #f9fafb;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.btn-logout {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 12px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.btn-logout::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-logout:hover::before {
  left: 100%;
}

.btn-logout:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-logout:active {
  transform: translateY(0);
}

.logout-icon {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.btn-logout:hover .logout-icon {
  transform: rotate(20deg);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    padding: 1rem 1.5rem;
  }
  
  .logo {
    font-size: 1.5rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .user-name {
    display: none;
  }
  
  .btn-logout {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
</style>