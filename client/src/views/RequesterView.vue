<template>
  <section class="card">
    <h2>Submit Vacation Request</h2>
    <form @submit.prevent="submit">
      <label>
        User ID
        <input v-model.number="form.user_id" type="number" min="1" required />
      </label>
      <label>
        Start Date
        <input v-model="form.start_date" type="date" required />
      </label>
      <label>
        End Date
        <input v-model="form.end_date" type="date" required />
      </label>
      <label>
        Reason
        <textarea v-model="form.reason" rows="2" placeholder="Optional"></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  </section>

  <section class="card">
    <h2>My Requests</h2>
    <div class="filters">
      <label>
        User ID
        <input v-model.number="filterUserId" type="number" min="1" />
      </label>
      <button @click="load">Refresh</button>
    </div>
    <table v-if="items.length">
      <thead>
        <tr>
          <th>ID</th><th>Dates</th><th>Status</th><th>Reason</th><th>Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in items" :key="r.id">
          <td>{{ r.id }}</td>
          <td>{{ r.start_date }} - {{ r.end_date }}</td>
          <td><span :class="['badge', r.status.toLowerCase()]">{{ r.status }}</span></td>
          <td>{{ r.reason || '-' }}</td>
          <td>{{ r.comments || '-' }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No requests yet.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../web/api';

const form = ref({ user_id: 1, start_date: '', end_date: '', reason: '' });
const items = ref([]);
const filterUserId = ref(1);

async function submit() {
  await api.post('/api/requests', form.value);
  await load();
}

async function load() {
  const { data } = await api.get('/api/requests', { params: { user_id: filterUserId.value } });
  items.value = data;
}

onMounted(load);
</script>

<style scoped>
form { display: grid; gap: 8px; max-width: 520px; }
label { display: grid; gap: 4px; font-size: 14px; }
input, textarea { padding: 8px; border: 1px solid #ddd; border-radius: 6px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 8px; border-bottom: 1px solid #eee; text-align: left; }
.badge { padding: 2px 6px; border-radius: 6px; font-size: 12px; }
.badge.pending { background:#fff7ed; color:#92400e; }
.badge.approved { background:#ecfdf5; color:#065f46; }
.badge.rejected { background:#fef2f2; color:#991b1b; }
.filters { display:flex; gap:10px; align-items:end; margin-bottom:8px; }
</style>

