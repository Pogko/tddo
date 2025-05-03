import { db } from './firebase.js';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function registerUser(name, username, password) {
  if (!username || !password || !name) {
    throw new Error('Semua field harus diisi.');
  }

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const existing = await getDocs(q);

  if (!existing.empty) {
    throw new Error('Username sudah dipakai.');
  }

  const passwordHash = await hashPassword(password);

  const userData = {
    name,
    username,
    passwordHash,
    createdAt: Timestamp.now()
  };

  await addDoc(usersRef, userData);
  return { success: true };
}

export async function loginUser(username, password) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error('Username tidak ditemukan.');
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();
  const inputPasswordHash = await hashPassword(password);

  if (inputPasswordHash !== userData.passwordHash) {
    throw new Error('Password salah.');
  }

  localStorage.setItem('user', JSON.stringify({
    id: userDoc.id,
    username: userData.username,
    name: userData.name
  }));

  return { success: true };
}

export function logoutUser() {
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}