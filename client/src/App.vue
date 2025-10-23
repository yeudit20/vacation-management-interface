<template>
  <header class="header">
    <div class="container header-content">
      <div class="brand">
        <i class="logo" aria-hidden="true"></i>
        <span>Vacation Management</span>
      </div>
      <nav class="nav" aria-label="Main Navigation">
        <RouterLink to="/requester">Requester</RouterLink>
        <RouterLink to="/validator">Validator</RouterLink>
      </nav>
    </div>
  </header>
  <main class="container">
    <RouterView />
  </main>
  
</template>

<script setup>
// nothing special
</script>

<style scoped>
a.router-link-active { font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
</style>
