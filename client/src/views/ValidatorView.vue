<template>
  <section class="card">
    <h2>Validator Dashboard</h2>
    <div class="filters">
      <label>
        Status
        <select class="select-control" v-model="status">
          <option value="">All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </label>
      <button class="btn btn-ghost" @click="load">🔄 Refresh</button>
    </div>
    <div class="table-responsive" v-if="items.length">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Dates</th>
          <th>Status</th>
          <th>Reason</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in items" :key="r.id">
          <td>{{ r.id }}</td>
          <td>{{ r.user_id }}</td>
          <td>{{ r.start_date }} - {{ r.end_date }}</td>
          <td><span :class="['badge', r.status.toLowerCase()]">{{ r.status }}</span></td>
          <td>{{ r.reason || '-' }}</td>
          <td>
            <div v-if="r.status === 'Pending'" class="actions">
              <button class="btn btn-success" @click="approve(r.id)">✅ Approve</button>
              <input class="input-control" v-model="comment[r.id]" placeholder="Reject comment" />
              <button class="btn btn-danger" @click="reject(r.id)">❌ Reject</button>
            </div>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <p v-else>No requests.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../web/api';

const items = ref([]);
const status = ref('Pending');
const comment = ref({});

async function load() {
  const params = {};
  if (status.value) params.status = status.value;
  const { data } = await api.get('/api/requests', { params });
  items.value = data;
}

async function approve(id) {
  await api.post(`/api/requests/${id}/approve`);
  await load();
}

async function reject(id) {
  await api.post(`/api/requests/${id}/reject`, { comments: comment.value[id] || '' });
  comment.value[id] = '';
  await load();
}

onMounted(load);
</script>

<style scoped>
.filters { display:grid; grid-template-columns: 1fr auto; gap: 10px; align-items: end; margin-bottom: 8px; }
.actions { display:flex; gap:6px; }
</style>


