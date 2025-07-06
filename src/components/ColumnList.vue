<template>
  <div class="column-list-wrapper">
    <div class="column-list">
      <ColumnCard
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :members="members"
        @update-column-name="updateColumnName"
        @save-task="saveTask"
        @delete-task="deleteTask"
        @delete-column="deleteColumn"
      />
    </div>
    <button class="btn-add-column" @click="addColumn">+ Add Column</button>
  </div>
</template>

<script>
import ColumnCard from "./ColumnCard.vue";

export default {
  name: "ColumnList",
  components: { ColumnCard },
  props: {
    columns: { type: Array, default: () => [] },
    members: { type: Array, default: () => [] },
  },
  methods: {
    updateColumnName({ id, name }) {
      const newColumns = this.columns.map((col) => {
        if (col.id === id) {
          return { ...col, name };
        }
        return col;
      });
      this.$emit("update-columns", newColumns);
    },

    addColumn() {
      const newColumn = {
        id: Date.now().toString(),
        name: "New Column",
        tasks: [],
      };
      this.$emit("update-columns", [...this.columns, newColumn]);
    },

    saveTask({ columnId, task }) {
      const newColumns = this.columns.map((col) => {
        if (col.id === columnId) {
          const newTasks = [...col.tasks];
          const taskIndex = newTasks.findIndex((t) => t.id === task.id);
          if (taskIndex !== -1) {
            newTasks[taskIndex] = task;
          } else {
            newTasks.push(task);
          }
          return { ...col, tasks: newTasks };
        }
        return col;
      });
      this.$emit("update-columns", newColumns);
    },

    deleteTask({ columnId, taskId }) {
      const newColumns = this.columns.map((col) => {
        if (col.id === columnId) {
          const newTasks = col.tasks.filter((t) => t.id !== taskId);
          return { ...col, tasks: newTasks };
        }
        return col;
      });
      this.$emit("update-columns", newColumns);
    },

    deleteColumn(columnId) {
      const newColumns = this.columns.filter((col) => col.id !== columnId);
      this.$emit("update-columns", newColumns);
    },
  },
};
</script>

<style scoped>
.column-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%; /* ครอบคลุมความกว้างทั้งหมด */
}

.column-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr)); /* ความกว้างขั้นต่ำ 150px */
  gap: 0.5rem; /* ระยะห่างระหว่างคอลัมน์ */
  padding: 1rem;
  align-items: start; /* อนุญาตให้ความสูงต่างกัน */
  width: 100%; /* ครอบคลุมความกว้าง */
  box-sizing: border-box; /* รวม padding และ border */
}

.btn-add-column {
  background-color: #10b981;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
  height: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  align-self: flex-start;
  margin-top: 0.5rem;
}

.btn-add-column:hover {
  background-color: #059669;
}

.column-card {
  min-width: 0;
  height: auto;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>