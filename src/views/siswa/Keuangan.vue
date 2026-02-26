<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Keuangan</template>
    <div class="summary-row">
      <div class="summary-item">
        <span class="summary-label">Total Tagihan</span>
        <span class="summary-value">Rp 0</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Sudah Dibayar</span>
        <span class="summary-value paid">Rp 0</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Sisa</span>
        <span class="summary-value">Rp 0</span>
      </div>
    </div>
    <p class="placeholder">Riwayat pembayaran dan tagihan akan ditampilkan di sini.</p>
  </PageCard>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';
defineProps({ jenisKelamin: { type: String, default: 'laki-laki' } });
</script>

<style scoped>
.summary-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.summary-item {
  padding: 1rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
.summary-label {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.35rem;
}
.summary-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}
.summary-value.paid {
  color: #134e4a;
}
.theme-perempuan .summary-value.paid {
  color: #5b21b6;
}
.placeholder {
  color: #94a3b8;
  font-size: 0.95rem;
}
@media (max-width: 640px) {
  .summary-row {
    grid-template-columns: 1fr;
  }
}
</style>
