<template>
  <div class="permohonan-page" :class="themeClass">
    <h2 class="page-heading">Permohonan Pendaftaran</h2>
    <p class="page-subtitle">Pilih topik di bawah untuk melihat informasi dari chatbot.</p>

    <div class="chatbot-layout">
      <!-- Panel chatbot -->
      <PageCard :jenis-kelamin="jenisKelamin" class="card-chatbot">
        <template #header>
          <span class="chatbot-header">
            <span class="chatbot-avatar">🤖</span>
            Asisten Pendaftaran
          </span>
        </template>
        <div class="chatbot-body">
          <div class="chat-bubble bot">
            <p>Halo! Saya asisten pendaftaran SLA Purwodadi. Pilih salah satu topik untuk informasi:</p>
          </div>

          <div class="chat-options">
            <button
              v-for="opt in options"
              :key="opt.id"
              type="button"
              class="option-btn"
              :class="[themeClass, { active: selectedId === opt.id }]"
              @click="selectOption(opt)"
            >
              <span class="option-label">{{ opt.label }}</span>
              <span class="option-title">{{ opt.title }}</span>
            </button>
          </div>

          <!-- Balasan chatbot (tampil setelah pilih) -->
          <template v-if="selected">
            <div class="chat-bubble user">
              <p>{{ selected.title }}</p>
            </div>
            <div class="chat-bubble bot reply">
              <p>{{ selected.reply }}</p>
            </div>
          </template>
        </div>
      </PageCard>

      <!-- Panel info singkat (dashboard) -->
      <aside class="chatbot-sidebar">
        <PageCard :jenis-kelamin="jenisKelamin" class="card-info">
          <template #header>Informasi Cepat</template>
          <ul class="info-list">
            <li><strong>A.</strong> Pendaftaran siswa/i baru</li>
            <li><strong>B.</strong> Informasi Biaya</li>
            <li><strong>C.</strong> Status Pembayaran</li>
          </ul>
        </PageCard>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PageCard from '@/components/PageCard.vue';

const props = defineProps({ jenisKelamin: { type: String, default: 'laki-laki' } });
const themeClass = computed(() => 'theme-' + props.jenisKelamin);

const selectedId = ref(null);
const selected = computed(() => {
  if (!selectedId.value) return null;
  return options.find((o) => o.id === selectedId.value);
});

const options = [
  {
    id: 'a',
    label: 'A',
    title: 'Pendaftaran siswa/i baru',
    reply: 'Informasi pendaftaran siswa/i baru akan ditampilkan di sini. Anda dapat melihat syarat, jadwal, dan alur pendaftaran.',
  },
  {
    id: 'b',
    label: 'B',
    title: 'Informasi Biaya',
    reply: 'Informasi biaya pendaftaran, SPP, dan biaya asrama akan ditampilkan di sini.',
  },
  {
    id: 'c',
    label: 'C',
    title: 'Status Pembayaran',
    reply: 'Status pembayaran Anda akan ditampilkan di sini setelah data tersedia.',
  },
];

function selectOption(opt) {
  selectedId.value = selectedId.value === opt.id ? null : opt.id;
}
</script>

<style scoped>
.permohonan-page {
  padding-bottom: 2rem;
}

.page-heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.page-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

.chatbot-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 900px) {
  .chatbot-layout {
    grid-template-columns: 1fr;
  }
}

.card-chatbot :deep(.page-card-body) {
  padding: 1.25rem 1.5rem;
}

.chatbot-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.chatbot-avatar {
  font-size: 1.5rem;
}

.chatbot-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-bubble {
  max-width: 85%;
  padding: 0.9rem 1.15rem;
  border-radius: 16px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.chat-bubble p {
  margin: 0;
}

.chat-bubble.bot {
  align-self: flex-start;
  background: #f1f5f9;
  color: #334155;
  border-bottom-left-radius: 4px;
}

.chat-bubble.bot.reply {
  background: #e2e8f0;
  border: 1px solid #e2e8f0;
}

.permohonan-page.theme-laki-laki .chat-bubble.user {
  align-self: flex-end;
  background: #ccfbf1;
  color: #0f766e;
  border-bottom-right-radius: 4px;
}

.permohonan-page.theme-perempuan .chat-bubble.user {
  align-self: flex-end;
  background: #ede9fe;
  color: #5b21b6;
  border-bottom-right-radius: 4px;
}

.chat-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  font-family: inherit;
}

.option-btn:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.option-btn.theme-laki-laki.active {
  border-color: #0f766e;
  background: #f0fdfa;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
}

.option-btn.theme-perempuan.active {
  border-color: #7c3aed;
  background: #f5f3ff;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}

.option-label {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
}

.option-btn.theme-laki-laki .option-label {
  background: #0f766e;
}

.option-btn.theme-perempuan .option-label {
  background: #7c3aed;
}

.option-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
}

/* Sidebar */
.chatbot-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-info :deep(.page-card-body) {
  padding: 1.25rem;
}

.info-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.8;
}

.info-list strong {
  color: #1e293b;
}
</style>
