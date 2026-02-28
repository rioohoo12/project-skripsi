<template>
  <div class="admin-page" :class="themeClass">
    <div class="page-hero" :class="themeClass">
      <div class="hero-icon">📁</div>
      <h1 class="hero-title">Upload Dokumen</h1>
      <p class="hero-subtitle">Unggah dokumen pendukung (foto, KK, ijazah, rapor, dan lainnya).</p>
    </div>

    <div class="admin-layout">
      <main class="admin-main">
        <div class="card-upload" :class="themeClass">
          <h2 class="card-title">Unggah Dokumen Baru</h2>
          <form class="form-upload" @submit.prevent="tambahDokumen">
            <div class="form-group">
              <label for="tipe">Jenis Dokumen</label>
              <select id="tipe" v-model="form.tipeDokumen" required>
                <option value="">— Pilih jenis dokumen —</option>
                <option value="KK">Kartu Keluarga (KK)</option>
                <option value="Akte">Akte Kelahiran</option>
                <option value="Ijazah">Ijazah</option>
                <option value="Foto">Pas Foto</option>
                <option value="Rapor">Rapor</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div class="form-group">
              <label>File</label>
              <div class="upload-zone" :class="themeClass">
                <span class="upload-icon">📤</span>
                <p class="upload-text">Klik atau seret file ke sini</p>
                <p class="upload-hint">Format: PDF, JPG, PNG (maks. 5MB)</p>
                <input ref="fileInputRef" type="file" class="upload-input" accept=".pdf,.jpg,.jpeg,.png" @change="onFileSelect" />
              </div>
            </div>
            <button type="submit" class="btn-submit" :class="themeClass" :disabled="!form.fileName">Unggah Dokumen</button>
          </form>
        </div>

        <div class="card-list" :class="themeClass">
          <h2 class="card-title">Dokumen Terunggah</h2>
          <div class="doc-list">
            <div v-for="(doc, i) in daftarDokumen" :key="i" class="doc-item">
              <span class="doc-icon">📄</span>
              <div class="doc-info">
                <span class="doc-name">{{ doc.tipe }}</span>
                <span class="doc-meta">{{ doc.tanggal }} · {{ doc.status }}</span>
              </div>
              <span class="badge-status" :class="doc.statusClass">{{ doc.status }}</span>
            </div>
            <p v-if="!daftarDokumen.length" class="empty-msg">Belum ada dokumen terunggah.</p>
          </div>
        </div>
      </main>

      <aside class="admin-sidebar">
        <div class="sidebar-card" :class="themeClass">
          <h3 class="sidebar-title">Informasi</h3>
          <ul class="info-list">
            <li>Pastikan file jelas dan tidak blur.</li>
            <li>Format: PDF, JPG, atau PNG.</li>
            <li>Status verifikasi akan diperbarui oleh admin.</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const props = defineProps({ jenisKelamin: { type: String, default: 'laki-laki' } });
const themeClass = computed(() => 'theme-' + props.jenisKelamin);

const form = reactive({
  tipeDokumen: '',
  fileName: '',
});

const fileInputRef = ref(null);
const daftarDokumen = ref([]);

function onFileSelect(e) {
  const f = e.target.files?.[0];
  form.fileName = f ? f.name : '';
}

function tambahDokumen() {
  if (!form.tipeDokumen) return;
  const labels = { KK: 'Kartu Keluarga', Akte: 'Akte Kelahiran', Ijazah: 'Ijazah', Foto: 'Pas Foto', Rapor: 'Rapor', Lainnya: 'Lainnya' };
  daftarDokumen.value.unshift({
    tipe: labels[form.tipeDokumen] || form.tipeDokumen,
    tanggal: new Date().toLocaleDateString('id-ID'),
    status: 'Menunggu verifikasi',
    statusClass: 'status-pending',
  });
  form.tipeDokumen = '';
  form.fileName = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
}
</script>

<style scoped>
.admin-page { padding-bottom: 2rem; }
.page-hero {
  padding: 1.75rem 2rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  text-align: center;
}
.page-hero.theme-laki-laki {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #2dd4bf 100%);
  box-shadow: 0 10px 40px rgba(15, 118, 110, 0.25);
}
.page-hero.theme-perempuan {
  background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #8b5cf6 100%);
  box-shadow: 0 10px 40px rgba(91, 33, 182, 0.25);
}
.hero-icon { font-size: 2.25rem; margin-bottom: 0.35rem; }
.hero-title { font-size: 1.45rem; font-weight: 800; color: #fff; margin: 0 0 0.25rem 0; }
.hero-subtitle { font-size: 0.95rem; color: rgba(255,255,255,0.92); margin: 0; }

.admin-layout { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; }
@media (max-width: 900px) { .admin-layout { grid-template-columns: 1fr; } }
.admin-main { display: flex; flex-direction: column; gap: 1.25rem; }

.card-upload, .card-list {
  padding: 1.5rem 2rem;
  background: #fff;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}
.card-upload.theme-laki-laki, .card-list.theme-laki-laki { border-top: 4px solid #0f766e; }
.card-upload.theme-perempuan, .card-list.theme-perempuan { border-top: 4px solid #7c3aed; }
.card-title { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0 0 1.25rem 0; }

.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: #374151; margin-bottom: 0.4rem; }
.form-group select {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
}

.upload-zone {
  position: relative;
  padding: 2rem;
  border: 2px dashed #e2e8f0;
  border-radius: 14px;
  text-align: center;
  background: #f8fafc;
}
.upload-zone.theme-laki-laki { border-color: #99f6e4; background: #f0fdfa; }
.upload-zone.theme-perempuan { border-color: #ddd6fe; background: #f5f3ff; }
.upload-icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
.upload-text { font-size: 0.95rem; font-weight: 600; color: #475569; margin: 0 0 0.25rem 0; }
.upload-hint { font-size: 0.8rem; color: #94a3b8; margin: 0; }
.upload-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

.btn-submit {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
}
.btn-submit.theme-laki-laki { background: #0f766e; }
.btn-submit.theme-perempuan { background: #7c3aed; }
.btn-submit:hover:not(:disabled) { opacity: 0.9; }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.doc-list { display: flex; flex-direction: column; gap: 0.75rem; }
.doc-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}
.doc-icon { font-size: 1.5rem; }
.doc-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.2rem; }
.doc-name { font-weight: 600; color: #1e293b; }
.doc-meta { font-size: 0.85rem; color: #64748b; }
.badge-status { padding: 0.3rem 0.7rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600; }
.badge-status.status-pending { background: #fef3c7; color: #92400e; }
.badge-status.status-ok { background: #d1fae5; color: #065f46; }
.empty-msg { text-align: center; color: #94a3b8; padding: 2rem; margin: 0; font-size: 0.95rem; }

.sidebar-card { padding: 1.25rem 1.5rem; background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
.sidebar-card.theme-laki-laki { border-top: 3px solid #0f766e; }
.sidebar-card.theme-perempuan { border-top: 3px solid #7c3aed; }
.sidebar-title { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0 0 1rem 0; }
.info-list { margin: 0; padding-left: 1.2rem; color: #475569; font-size: 0.9rem; line-height: 1.7; }
.info-list li { margin-bottom: 0.5rem; }
</style>
