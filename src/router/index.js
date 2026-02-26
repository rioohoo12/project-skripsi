import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: () => ({ path: '/login' }),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/siswa/:jenisKelamin',
    component: () => import('@/views/DashboardSiswa.vue'),
    props: true,
    children: [
      { path: '', redirect: (r) => ({ path: `/siswa/${r.params.jenisKelamin}/dashboard` }) },
      { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/siswa/DashboardHome.vue') },
      { path: 'biodata', name: 'Biodata', component: () => import('@/views/siswa/Biodata.vue') },
      { path: 'keuangan', name: 'Keuangan', component: () => import('@/views/siswa/Keuangan.vue') },
      { path: 'kafetaria', name: 'Kafetaria', component: () => import('@/views/siswa/Kafetaria.vue') },
      { path: 'absensi', name: 'Absensi', component: () => import('@/views/siswa/Absensi.vue') },
      { path: 'data-kelas', name: 'DataKelas', component: () => import('@/views/siswa/DataKelas.vue') },
      { path: 'data-kelas/review', name: 'ReviewKelas', component: () => import('@/views/siswa/ReviewKelas.vue') },
      { path: 'grade', name: 'GradeNilai', component: () => import('@/views/siswa/GradeNilai.vue') },
      { path: 'pendaftaran', name: 'Pendaftaran', component: () => import('@/views/siswa/PendaftaranStatus.vue') },
      { path: 'pendaftaran/status', name: 'StatusPendaftaran', component: () => import('@/views/siswa/PendaftaranStatus.vue') },
      { path: 'pendaftaran/permohonan', name: 'PermohonanPendaftaran', component: () => import('@/views/siswa/PendaftaranPermohonan.vue') },
      { path: 'pendaftaran/kamar', name: 'PilihKamar', component: () => import('@/views/siswa/PilihKamar.vue') },
      { path: 'pendaftaran/kurikulum', name: 'Kurikulum', component: () => import('@/views/siswa/Kurikulum.vue') },
      { path: 'clearance', name: 'ClearanceSlip', component: () => import('@/views/siswa/ClearanceMid.vue') },
      { path: 'clearance/pembayaran-pendaftaran', name: 'ClearancePembayaran', component: () => import('@/views/siswa/ClearancePembayaran.vue') },
      { path: 'clearance/mid', name: 'ClearanceMid', component: () => import('@/views/siswa/ClearanceMid.vue') },
      { path: 'clearance/final', name: 'ClearanceFinal', component: () => import('@/views/siswa/ClearanceFinal.vue') },
      { path: 'administrasi', name: 'Administrasi', component: () => import('@/views/siswa/AdministrasiSurat.vue') },
      { path: 'administrasi/surat', name: 'PermohonanSurat', component: () => import('@/views/siswa/AdministrasiSurat.vue') },
      { path: 'administrasi/dokumen', name: 'UploadDokumen', component: () => import('@/views/siswa/AdministrasiDokumen.vue') },
      { path: 'administrasi/ekstrakurikuler', name: 'Ekstrakurikuler', component: () => import('@/views/siswa/AdministrasiEkstrakurikuler.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function isLoggedIn() {
  try {
    return !!localStorage.getItem('auth_token') && !!localStorage.getItem('user');
  } catch {
    return false;
  }
}

router.beforeEach((to, _from, next) => {
  const toSiswa = to.path.startsWith('/siswa/');
  if (toSiswa && !isLoggedIn()) {
    next('/login');
    return;
  }
  if ((to.path === '/login' || to.path === '/register') && isLoggedIn()) {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const jk = user.jenis_kelamin === 'perempuan' ? 'perempuan' : 'laki-laki';
      next(`/siswa/${jk}/dashboard`);
      return;
    } catch {
      next();
      return;
    }
  }
  if (to.path === '/') {
    if (isLoggedIn()) {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const jk = user.jenis_kelamin === 'perempuan' ? 'perempuan' : 'laki-laki';
        next(`/siswa/${jk}/dashboard`);
        return;
      } catch {}
    }
    next('/login');
    return;
  }
  next();
});

export default router;
