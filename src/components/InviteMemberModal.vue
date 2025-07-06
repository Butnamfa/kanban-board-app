<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Invite Members to Board</h2>

      <div class="user-list">
        <label
          v-for="user in allUsers"
          :key="user.id"
          class="user-item"
        >
          <input
            type="checkbox"
            :value="user.id"
            v-model="selectedUserIds"
          />
          {{ user.name }} ({{ user.email }})
        </label>
      </div>

      <div class="modal-actions">
        <button @click="confirmInvite" class="btn-confirm">Invite</button>
        <button @click="$emit('close')" class="btn-cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InviteMemberModal",
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      allUsers: JSON.parse(localStorage.getItem("users") || "[]"),
      // เริ่มต้น selectedUserIds เป็นสมาชิกที่มีใน board
      selectedUserIds: this.board.members ? [...this.board.members] : [],
    };
  },
  methods: {
    confirmInvite() {
      // ส่ง selectedUserIds กลับไปอัปเดตสมาชิกบอร์ด
      this.$emit("update-members", this.selectedUserIds);
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.user-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 4px;
}

.user-item {
  display: block;
  margin-bottom: 0.4rem;
  cursor: pointer;
  user-select: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-confirm {
  background-color: #2563eb; /* blue-600 */
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-confirm:hover {
  background-color: #1e40af; /* blue-800 */
}

.btn-cancel {
  background-color: #e5e7eb; /* gray-200 */
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: #d1d5db; /* gray-300 */
}
</style>
