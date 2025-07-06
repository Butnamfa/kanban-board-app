<template>
  <div class="board-view container">
    <!-- Header -->
    <BoardHeader
      :boardName="board.name || 'Loading...'"
      @open-invite-modal="openInviteModal"
      @update:boardName="updateBoardName"
      @go-back="goBackToDashboard"
    />

    <!-- Member count -->
    <p class="member-count" :key="fullMembers.map(m => m.id).join('-')">
      Members: {{ fullMembers.length }} ({{ fullMembers.map(m => m.name || m.id).join(", ") }})
    </p>

    <!-- Columns -->
    <ColumnList
      v-if="board.columns"
      :columns="board.columns"
      :members="fullMembers"
      @update-columns="handleUpdateColumns"
    />

    <!-- Invite Modal -->
    <InviteMemberModal
      v-if="showInviteMemberModal"
      :board="board"
      @close="showInviteMemberModal = false"
      @update-members="handleUpdateMembers"
    />
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import BoardHeader from "@/components/BoardHeader.vue";
import ColumnList from "@/components/ColumnList.vue";
import InviteMemberModal from "@/components/InviteMemberModal.vue";

export default {
  name: "BoardView",
  components: {
    BoardHeader,
    ColumnList,
    InviteMemberModal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const board = ref({});
    const fullMembers = ref([]);
    const showInviteMemberModal = ref(false);

    function loadBoard() {
      try {
        const boards = JSON.parse(localStorage.getItem("boards") || "[]");
        console.log("Boards in localStorage:", boards);
        const found = boards.find((b) => b.id === route.params.id);
        if (!found) {
          console.error("ไม่พบ Board สำหรับ ID:", route.params.id);
          alert("ไม่พบ Board");
          router.push("/app/dashboard");
          return;
        }
        found.columns = Array.isArray(found.columns) ? found.columns : [];
        found.columns.forEach((col) => {
          col.tasks = Array.isArray(col.tasks) ? col.tasks : [];
        });
        found.members = Array.isArray(found.members) ? found.members : [];
        board.value = { ...found };
        console.log("Loaded board:", board.value);
        loadBoardMembers();
      } catch (error) {
        console.error("ข้อผิดพลาดในการโหลด Board:", error);
        alert("ข้อผิดพลาดในการโหลด Board กรุณาตรวจสอบข้อมูล");
      }
    }

    function loadBoardMembers() {
      try {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        console.log("Users in localStorage:", users);
        console.log("Board members IDs:", board.value.members);
        fullMembers.value = users.filter((u) => board.value.members.includes(u.id));
        console.log("Loaded fullMembers:", fullMembers.value);
      } catch (error) {
        console.error("ข้อผิดพลาดในการโหลด Members:", error);
      }
    }

    function saveBoard() {
      try {
        const boards = JSON.parse(localStorage.getItem("boards") || "[]");
        const index = boards.findIndex((b) => b.id === board.value.id);
        if (index !== -1) {
          boards[index] = { ...board.value };
          localStorage.setItem("boards", JSON.stringify(boards));
          console.log("Boards saved to localStorage:", boards);
          console.log("Saved board members:", boards[index].members);
        } else {
          console.error("Board not found in localStorage for ID:", board.value.id);
          alert("ไม่สามารถบันทึก Board ได้: ไม่พบ Board ในระบบ");
        }
      } catch (error) {
        console.error("ข้อผิดพลาดในการบันทึก Board:", error);
        alert("ข้อผิดพลาดในการบันทึก Board กรุณาลองใหม่");
      }
    }

    function openInviteModal() {
      console.log("openInviteModal called"); 
      showInviteMemberModal.value = true;
    }

    function handleUpdateMembers(newMembers) {
      console.log("New Members Received in handleUpdateMembers:", newMembers);
      board.value = {
        ...board.value,
        members: [...newMembers],
      };
      console.log("Updated Board Members:", board.value.members);

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      fullMembers.value = users.filter((u) => board.value.members.includes(u.id));
      console.log("Updated fullMembers:", fullMembers.value);
      console.log("Members Count after Update:", fullMembers.value.length);

      saveBoard();

      nextTick(() => {
        console.log("UI should update with new member count:", fullMembers.value.length);
      });
    }

    function handleUpdateColumns(newColumns) {
      board.value = {
        ...board.value,
        columns: [...newColumns],
      };
      saveBoard();
    }

    function updateBoardName(newName) {
      board.value = {
        ...board.value,
        name: newName,
      };
      saveBoard();
    }

    function goBackToDashboard() {
      console.log("Navigating to /app/dashboard");
      router.push("/app/dashboard");
    }

    onMounted(() => {
      loadBoard();
    });

    return {
      board,
      fullMembers,
      showInviteMemberModal,
      openInviteModal,
      handleUpdateMembers,
      handleUpdateColumns,
      updateBoardName,
      goBackToDashboard,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  font-family: Arial, sans-serif;
}

.member-count {
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #555;
}
</style>