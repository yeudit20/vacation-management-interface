<template>
  <div class="grid-2">
    <section class="card">
      <h2>Submit Vacation Request</h2>
      <form @submit.prevent="submit">
        <div v-if="error" class="alert alert-error">{{ error }}</div>
        <div v-if="success" class="alert alert-success">{{ success }}</div>
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
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </section>

    <section class="card">
      <h2>My Requests</h2>
      <div class="filters">
        <label>
          User ID
          <input class="input-control" v-model.number="filterUserId" type="number" min="1" />
        </label>
        <button class="btn btn-ghost" @click="load">Refresh</button>
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
const error = ref('');
const success = ref('');

function clearMessages(){ error.value=''; success.value=''; }

async function submit() {
  clearMessages();
  // client-side validation
  if (!form.value.user_id || form.value.user_id < 1) {
    error.value = 'User ID must be a positive number';
    return;
  }
  if (!form.value.start_date || !form.value.end_date) {
    error.value = 'Please provide both start and end dates';
    return;
  }
  if (new Date(form.value.end_date) < new Date(form.value.start_date)) {
    error.value = 'End date must be on or after start date';
    return;
  }

  try {
    await api.post('/api/requests', form.value);
    success.value = 'Request submitted successfully';
    // optional reset
    form.value.start_date = '';
    form.value.end_date = '';
    form.value.reason = '';
    await load();
  } catch (e) {
    error.value = e?.response?.data?.error || e?.message || 'Failed to submit request';
  }
}

async function load() {
  try {
    const { data } = await api.get('/api/requests', { params: { user_id: filterUserId.value } });
    items.value = data;
  } catch (e) {
    error.value = e?.response?.data?.error || e?.message || 'Failed to load requests';
  }
}

onMounted(load);
</script>

<style scoped>
form { display: grid; gap: 10px; max-width: 520px; }
label { display: grid; gap: 6px; font-size: 14px; }
/* prevent overlap: make filter area two columns, input grows, button auto */
.filters { display:grid; grid-template-columns: 1fr auto; gap:10px; align-items:end; margin-bottom:8px; }
</style>
