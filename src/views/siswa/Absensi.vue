<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Absensi</template>
    <div class="absensi-summary">
      <div class="badge hadir">Hadir: 0</div>
      <div class="badge izin">Izin: 0</div>
      <div class="badge sakit">Sakit: 0</div>
      <div class="badge alpha">Alpa: 0</div>
    </div>
    <p class="placeholder">Riwayat absensi per mata pelajaran akan ditampilkan di sini.</p>
  </PageCard>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';
defineProps({ jenisKelamin: { type: String, default: 'laki-laki' } });
</script>

<style scoped>
.absensi-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.badge {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
}
.badge.hadir {
  background: #dcfce7;
  color: #166534;
}
.badge.izin {
  background: #fef3c7;
  color: #92400e;
}
.badge.sakit {
  background: #e0e7ff;
  color: #3730a3;
}
.badge.alpha {
  background: #fee2e2;
  color: #991b1b;
}
.placeholder {
  color: #94a3b8;
  font-size: 0.95rem;
}
</style>
