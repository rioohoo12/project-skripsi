<template>
  <aside class="sidebar" :class="themeClass">
    <div class="sidebar-header">
      <div class="logo-wrap">
        <img src="/slapur-logo.png" alt="Logo SLAPUR" class="sidebar-logo" />
        <span class="sidebar-title">SLAPUR System</span>
      </div>
      <p class="sidebar-subtitle">Dashboard Siswa</p>
      <span class="sidebar-badge" :class="themeClass">{{ jenisKelamin === 'perempuan' ? 'Siswa Perempuan' : 'Siswa Laki-laki' }}</span>
    </div>
    <nav class="sidebar-nav">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="`/siswa/${jenisKelamin}/${item.path}`"
        class="nav-item"
        active-class="active"
        :exact-active-class="item.exact ? 'active' : ''"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>

      <!-- Data Kelas (dengan submenu) -->
      <div class="nav-group">
        <button type="button" class="nav-item nav-trigger" :class="{ active: isDataKelasActive }" @click="toggle('data-kelas')">
          <span class="nav-icon">🏫</span>
          <span class="nav-label">Data Kelas</span>
          <span class="nav-chevron" :class="{ open: openGroup === 'data-kelas' }">›</span>
        </button>
        <div v-show="openGroup === 'data-kelas'" class="nav-sub">
          <router-link :to="`/siswa/${jenisKelamin}/data-kelas/review`" class="nav-sub-item" active-class="active">Review Kelas</router-link>
        </div>
      </div>

      <!-- Pendaftaran -->
      <div class="nav-group">
        <button type="button" class="nav-item nav-trigger" :class="{ active: isPendaftaranActive }" @click="toggle('pendaftaran')">
          <span class="nav-icon">📋</span>
          <span class="nav-label">Pendaftaran</span>
          <span class="nav-chevron" :class="{ open: openGroup === 'pendaftaran' }">›</span>
        </button>
        <div v-show="openGroup === 'pendaftaran'" class="nav-sub">
          <router-link :to="`/siswa/${jenisKelamin}/pendaftaran/status`" class="nav-sub-item" active-class="active">Status Pendaftaran</router-link>
          <router-link :to="`/siswa/${jenisKelamin}/pendaftaran/permohonan`" class="nav-sub-item" active-class="active">Permohonan Pendaftaran</router-link>
          <router-link :to="`/siswa/${jenisKelamin}/pendaftaran/kamar`" class="nav-sub-item" active-class="active">Pilih Kamar</router-link>
          <router-link :to="`/siswa/${jenisKelamin}/pendaftaran/kurikulum`" class="nav-sub-item" active-class="active">Kurikulum</router-link>
        </div>
      </div>

      <!-- Clearance Slip -->
      <div class="nav-group">
        <button type="button" class="nav-item nav-trigger" :class="{ active: isClearanceActive }" @click="toggle('clearance')">
          <span class="nav-icon">✅</span>
          <span class="nav-label">Clearance Slip</span>
          <span class="nav-chevron" :class="{ open: openGroup === 'clearance' }">›</span>
        </button>
        <div v-show="openGroup === 'clearance'" class="nav-sub">
          <router-link :to="`/siswa/${jenisKelamin}/clearance/pembayaran-pendaftaran`" class="nav-sub-item" active-class="active">Pembayaran Pendaftaran</router-link>
          <router-link :to="`/siswa/${jenisKelamin}/clearance/mid`" class="nav-sub-item" active-class="active">MID</router-link>
          <router-link :to="`/siswa/${jenisKelamin}/clearance/final`" class="nav-sub-item" active-class="active">Final Test</router-link>
        </div>
      </div>

      <!-- Administrasi -->
      <div class="nav-group">
        <button type="button" class="nav-item nav-trigger" :class="{ active: isAdministrasiActive }" @click="toggle('administrasi')">
          <span class="nav-icon">📁</span>
          <span class="nav-label">Administrasi</span>
          <span class="nav-chevron" :class="{ open: openGroup === 'administrasi' }">›</span>
        </button>
        <div v-show="openGroup === 'administrasi'" class="nav-sub">
          <router-link :to="`/siswa/${jenisKelamin}/administrasi/surat`" class="nav-sub-item" active-class="active">Permohonan Surat</router-link>
          <router-link :to="`/siswa/${jenisKelamin}/administrasi/dokumen`" class="nav-sub-item" active-class="active">Upload Dokumen</router-link>
          <router-link :to="`/siswa/${jenisKelamin}/administrasi/ekstrakurikuler`" class="nav-sub-item" active-class="active">Ekstrakurikuler</router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  jenisKelamin: { type: String, default: 'laki-laki' },
});

