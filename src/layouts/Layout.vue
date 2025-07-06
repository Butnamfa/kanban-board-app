<template>
  <div class="layout-container">
    <AppHeader :username="currentUser?.name || 'Guest'" @logout="logout" />

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";

export default {
  name: "Layout",
  components: {
    AppHeader,
  },
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem("currentUser")),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 1rem;
  background-color: #f3f4f6;
}
</style>
