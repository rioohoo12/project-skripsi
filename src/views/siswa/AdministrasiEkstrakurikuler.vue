<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Ekstrakurikuler</template>
    <p class="placeholder">Daftar dan pendaftaran ekstrakurikuler akan ditampilkan di sini.</p>
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
