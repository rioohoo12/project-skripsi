<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Pilih Kamar</template>
    <p class="placeholder">Pilihan kamar dan ketersediaan akan ditampilkan di sini.</p>
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
