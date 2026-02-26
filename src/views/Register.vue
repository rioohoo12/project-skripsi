<template>
  <div class="register-page">
    <div class="register-card">
      <img src="/slapur-logo.png" alt="SLAPUR" class="register-logo" />
      <h1 class="register-title">Buat Akun</h1>
      <p class="register-subtitle">Daftar untuk mengakses SLAPUR System</p>

      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="nama">Nama Lengkap</label>
          <input
            id="nama"
            v-model="form.nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Masukkan email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Min. 6 karakter"
            required
            minlength="6"
          />
        </div>
        <div class="form-group">
          <label for="confirm">Konfirmasi Password</label>
          <input
            id="confirm"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Ulangi password"
            required
          />
        </div>
        <div class="form-group">
          <label for="jenis">Jenis Kelamin</label>
          <select id="jenis" v-model="form.jenisKelamin" required>
            <option value="laki-laki">Siswa Laki-laki</option>
            <option value="perempuan">Siswa Perempuan</option>
          </select>
        </div>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>
        <button type="submit" class="register-btn" :disabled="loading">
          {{ loading ? 'Memproses...' : 'Daftar' }}
        </button>
      </form>
      <p class="register-footer">
        Sudah punya akun?
        <router-link to="/login" class="link">Login di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const STORAGE_USERS = 'slapur_users';

const router = useRouter();
const form = reactive({
  nama: '',
  email: '',
  password: '',
  confirmPassword: '',
  jenisKelamin: 'laki-laki',
});
const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

function handleRegister() {
  errorMsg.value = '';
  successMsg.value = '';
  if (form.password !== form.confirmPassword) {
    errorMsg.value = 'Konfirmasi password tidak sama.';
    return;
  }
  if (form.password.length < 6) {
    errorMsg.value = 'Password minimal 6 karakter.';
    return;
  }
  loading.value = true;
  setTimeout(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      const users = raw ? JSON.parse(raw) : [];
      const email = form.email.trim().toLowerCase();
      if (users.some((u) => u.email.toLowerCase() === email)) {
        errorMsg.value = 'Email sudah terdaftar. Gunakan email lain atau login.';
        loading.value = false;
        return;
      }
      users.push({
        nama: form.nama.trim(),
        email,
        password: form.password,
        jenis_kelamin: form.jenisKelamin,
      });
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
      successMsg.value = 'Akun berhasil dibuat. Mengalihkan ke login...';
      setTimeout(() => {
        router.push('/login');
      }, 1200);
    } catch (e) {
      errorMsg.value = 'Pendaftaran gagal. Coba lagi.';
    }
    loading.value = false;
  }, 400);
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 50%, #f5f3ff 100%);
  padding: 1rem;
}
.register-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.register-logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.25rem;
  display: block;
}
.register-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}
.register-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}
.register-form {
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
.success-msg {
  font-size: 0.875rem;
  color: #0f766e;
  margin-bottom: 1rem;
}
.register-btn {
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
.register-btn:hover:not(:disabled) {
  background: #0d9488;
}
.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.register-footer {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #64748b;
}
.register-footer .link {
  color: #0f766e;
  font-weight: 600;
  text-decoration: none;
}
.register-footer .link:hover {
  text-decoration: underline;
}
</style>
