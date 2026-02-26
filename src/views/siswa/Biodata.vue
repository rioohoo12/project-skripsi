<template>
  <PageCard :jenis-kelamin="jenisKelamin">
    <template #header>Biodata Siswa</template>
    <div class="biodata-grid">
      <div class="field">
        <label>Nama Lengkap</label>
        <p>—</p>
      </div>
      <div class="field">
        <label>NIS / NISN</label>
        <p>—</p>
      </div>
      <div class="field">
        <label>Jenis Kelamin</label>
        <p>{{ jenisKelamin === 'perempuan' ? 'Perempuan' : 'Laki-laki' }}</p>
      </div>
      <div class="field">
        <label>Kelas</label>
        <p>—</p>
      </div>
      <div class="field">
        <label>Alamat</label>
        <p>—</p>
      </div>
      <div class="field">
        <label>No. Telepon</label>
        <p>—</p>
      </div>
    </div>
  </PageCard>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue';
defineProps({ jenisKelamin: { type: String, default: 'laki-laki' } });
</script>

<style scoped>
.biodata-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}
.field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.35rem;
}
.field p {
  font-size: 1rem;
  color: #1e293b;
}
</style>
