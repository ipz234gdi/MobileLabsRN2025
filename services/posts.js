import api from "./api";

export const getPosts = (uid) => api.get(`/users/${uid}/posts.json`);

export const createPost = (uid, body) =>
  api.post(`/users/${uid}/posts.json`, body);

export const updatePost = (uid, id, body) =>
  api.patch(`/users/${uid}/posts/${id}.json`, body);

export const deletePost = (uid, id) =>
  api.delete(`/users/${uid}/posts/${id}.json`);
