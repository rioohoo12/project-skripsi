<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Clearance Slip — Final Test</template>
    <p class="placeholder">Status clearance Final Test akan ditampilkan di sini.</p>
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
