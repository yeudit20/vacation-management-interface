<template>
  <header>
    <h1>Vacation Management</h1>
    <nav>
      <RouterLink to="/requester">Requester</RouterLink>
      <RouterLink to="/validator">Validator</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
// nothing special
</script>

<style scoped>
h1 { margin: 0 0 8px; font-size: 20px; }
nav { display: flex; gap: 10px; }
a { text-decoration: none; color: #2563eb; }
a.router-link-active { font-weight: bold; }
</style>

