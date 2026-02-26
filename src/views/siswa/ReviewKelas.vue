<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Review Kelas</template>
    <p class="placeholder">Review kelas, jadwal, dan pengajar akan ditampilkan di sini.</p>
  </PageCard>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';
defineProps({ jenisKelamin: { type: String, default: 'laki-laki' } });
</script>

<style scoped>
.placeholder {
  color: #94a3b8;
  font-size: 0.95rem;
}
</style>
