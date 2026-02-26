<template>
  <div class="login-page">
    <div class="login-card">
      <img src="/slapur-logo.png" alt="SLAPUR" class="login-logo" />
      <h1 class="login-title">SLAPUR System</h1>
      <p class="login-subtitle">Silakan login dengan akun Anda</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Masukkan email"
            required
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Masukkan password"
            required
            autocomplete="current-password"
          />
        </div>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'Memproses...' : 'Login' }}
        </button>
      </form>
      <p class="login-footer">
        Belum punya akun?
        <router-link to="/register" class="link">Daftar di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({
  email: '',
  password: '',
});
const loading = ref(false);
const errorMsg = ref('');

onMounted(() => {
  try {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      const u = JSON.parse(user);
      const jk = u.jenis_kelamin === 'perempuan' ? 'perempuan' : 'laki-laki';
      router.replace(`/siswa/${jk}/dashboard`);
    }
  } catch (_) {}
});

const STORAGE_USERS = 'slapur_users';

function handleLogin() {
  errorMsg.value = '';
  loading.value = true;
  setTimeout(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      const users = raw ? JSON.parse(raw) : [];
      const email = form.email.trim().toLowerCase();
      const found = users.find((u) => u.email.toLowerCase() === email);
      if (!found) {
        errorMsg.value = 'Email belum terdaftar. Silakan daftar akun dulu.';
        loading.value = false;
        return;
      }
      if (found.password !== form.password) {
        errorMsg.value = 'Password salah.';
        loading.value = false;
        return;
      }
      const user = {
        email: found.email,
        nama: found.nama || found.email.split('@')[0],
        jenis_kelamin: found.jenis_kelamin,
      };
      localStorage.setItem('auth_token', 'token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(user));
      router.push(`/siswa/${found.jenis_kelamin}/dashboard`);
    } catch (e) {
      errorMsg.value = 'Login gagal. Coba lagi.';
    }
    loading.value = false;
  }, 400);
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 50%, #f5f3ff 100%);
  padding: 1rem;
}
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.login-logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.25rem;
  display: block;
}
.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}
.login-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}
.login-form {
  text-align: left;
}
.form-group {
  margin-bottom: 1.25rem;
}
.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.4rem;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}
.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #0f766e;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}
.form-group input::placeholder {
  color: #9ca3af;
}
.form-group select {
  cursor: pointer;
  background: #fff;
}
.error-msg {
  font-size: 0.875rem;
  color: #dc2626;
  margin-bottom: 1rem;
}
.login-btn {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border: none;
  border-radius: 12px;
  background: #0f766e;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.login-btn:hover:not(:disabled) {
  background: #0d9488;
}
.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.login-footer {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #64748b;
}
.login-footer .link {
  color: #0f766e;
  font-weight: 600;
  text-decoration: none;
}
.login-footer .link:hover {
  text-decoration: underline;
}
</style>
