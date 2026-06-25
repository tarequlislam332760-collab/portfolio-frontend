const BASE_URL = "https://portfolio-backend-bjtg.onrender.com/api";

const getToken = () => sessionStorage.getItem("admin_token");

async function api(endpoint, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { headers, ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
}

export const authAPI = {
  login:    (email, password) => api("/auth/login",    { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name, email, password) => api("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  me:       () => api("/auth/me"),
};

export const projectsAPI = {
  getAll:  ()          => api("/projects"),
  create:  (data)      => api("/projects",       { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data)  => api(`/projects/${id}`,  { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)        => api(`/projects/${id}`,  { method: "DELETE" }),
};

export const blogsAPI = {
  getAll:     ()         => api("/blogs"),
  getAllAdmin: ()         => api("/blogs/all"),
  create:     (data)     => api("/blogs",       { method: "POST",   body: JSON.stringify(data) }),
  update:     (id, data) => api(`/blogs/${id}`,  { method: "PUT",    body: JSON.stringify(data) }),
  delete:     (id)       => api(`/blogs/${id}`,  { method: "DELETE" }),
};

export const messagesAPI = {
  send:    (data) => api("/messages",           { method: "POST",   body: JSON.stringify(data) }),
  getAll:  ()     => api("/messages"),
  markRead:(id)   => api(`/messages/${id}/read`,{ method: "PUT" }),
  delete:  (id)   => api(`/messages/${id}`,     { method: "DELETE" }),
};

export const testimonialsAPI = {
  getAll:  ()          => api("/testimonials"),
  create:  (data)      => api("/testimonials",       { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data)  => api(`/testimonials/${id}`, { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)        => api(`/testimonials/${id}`, { method: "DELETE" }),
};

export const skillsAPI = {
  getAll:  ()          => api("/skills"),
  create:  (data)      => api("/skills",        { method: "POST",   body: JSON.stringify(data) }),
  update:  (id, data)  => api(`/skills/${id}`,  { method: "PUT",    body: JSON.stringify(data) }),
  delete:  (id)        => api(`/skills/${id}`,  { method: "DELETE" }),
};

export const profileAPI = {
  get:    ()     => api("/profile"),
  update: (data) => api("/profile", { method: "PUT", body: JSON.stringify(data) }),
};

export const analyticsAPI = {
  getStats: () => api("/analytics"),
};

export default api;

export const uploadAPI = {
  uploadImage: (base64Image) => api("/upload", {
    method: "POST",
    body: JSON.stringify({ image: base64Image }),
  }),
};
