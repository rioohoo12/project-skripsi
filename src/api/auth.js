const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem('auth_token');
}

function setToken(token) {
  if (token) localStorage.setItem('auth_token', token);
  else localStorage.removeItem('auth_token');
}

const REQUEST_TIMEOUT_MS = 12000; // 12 detik

async function request(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    ...options.headers,
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let res;
  try {
    res = await fetch(`${API_BASE}${url}`, { ...options, headers, signal: controller.signal });
  } catch (e) {
    clearTimeout(timeoutId);
    if (e.name === 'AbortError') {
      throw new Error('Permintaan terlalu lama. Pastikan backend berjalan (php artisan serve di folder backend).');
    }
    throw new Error('Koneksi gagal. Pastikan backend berjalan (php artisan serve di folder backend).');
  }
  clearTimeout(timeoutId);
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_) {
    data = {};
  }
  if (!res.ok) {
    let msg = data.message || '';
    if (!msg && data.errors && typeof data.errors === 'object') {
      const parts = Object.values(data.errors).flat().filter(Boolean);
      msg = parts[0] || parts.join(' ');
    }
    if (!msg) {
      if (res.status === 0 || res.status >= 500) {
        msg = 'Server bermasalah atau backend tidak berjalan. Jalankan: php artisan serve di folder backend.';
      } else if (res.status === 404) {
        msg = 'Endpoint tidak ditemukan. Pastikan URL API benar.';
      } else {
        msg = `Terjadi kesalahan (${res.status}). Buka F12 > Network untuk detail.`;
      }
    }
    const err = new Error(msg);
    err.status = res.status;
    err.errors = data.errors || null;
    throw err;
  }
  return data;
}

export const authApi = {
  async register(payload) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        nama: payload.nama,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.confirmPassword,
        jenis_kelamin: payload.jenisKelamin,
      }),
    });
  },
  async login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  async loginGuru(email, password) {
    return request('/auth/login-guru', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  async loginStaff(email, password) {
    return request('/auth/login-staff', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  async registerGuru(payload) {
    return request('/auth/register-guru', {
      method: 'POST',
      body: JSON.stringify({
        nama: payload.nama,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.confirmPassword,
      }),
    });
  },
  async forgotPasswordGuru(email) {
    return request('/auth/forgot-password-guru', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  async resetPasswordGuru(payload) {
    return request('/auth/reset-password-guru', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        token: payload.token,
        password: payload.password,
        password_confirmation: payload.confirmPassword,
      }),
    });
  },
  async logout() {
    const token = getToken();
    if (!token) return;
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      setToken(null);
    }
  },
  setToken,
  getToken,
};
