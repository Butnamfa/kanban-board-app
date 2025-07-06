<template>
  <div class="dashboard container">
    <!-- ฟอร์มสร้างบอร์ดใหม่ -->
    <div class="create-board">
      <input
        v-model="newBoardName"
        type="text"
        placeholder="New board name"
        class="input-board-name"
      />
      <button @click="createBoard" class="btn-create">Create New Board</button>
    </div>

    <!-- รายการบอร์ด -->
    <div class="board-list">
      <BoardCard
        v-for="board in userBoards"
        :key="board.id"
        :board="board"
        @update-name="updateBoardName"
        @delete-board="deleteBoard"
        @open-board="openBoard"
        @update-members="updateBoardMembers"
      />
    </div>
  </div>
</template>

<script>
import BoardCard from "@/components/BoardCard.vue";
import { getSessionUser } from "@/utils/user.js";

export default {
  name: "Dashboard",
  components: { BoardCard },
  data() {
    return {
      currentUser: null,
      boards: [],
      newBoardName: "",
    };
  },
  computed: {
    userBoards() {
      if (!this.currentUser) return [];
      return this.boards.filter((b) => b.members.includes(this.currentUser.id));
    },
  },
  methods: {
    loadUser() {
      this.currentUser = getSessionUser();
      console.log("Current User:", this.currentUser); 
      if (!this.currentUser) {
        console.log("No current user, redirecting to /login"); 
        this.$router.push("/login");
      }
    },
    loadBoards() {
      const raw = localStorage.getItem("boards");
      this.boards = raw ? JSON.parse(raw) : [];
    },
    saveBoards() {
      localStorage.setItem("boards", JSON.stringify(this.boards));
    },
    createBoard() {
      const name = this.newBoardName.trim();
      if (!name) {
        alert("Please enter a board name");
        return;
      }
      const newBoard = {
        id: Date.now().toString(),
        name,
        members: [this.currentUser.id],
      };
      this.boards.push(newBoard);
      this.saveBoards();
      this.newBoardName = "";
    },
    updateBoardName({ id, name }) {
      const board = this.boards.find((b) => b.id === id);
      if (board) {
        board.name = name;
        this.saveBoards();
      }
    },
    updateBoardMembers({ id, members }) {
      const board = this.boards.find((b) => b.id === id);
      if (board) {
        board.members = members;
        this.saveBoards();
      }
    },
    deleteBoard(id) {
      this.boards = this.boards.filter((b) => b.id !== id);
      this.saveBoards();
    },
    openBoard(id) {
      console.log("Navigating to board:", id); 
      this.$router.push(`/app/board/${id}`); 
    },
  },
  mounted() {
    this.loadUser();
    this.loadBoards();
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Arial, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}

.create-board {
  display: flex;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.create-board:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.input-board-name {
  flex-grow: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  margin-right: 1rem;
  background: #ffffff;
  color: #2d3748;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.input-board-name:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
}

.input-board-name::placeholder {
  color: #a0aec0;
}

.btn-create {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  white-space: nowrap;
}

.btn-create:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.btn-create:active {
  transform: translateY(0);
}

.board-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .create-board {
    flex-direction: column;
    gap: 1rem;
  }

  .input-board-name {
    margin-right: 0;
  }

  .board-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem;
  }

  .create-board {
    padding: 1rem;
  }
}
</style>
