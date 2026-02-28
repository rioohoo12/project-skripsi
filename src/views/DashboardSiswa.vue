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
          <div
            class="profile-trigger"
            :class="themeClass"
            :aria-expanded="profileOpen"
            aria-haspopup="true"
            @click="profileOpen = !profileOpen"
          >
            <div class="profile-avatar">{{ inisialNama }}</div>
            <span class="profile-name">{{ namaSiswa }}</span>
            <span class="profile-chevron" :class="{ open: profileOpen }">▼</span>
          </div>
          <Transition name="dropdown">
            <div v-if="profileOpen" class="profile-dropdown" :class="themeClass">
              <router-link
                :to="`/siswa/${jenisKelamin}/biodata`"
                class="profile-dropdown-item"
                @click="profileOpen = false"
              >
                Profil / Biodata
              </router-link>
              <button type="button" class="profile-dropdown-item logout" @click="handleLogoutAndClose">
                Logout
              </button>
            </div>
          </Transition>
          <div v-if="profileOpen" class="profile-backdrop" @click="profileOpen = false" aria-hidden="true" />
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
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SiswaSidebar from '@/components/SiswaSidebar.vue';

const router = useRouter();
const profileOpen = ref(false);

function handleLogout() {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
  } catch (_) {}
  router.push('/siswa');
}

function handleLogoutAndClose() {
  profileOpen.value = false;
  handleLogout();
}

const props = defineProps({
  jenisKelamin: { type: String, default: 'laki-laki' },
});

const route = useRoute();
const themeClass = computed(() => `theme-${props.jenisKelamin}`);

const user = computed(() => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
});
const namaSiswa = computed(() => user.value.name || user.value.nama || 'Siswa');
const inisialNama = computed(() => {
  const n = namaSiswa.value.trim();
  if (!n) return '?';
  const parts = n.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return n.slice(0, 2).toUpperCase();
});

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
    ClearancePembayaran: 'Pembayaran Pendaftaran',
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
  gap: 0.5rem;
  position: relative;
}

.profile-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.85rem 0.4rem 0.4rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.profile-trigger:hover {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
.profile-trigger.theme-laki-laki:hover {
  border-color: #99f6e4;
  background: #f0fdfa;
}
.profile-trigger.theme-perempuan:hover {
  border-color: #ddd6fe;
  background: #f5f3ff;
}

.profile-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}
.profile-trigger.theme-laki-laki .profile-avatar {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
}
.profile-trigger.theme-perempuan .profile-avatar {
  background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%);
}

.profile-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-chevron {
  font-size: 0.6rem;
  color: #64748b;
  transition: transform 0.2s;
}
.profile-chevron.open {
  transform: rotate(180deg);
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 180px;
  padding: 0.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;
  z-index: 20;
}
.profile-dropdown.theme-laki-laki {
  border-top: 3px solid #0f766e;
}
.profile-dropdown.theme-perempuan {
  border-top: 3px solid #7c3aed;
}

.profile-dropdown-item {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #334155;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
  text-decoration: none;
}
.profile-dropdown-item:hover {
  background: #f1f5f9;
}
.profile-dropdown-item.logout {
  color: #dc2626;
}
.profile-dropdown-item.logout:hover {
  background: #fef2f2;
}

.profile-backdrop {
  position: fixed;
  inset: 0;
  z-index: 15;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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
