export function getUsers() {
  const data = localStorage.getItem("users");
  try {
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing users from localStorage", error);
    return [];
  }
}

export function saveUsers(users) {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage", error);
  }
}

export function setCurrentUser(userId) {
  try {
    localStorage.setItem("currentUserId", userId);
  } catch (error) {
    console.error("Error setting current user", error);
  }
}

export function getCurrentUser() {
  try {
    return localStorage.getItem("currentUserId");
  } catch (error) {
    console.error("Error getting current user", error);
    return null;
  }
}

export function getSessionUser() {
  const currentUserId = getCurrentUser();
  if (!currentUserId) return null;

  const users = getUsers();
  return users.find(user => String(user.id) === String(currentUserId)) || null;
}


