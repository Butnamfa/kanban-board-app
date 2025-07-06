<template>
  <div class="task-card">
    <div class="task-header">
      <span class="task-name" @click="editTask">{{ task.name }}</span>
      <button class="btn-delete" @click="$emit('delete-task', task.id)">✕</button>
    </div>
    <div class="task-tags" v-if="task.tags && task.tags.length">
      <span class="tag" v-for="tag in task.tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="task-assignees" v-if="task.assignees && task.assignees.length">
      <small>Assigned to: {{ getAssigneeNames() }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    task: { type: Object, required: true },
    members: { type: Array, default: () => [] }, // สมาชิกในบอร์ด
  },
  methods: {
    editTask() {
      this.$emit("edit-task", this.task);
    },
    getAssigneeNames() {
      // เอาชื่อสมาชิกที่ถูกมอบหมายมาแสดง
      return this.members
        .filter((m) => this.task.assignees.includes(m.id))
        .map((m) => m.name)
        .join(", ");
    },
  },
};
</script>

<style scoped>
.task-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  cursor: default;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-name {
  font-weight: 600;
  cursor: pointer;
}

.btn-delete {
  background: transparent;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 1rem;
}

.task-tags {
  margin-top: 0.3rem;
}

.tag {
  background-color: #efefef;
  border-radius: 3px;
  padding: 0.15rem 0.4rem;
  margin-right: 0.3rem;
  font-size: 0.8rem;
}

.task-assignees {
  margin-top: 0.3rem;
  font-size: 0.75rem;
  color: #555;
}
</style>
