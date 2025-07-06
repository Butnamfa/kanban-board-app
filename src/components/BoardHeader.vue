<template>
  <header class="board-header">
    <div class="board-title-area">
      <template v-if="isEditing">
        <input
          v-model="localName"
          @keyup.enter="saveEdit"
          @blur="saveEdit"
          @keydown.esc="cancelEdit"
          ref="inputEdit"
          class="input-edit"
          autofocus
        />
      </template>
      <template v-else>
        <h1 class="board-title" @click="startEdit">{{ localName }}</h1>
      </template>
    </div>

    <!-- ด้านขวา: ปุ่ม Invite และ Back -->
    <div class="button-group">
      <button class="btn-invite" @click="$emit('open-invite-modal')">Invite Members</button>
      <button class="btn-back" @click="$emit('go-back')">Back to Dashboard</button>
    </div>
  </header>
</template>


<script>
export default {
  name: "BoardHeader",
  props: {
    boardName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      localName: this.boardName,
    };
  },
  watch: {
    boardName(newVal) {
      this.localName = newVal;
    },
  },
  methods: {
    startEdit() {
      this.isEditing = true;
      this.$nextTick(() => {
        this.$refs.inputEdit.focus();
      });
    },
    saveEdit() {
      if (!this.localName.trim()) {
        alert("Board name cannot be empty");
        return;
      }
      this.isEditing = false;
      this.$emit("update:boardName", this.localName.trim());
    },
    cancelEdit() {
      this.isEditing = false;
      this.localName = this.boardName;
    },
  },
};
</script>

<style scoped>
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.board-title-area {
  flex: 1;
  min-width: 200px;
}

.board-title {
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  margin: 0;
}

.input-edit {
  font-size: 28px;
  font-weight: bold;
  padding: 4px 8px;
  border: 1px solid #888;
  border-radius: 4px;
  width: 300px;
}

.button-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-invite{
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-back {
  background-color: #FCD8CD;
  color: #5A827E;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}


.btn-invite:hover{
  background-color: #1e40af;
}

.btn-back:hover {
  background-color: #FFAAAA;
}


</style>
