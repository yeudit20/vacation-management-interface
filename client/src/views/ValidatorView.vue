<template>
  <section class="card">
    <h2>Validator Dashboard</h2>
    <div class="filters">
      <label>
        Status
        <select v-model="status">
          <option value="">All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </label>
      <button @click="load">Refresh</button>
    </div>
    <table v-if="items.length">
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
          <td>{{ r.start_date }} → {{ r.end_date }}</td>
          <td><span :class="['badge', r.status.toLowerCase()]">{{ r.status }}</span></td>
          <td>{{ r.reason || '-' }}</td>
          <td>
            <div v-if="r.status === 'Pending'" class="actions">
              <button @click="approve(r.id)">Approve</button>
              <input v-model="comment[r.id]" placeholder="Reject comment" />
              <button @click="reject(r.id)">Reject</button>
            </div>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
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
.filters {
  display: flex;
  gap: 10px;
  align-items: end;
  margin-bottom: 8px;
}

select,
input {
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.badge {
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 12px;
}

.badge.pending {
  background: #fff7ed;
  color: #92400e;
}

.badge.approved {
  background: #ecfdf5;
  color: #065f46;
}

.badge.rejected {
  background: #fef2f2;
  color: #991b1b;
}

.actions {
  display: flex;
  gap: 6px;
}

button {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f8fafc;
}
</style>
