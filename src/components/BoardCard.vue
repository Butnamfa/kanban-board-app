<template>
  <div class="board-card">
    <!-- ชื่อบอร์ด -->
    <div @click="handleOpen" class="board-name">
      <template v-if="isEditing">
        <input
          v-model="localName"
          @keyup.enter="saveEdit"
          @blur="saveEdit"
          @keydown.esc="cancelEdit"
          ref="inputEdit"
          class="input-edit-name"
          autofocus
        />
      </template>
      <template v-else>
        {{ board.name }}
      </template>
    </div>

    <!-- จำนวนสมาชิกและรายชื่อ -->
    <div class="members-count">
      Members: {{ memberNames.length }} <br />
      <small>{{ memberNames.join(", ") || "No members yet" }}</small>
    </div>

    <!-- ปุ่ม Invite -->
    <div class="invite-box">
      <button @click="openInviteModal" class="btn-invite">Invite Member</button>
    </div>

    <!-- Invite Modal -->
    <InviteMemberModal
      v-if="showInviteMemberModal"
      :board="board"
      @update-members="handleUpdateMembers"
      @close="showInviteMemberModal = false"
    />

    <!-- ปุ่ม Edit / Delete -->
    <div class="board-actions">
      <button v-if="!isEditing" @click.stop="startEdit" class="btn-edit">Edit</button>
      <button @click.stop="deleteBoard" class="btn-delete">Delete</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick } from "vue";
import InviteMemberModal from "@/components/InviteMemberModal.vue";

export default {
  name: "BoardCard",
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  components: {
    InviteMemberModal,
  },
  setup(props, { emit }) {
    const isEditing = ref(false);
    const localName = ref(props.board.name);
    const showInviteMemberModal = ref(false);


    const allUsers = computed(() => {
      return JSON.parse(localStorage.getItem("users") || "[]");
    });


    const memberNames = computed(() => {
      return allUsers.value
        .filter((u) => props.board.members.includes(u.id))
        .map((u) => u.name || u.id);
    });

    function openInviteModal() {
      showInviteMemberModal.value = true;
    }

    function handleUpdateMembers(newMembers) {
      emit("update-members", {
        id: props.board.id,
        members: [...newMembers],
      });
      showInviteMemberModal.value = false;
    }

    function handleOpen() {
      emit("open-board", props.board.id);
    }

    function startEdit() {
      isEditing.value = true;
      nextTick(() => {
        const inputEdit = document.querySelector(".input-edit-name");
        if (inputEdit) inputEdit.focus();
      });
    }

    function saveEdit() {
      if (!localName.value.trim()) {
        alert("Name cannot be empty");
        return;
      }
      isEditing.value = false;
      emit("update-name", {
        id: props.board.id,
        name: localName.value.trim(),
      });
    }

    function cancelEdit() {
      isEditing.value = false;
      localName.value = props.board.name;
    }

    function deleteBoard() {
      if (confirm("Delete this board?")) {
        emit("delete-board", props.board.id);
      }
    }

    return {
      isEditing,
      localName,
      showInviteMemberModal,
      memberNames,
      openInviteModal,
      handleUpdateMembers,
      handleOpen,
      startEdit,
      saveEdit,
      cancelEdit,
      deleteBoard,
    };
  },
};
</script>

<style scoped>
.board-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  max-width: 320px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: default;
  user-select: none;
}

.board-name {
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.3rem;
  cursor: pointer;
}

.input-edit-name {
  width: 100%;
  padding: 0.3rem 0.4rem;
  font-size: 1rem;
  border: 1px solid #888;
  border-radius: 4px;
}

.members-count {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.8rem;
  white-space: normal;
  word-break: break-word;
}

.invite-box {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.8rem;
}

.btn-invite {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-invite:hover {
  background-color: #059669;
}

.board-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  font-size: 0.9rem;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  border: 1px solid #888;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-edit:hover {
  background-color: #e0e7ff;
  border-color: #6366f1;
  color: #4f46e5;
}

.btn-delete {
  border-color: #dc2626;
  color: #dc2626;
}

.btn-delete:hover {
  background-color: #fee2e2;
  color: #b91c1c;
}
</style>
