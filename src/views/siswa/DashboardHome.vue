<template>
  <div class="dashboard-home">
    <div class="cards-row">
      <div class="stat-card" :class="themeClass">
        <span class="stat-icon">📊</span>
        <div class="stat-content">
          <span class="stat-value">12</span>
          <span class="stat-label">Mata Pelajaran</span>
        </div>
      </div>
      <div class="stat-card" :class="themeClass">
        <span class="stat-icon">✅</span>
        <div class="stat-content">
          <span class="stat-value">98%</span>
          <span class="stat-label">Kehadiran</span>
        </div>
      </div>
      <div class="stat-card" :class="themeClass">
        <span class="stat-icon">💰</span>
        <div class="stat-content">
          <span class="stat-value">Lunas</span>
          <span class="stat-label">Status Keuangan</span>
        </div>
      </div>
    </div>
    <PageCard :jenis-kelamin="jenisKelamin" class="welcome-card">
      <template #header>Selamat datang di Dashboard</template>
      <p class="welcome-text">
        Gunakan menu di samping untuk mengakses Biodata, Keuangan, Kafetaria, Absensi, Data Kelas, Grade/Nilai,
        Pendaftaran, Clearance Slip, dan Administrasi.
      </p>
      <div class="quick-links">
        <router-link :to="`/siswa/${jenisKelamin}/biodata`" class="quick-link">Biodata</router-link>
        <router-link :to="`/siswa/${jenisKelamin}/keuangan`" class="quick-link">Keuangan</router-link>
        <router-link :to="`/siswa/${jenisKelamin}/absensi`" class="quick-link">Absensi</router-link>
        <router-link :to="`/siswa/${jenisKelamin}/grade`" class="quick-link">Grade / Nilai</router-link>
      </div>
    </PageCard>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import PageCard from '@/components/PageCard.vue';

const props = defineProps({ jenisKelamin: { type: String, default: 'laki-laki' } });
const themeClass = computed(() => 'theme-' + props.jenisKelamin);
</script>

<style scoped>
.dashboard-home {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.cards-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.stat-card {
  padding: 1.25rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
.stat-card.theme-laki-laki {
  background: linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%);
  border-color: #5eead4;
}
.stat-card.theme-laki-laki .stat-value {
  color: #134e4a;
}
.stat-card.theme-laki-laki .stat-label {
  color: #0f766e;
}
.stat-card.theme-perempuan {
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
  border-color: #c4b5fd;
}
.stat-card.theme-perempuan .stat-value {
  color: #4c1d95;
}
.stat-card.theme-perempuan .stat-label {
  color: #5b21b6;
}
.stat-icon {
  font-size: 2rem;
}
.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.stat-value {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1e293b;
}
.stat-label {
  font-size: 0.85rem;
  color: #64748b;
}
.welcome-card {
  max-width: 100%;
}
.welcome-text {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}
.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.quick-link {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: var(--primary-bg);
  color: var(--primary-dark);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}
.quick-link:hover {
  opacity: 0.9;
}
</style>
