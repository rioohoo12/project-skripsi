<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Upload Dokumen</template>
    <p class="placeholder">Upload dokumen (foto, KTP, rapor, dll.) akan ditampilkan di sini.</p>
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
