<template>
  <div class="dashboard-home">
    <!-- Welcome Banner -->
    <div class="welcome-banner" :class="themeClass">
      <h2 class="welcome-title">Selamat Datang di Sistem Online</h2>
      <p class="welcome-school">SEKOLAH LANJUTAN ADVENT (SLA) PURWODADI</p>
      <p class="welcome-semester">SEMESTER GENAP 2025/2026</p>
      <div class="banner-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>

    <!-- AIM SLA Purwodadi -->
    <PageCard :jenis-kelamin="jenisKelamin" class="aim-card">
      <template #header>
        <span>AIM SLA Purwodadi</span>
        <button type="button" class="toggle-btn" :class="{ open: aimOpen }" @click="aimOpen = !aimOpen" aria-label="Toggle">
          <span class="arrow">▼</span>
        </button>
      </template>
      <div v-show="aimOpen" class="aim-content">
        <p class="aim-intro">The aims of Sekolah Lanjutan Advent Purwodadi include:</p>
        <ol class="aim-list">
          <li>Implementing a healthy lifestyle</li>
          <li>Promoting a culture of queuing for handwashing, meals, and orderly entry/exit from classrooms, dormitories, and church</li>
          <li>Organizing spiritual activities such as worship services, Pathfinders, Bible study, choir, week of prayer, and Voice of Youth</li>
          <li>Facilitating recreational activities, family groups, community service around the school, and the 5S program</li>
          <li>Engaging in active, innovative, creative, effective, and enjoyable learning activities</li>
          <li>Implementing the 7K program</li>
          <li>Conducting flag ceremonies and competitions related to national holidays</li>
        </ol>
      </div>
    </PageCard>

    <!-- Visi dan Misi -->
    <div class="visi-misi-header">
      <h3>VISI DAN MISI SEKOLAH LANJUTAN ADVENT PURWODADI</h3>
      <button type="button" class="toggle-btn" :class="{ open: visiMisiOpen }" @click="visiMisiOpen = !visiMisiOpen" aria-label="Toggle">
        <span class="arrow">▼</span>
      </button>
    </div>
    <div class="visi-misi-grid">
      <PageCard :jenis-kelamin="jenisKelamin" class="vision-card">
        <template #header>Visi</template>
        <p class="vision-text">
          Balanced, high-achieving education rooted in an environmental culture based on Pancasila and the 1945 Constitution, grounded in the love of God.
        </p>
      </PageCard>
      <PageCard :jenis-kelamin="jenisKelamin" class="mission-card">
        <template #header>Misi</template>
        <ol class="mission-list">
          <li>To develop a balanced Adventist education.</li>
          <li>To produce graduates who excel academically and non-academically and possess noble character.</li>
          <li>To create a pleasant and shady school and dormitory environment.</li>
          <li>To embody the values of Pancasila and the 1945 Constitution.</li>
        </ol>
      </PageCard>
    </div>

    <!-- Stat card: Ranking -->
    <div class="stats-row">
      <div class="stat-card" :class="themeClass">
        <span class="stat-value">{{ rankingDisplay }}</span>
        <span class="stat-label">Ranking</span>
      </div>
    </div>

    <!-- Pengumuman -->
    <div class="pengumuman-bar">
      <span class="pengumuman-icon">📢</span>
      <span class="pengumuman-text">PENGUMUMAN</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PageCard from '@/components/PageCard.vue';

const props = defineProps({ jenisKelamin: { type: String, default: 'laki-laki' } });
const themeClass = computed(() => 'theme-' + props.jenisKelamin);

const aimOpen = ref(true);
const visiMisiOpen = ref(true);

// Data kosong – nanti bisa dari API
const ranking = ref(null);
const rankingDisplay = computed(() => (ranking.value != null && ranking.value !== '' ? ranking.value : '-'));
</script>

<style scoped>
.dashboard-home {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

/* Welcome Banner */
.welcome-banner {
  padding: 1.75rem 2rem;
  border-radius: 16px;
  text-align: center;
  position: relative;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.welcome-banner.theme-laki-laki {
  background: linear-gradient(135deg, #fef9c3 0%, #fef08a 100%);
  border: 1px solid #fde047;
}
.welcome-banner.theme-perempuan {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #fcd34d;
}
.welcome-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.35rem 0;
}
.welcome-school {
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  margin: 0 0 0.25rem 0;
}
.welcome-semester {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 0.75rem 0;
}
.banner-dots {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
}
.banner-dots .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e1;
  transition: background 0.2s;
}
.banner-dots .dot.active {
  background: #64748b;
}

/* AIM Card */
.aim-card :deep(.page-card-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: inherit;
}
.toggle-btn .arrow {
  display: inline-block;
  transition: transform 0.2s;
  font-size: 0.75rem;
}
.toggle-btn.open .arrow {
  transform: rotate(180deg);
}
.aim-intro {
  margin: 0 0 0.75rem 0;
  color: #475569;
  font-size: 0.95rem;
}
.aim-list {
  margin: 0;
  padding-left: 1.35rem;
  color: #334155;
  line-height: 1.7;
  font-size: 0.95rem;
}
.aim-list li {
  margin-bottom: 0.35rem;
}

/* Visi & Misi header */
.visi-misi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.visi-misi-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}
.visi-misi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
@media (max-width: 700px) {
  .visi-misi-grid {
    grid-template-columns: 1fr;
  }
}
.vision-text,
.mission-list {
  margin: 0;
  color: #334155;
  line-height: 1.65;
  font-size: 0.95rem;
}
.mission-list {
  padding-left: 1.25rem;
}
.mission-list li {
  margin-bottom: 0.5rem;
}

/* Stat card - Ranking */
.stats-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.stat-card {
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
.stat-card.theme-laki-laki {
  background: #fff;
  border-color: #99f6e4;
}
.stat-card.theme-laki-laki .stat-value {
  color: #0f766e;
}
.stat-card.theme-laki-laki .stat-label {
  color: #134e4a;
}
.stat-card.theme-perempuan {
  background: #fff;
  border-color: #ddd6fe;
}
.stat-card.theme-perempuan .stat-value {
  color: #5b21b6;
}
.stat-card.theme-perempuan .stat-label {
  color: #4c1d95;
}
.stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}
.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
}

/* Pengumuman */
.pengumuman-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px dashed #e2e8f0;
}
.pengumuman-icon {
  font-size: 1.1rem;
}
.pengumuman-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
}
</style>
