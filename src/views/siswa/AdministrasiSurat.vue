<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Permohonan Surat</template>
    <p class="placeholder">Form permohonan surat (izin, keterangan, dll.) akan ditampilkan di sini.</p>
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
