<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <h2>{{ task?.id ? "Edit Task" : "New Task" }}</h2>
      <form @submit.prevent="submitForm">

        <label>
          Task Name:
          <input v-model="localTask.name" required />
        </label>

        <label>
          Tags:
          <div class="tags-selected">
            <span
              v-for="tag in localTask.tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
              <button type="button" class="remove-tag" @click="removeTag(tag)">×</button>
            </span>
          </div>

          <select v-model="newTag" class="tag-select">
            <option disabled value="">-- Select tag --</option>
            <option
              v-for="tag in availableTagsToAdd"
              :key="tag"
              :value="tag"
            >
              {{ tag }}
            </option>
          </select>
          <button type="button" class="btn-add-tag" @click="addTag" :disabled="!newTag">Add Tag</button>
        </label>

        <label>
          Assignees:
          <select v-model="localTask.assignees" multiple class="assignee-select">
            <option v-for="member in members" :key="member.id" :value="member.id">
              {{ member.name }}
            </option>
          </select>
        </label>

        <div class="modal-actions">
          <button type="submit" class="btn-save">Save</button>
          <button type="button" class="btn-cancel" @click="close">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskModal",
  props: {
    task: { type: Object, default: null },
    members: { type: Array, default: () => [] },
  },
  data() {
    return {
      localTask: this.task
        ? { ...this.task }
        : { name: "", tags: [], assignees: [] },
      availableTags: ["bug", "feature", "urgent", "frontend", "backend"],
      newTag: "",
    };
  },
  computed: {
    availableTagsToAdd() {
      return this.availableTags.filter((t) => !this.localTask.tags.includes(t));
    },
  },
  methods: {
  addTag() {
    if (this.newTag && !this.localTask.tags.includes(this.newTag)) {
      this.localTask.tags.push(this.newTag);
      this.newTag = "";
    }
  },
  removeTag(tag) {
    this.localTask.tags = this.localTask.tags.filter((t) => t !== tag);
  },
  submitForm() {
    if (!this.localTask.name.trim()) {
      alert("ต้องระบุชื่อ Task");
      return;
    }
    const task = {
      id: this.localTask.id || Date.now().toString(), // แนะนำใช้ UUID ในโปรดักชัน
      name: this.localTask.name.trim(),
      tags: [...this.localTask.tags],
      assignees: [...this.localTask.assignees],
    };
    console.log("Emit Task:", task); // ดีบัก
    this.$emit("save-task", task);
  },
  close() {
    this.$emit("close");
  },
},
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  width: 360px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.modal h2 {
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #111;
}

label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
}

input[type="text"],
input[type="email"],
select {
  width: 100%;
  padding: 0.5rem 0.6rem;
  margin-top: 0.3rem;
  border-radius: 6px;
  border: 1.8px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input[type="text"]:focus,
select:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 4px rgba(37, 99, 235, 0.5);
}

.tags-selected {
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background-color: #e0e7ff;
  color: #1e40af;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  user-select: none;
  box-shadow: 0 1px 3px rgba(30, 64, 175, 0.3);
  transition: background-color 0.3s ease;
}

.tag:hover {
  background-color: #c7d2fe;
}

.remove-tag {
  background: transparent;
  border: none;
  color: #1e40af;
  font-weight: 700;
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  user-select: none;
  transition: color 0.2s ease;
}

.remove-tag:hover {
  color: #dc2626;
}

.tag-select {
  margin-top: 0.5rem;
  border-radius: 6px;
  font-size: 1rem;
  border: 1.8px solid #ccc;
  padding: 0.4rem;
  transition: border-color 0.3s ease;
  width: 70%;
  cursor: pointer;
}

.tag-select:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 4px rgba(37, 99, 235, 0.5);
}

.btn-add-tag {
  margin-left: 0.8rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border: none;
  padding: 0.45rem 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.btn-add-tag:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.btn-add-tag:hover:not(:disabled) {
  background-color: #1e40af;
}

.assignee-select {
  margin-top: 0.3rem;
  border-radius: 6px;
  font-size: 1rem;
  border: 1.8px solid #ccc;
  padding: 0.4rem;
  width: 100%;
  height: 100px;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.assignee-select:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.5);
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn-save,
.btn-cancel {
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-save {
  background-color: #2563eb;
  color: white;
}

.btn-save:hover {
  background-color: #1e40af;
}

.btn-cancel {
  background-color: #d1d5db;
  color: #374151;
}

.btn-cancel:hover {
  background-color: #9ca3af;
}
</style>
