<template>
  <div class="dashboard-layout" :class="themeClass">
    <SiswaSidebar :jenis-kelamin="jenisKelamin" />
    <main class="main-content">
      <header class="topbar">
        <div class="topbar-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <p class="page-desc">Dashboard Siswa</p>
        </div>
        <div class="topbar-right">
          <span class="user-badge" :class="themeClass">{{ labelSiswa }}</span>
          <button type="button" class="btn-logout" @click="handleLogout" title="Keluar">
            Logout
          </button>
        </div>
      </header>
      <div class="content-area">
        <router-view v-slot="{ Component }">
          <component :is="Component" :jenis-kelamin="jenisKelamin" />
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SiswaSidebar from '@/components/SiswaSidebar.vue';

const router = useRouter();
function handleLogout() {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
  } catch (_) {}
  router.push('/login');
}

const props = defineProps({
  jenisKelamin: { type: String, default: 'laki-laki' },
});

const route = useRoute();
const themeClass = computed(() => `theme-${props.jenisKelamin}`);

const labelSiswa = computed(() =>
  props.jenisKelamin === 'perempuan' ? 'Siswa Perempuan' : 'Siswa Laki-laki'
);

const pageTitle = computed(() => {
  const name = route.name || '';
  const map = {
    Dashboard: 'Dashboard',
    Biodata: 'Biodata',
    Keuangan: 'Keuangan',
    Kafetaria: 'Kafetaria',
    Absensi: 'Absensi',
    DataKelas: 'Data Kelas',
    ReviewKelas: 'Review Kelas',
    GradeNilai: 'Grade / Nilai',
    Pendaftaran: 'Pendaftaran',
    StatusPendaftaran: 'Status Pendaftaran',
    PermohonanPendaftaran: 'Permohonan Pendaftaran',
    PilihKamar: 'Pilih Kamar',
    Kurikulum: 'Kurikulum',
    ClearanceSlip: 'Clearance Slip',
    ClearanceMid: 'MID',
    ClearanceFinal: 'Final Test',
    Administrasi: 'Administrasi',
    PermohonanSurat: 'Permohonan Surat',
    UploadDokumen: 'Upload Dokumen',
    Ekstrakurikuler: 'Ekstrakurikuler',
  };
  return map[name] || 'Dashboard';
});
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.dashboard-layout.theme-laki-laki .main-content {
  background: linear-gradient(180deg, #f0fdfa 0%, #ecfeff 40%, #f8fafc 100%);
}
.dashboard-layout.theme-perempuan .main-content {
  background: linear-gradient(180deg, #faf5ff 0%, #f5f3ff 30%, #f8fafc 100%);
}
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 10;
  border-left: 4px solid transparent;
}
.dashboard-layout.theme-laki-laki .topbar {
  border-left-color: #0f766e;
}
.dashboard-layout.theme-perempuan .topbar {
  border-left-color: #7c3aed;
}
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
}
.page-desc {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.2rem;
}
.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.btn-logout {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.btn-logout:hover {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}
.user-badge {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
}
.user-badge.theme-laki-laki {
  background: #ccfbf1;
  color: #134e4a;
  font-weight: 600;
}
.user-badge.theme-perempuan {
  background: #ede9fe;
  color: #5b21b6;
  font-weight: 600;
}
.content-area {
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;
}
@media (max-width: 900px) {
  .dashboard-layout {
    flex-direction: column;
  }
  .content-area {
    padding: 1rem;
  }
  .topbar {
    padding: 1rem;
  }
}
</style>
