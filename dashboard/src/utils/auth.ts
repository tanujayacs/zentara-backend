export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // Decode JWT token (simple base64 decode)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload; // { id, role }
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};