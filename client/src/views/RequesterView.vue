<template>
  <div class="grid-2">
    <section class="card">
      <h2>Submit Vacation Request</h2>
      <form @submit.prevent="submit">
        <label>
          User ID
          <input class="input-control" v-model.number="form.user_id" type="number" min="1" required />
        </label>
        <label>
          Start Date
          <input class="input-control" v-model="form.start_date" type="date" required />
        </label>
        <label>
          End Date
          <input class="input-control" v-model="form.end_date" type="date" required />
        </label>
        <label>
          Reason
          <textarea class="input-control" v-model="form.reason" rows="2" placeholder="Optional"></textarea>
        </label>
        <button class="btn btn-primary" type="submit">➕ Submit</button>
      </form>
    </section>

    <section class="card">
      <h2>My Requests</h2>
      <div class="filters">
        <label>
          User ID
          <input class="input-control" v-model.number="filterUserId" type="number" min="1" />
        </label>
        <button class="btn btn-ghost" @click="load">🔄 Refresh</button>
      </div>
      <div class="table-responsive" v-if="items.length">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Comments</th>
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
      </div>
      <p v-else>No requests yet.</p>
    </section>
  </div>
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
form { display: grid; gap: 10px; max-width: 520px; }
label { display: grid; gap: 6px; font-size: 14px; }
.filters { display:flex; gap:10px; align-items:end; margin-bottom:8px; }
</style>

