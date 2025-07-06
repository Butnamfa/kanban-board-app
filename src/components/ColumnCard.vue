<template>
  <div class="column-card">
    <div class="column-header">
      <input
        v-model="localName"
        @blur="saveName"
        @keyup.enter="saveName"
        class="column-name-input"
      />
      <button class="btn-delete" @click="$emit('delete-column', column.id)">✕</button>
    </div>

    <div class="task-list">
      <div v-if="!column.tasks || column.tasks.length === 0" class="no-tasks">
        ยังไม่มี Task
      </div>
      <TaskCard
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
        :members="members"
        @edit-task="openEditTaskModal"
        @delete-task="deleteTask"
      />
    </div>

    <button class="btn-add-task" @click="openNewTaskModal">+ เพิ่ม Task</button>

    <TaskModal
      v-if="showTaskModal"
      :task="editingTask"
      :members="members"
      @close="closeTaskModal"
      @save-task="saveTask"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import TaskCard from './TaskCard.vue';
import TaskModal from './TaskModal.vue';

export default {
  name: "ColumnCard",
  components: { TaskCard, TaskModal },
  props: {
    column: { type: Object, required: true },
    members: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const localName = ref(props.column.name);
    const showTaskModal = ref(false);
    const editingTask = ref(null);

    watch(
      () => props.column,
      (newColumn) => {
        if (!Array.isArray(newColumn.tasks)) {
          console.warn(`Task ในคอลัมน์ ${newColumn.id} ไม่ใช่อาร์เรย์ เริ่มต้นใหม่...`);
          newColumn.tasks = [];
        }
        console.log(`Task ในคอลัมน์ ${newColumn.id}:`, newColumn.tasks);
      },
      { immediate: true }
    );

    watch(
      () => props.column.name,
      (newName) => {
        localName.value = newName;
      }
    );

    const saveName = () => {
      if (localName.value.trim()) {
        emit('update-column-name', { id: props.column.id, name: localName.value.trim() });
      }
    };

    const openNewTaskModal = () => {
      editingTask.value = null;
      showTaskModal.value = true;
    };

    const openEditTaskModal = (task) => {
      editingTask.value = { ...task };
      showTaskModal.value = true;
    };

    const closeTaskModal = () => {
      showTaskModal.value = false;
      editingTask.value = null;
    };

    const saveTask = (task) => {
      emit('save-task', { columnId: props.column.id, task });
      showTaskModal.value = false;
    };

    const deleteTask = (taskId) => {
      emit('delete-task', { columnId: props.column.id, taskId });
    };

    return {
      localName,
      showTaskModal,
      editingTask,
      saveName,
      openNewTaskModal,
      openEditTaskModal,
      closeTaskModal,
      saveTask,
      deleteTask,
    };
  },
};
</script>

<style scoped>
.column-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%; /* ปรับตาม Grid */
  max-width: 100%; /* จำกัดไม่ให้เกิน */
  height: auto; /* ความสูงตามเนื้อหา */
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* ป้องกันการขยายเกิน */
  box-sizing: border-box; /* รวม padding และ border */
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.column-name-input {
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  padding: 0 0.2rem;
}

.btn-delete {
  background: transparent;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 1rem;
}

.task-list {
  flex-grow: 1; /* ขยายตามจำนวน Task */
  overflow-y: auto; /* รองรับ Task เยอะ */
  min-height: 0; /* ป้องกันปัญหาการขยายเกิน */
}

.no-tasks {
  color: #888;
  text-align: center;
  padding: 0.5rem 0;
}

.btn-add-task {
  background-color: #2563eb;
  border: none;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 0.3rem;
  font-size: 0.9rem;
}

.btn-add-task:hover {
  background-color: #1d4ed8;
}
</style>