const route = useRoute();
const openGroup = ref('');

const themeClass = computed(() => `theme-${props.jenisKelamin}`);

const menuItems = [
  { path: 'dashboard', label: 'Dashboard', icon: '🏠', exact: true },
  { path: 'biodata', label: 'Biodata', icon: '👤' },
  { path: 'keuangan', label: 'Keuangan', icon: '💰' },
  { path: 'kafetaria', label: 'Kafetaria', icon: '🍽️' },
  { path: 'absensi', label: 'Absensi', icon: '📝' },
  { path: 'grade', label: 'Grade/Nilai', icon: '📊' },
];

const isDataKelasActive = computed(() => route.path.includes('data-kelas'));
const isPendaftaranActive = computed(() => route.path.includes('pendaftaran'));
const isClearanceActive = computed(() => route.path.includes('clearance'));
const isAdministrasiActive = computed(() => route.path.includes('administrasi'));

function toggle(group) {
  openGroup.value = openGroup.value === group ? '' : group;
}

watch(
  () => route.path,
  (path) => {
    if (path.includes('data-kelas')) openGroup.value = 'data-kelas';
    else if (path.includes('pendaftaran')) openGroup.value = 'pendaftaran';
    else if (path.includes('clearance')) openGroup.value = 'clearance';
    else if (path.includes('administrasi')) openGroup.value = 'administrasi';
  },
  { immediate: true }
);
</script>

<style scoped>
.sidebar {
  width: 280px;
  min-height: 100vh;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  border-radius: 0 20px 20px 0;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.06);
  transition: background 0.25s ease;
}
.sidebar.theme-laki-laki {
  background: linear-gradient(180deg, #0f766e 0%, #0d9488 25%, #14b8a6 60%, #2dd4bf 100%);
}
.sidebar.theme-perempuan {
  background: linear-gradient(180deg, #6d28d9 0%, #7c3aed 25%, #8b5cf6 60%, #a78bfa 100%);
}
.sidebar-header {
  padding: 0 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
}
.logo-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.sidebar-logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.sidebar-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
}
.sidebar-subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 0.35rem;
  margin-left: 3.25rem;
}
.sidebar-badge {
  display: inline-block;
  margin-top: 0.5rem;
  margin-left: 3.25rem;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}
.sidebar-badge.theme-laki-laki {
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
}
.sidebar-badge.theme-perempuan {
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
}
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0 0.75rem;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 12px;
  background: none;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  text-align: left;
  font-family: inherit;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}
.nav-item.active {
  background: #fff;
  color: #134e4a;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.theme-perempuan .nav-item.active {
  color: #5b21b6;
}
.nav-icon {
  font-size: 1.2rem;
  width: 1.5rem;
  text-align: center;
}
.nav-label {
  flex: 1;
}
.nav-chevron {
  font-size: 1.1rem;
  opacity: 0.8;
  transform: rotate(0deg);
  transition: transform 0.2s;
}
.nav-chevron.open {
  transform: rotate(90deg);
}
.nav-trigger {
  margin-bottom: 0.15rem;
}
.nav-group {
  margin-bottom: 0.15rem;
}
.nav-sub {
  padding-left: 2.25rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.nav-sub-item {
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.nav-sub-item:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
.nav-sub-item.active {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
  font-weight: 600;
}
@media (max-width: 900px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    border-radius: 0;
  }
}
</style>
