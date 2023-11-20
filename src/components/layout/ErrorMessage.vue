<template>
  <div class="container py-5">
    <h1>
      404 PAGE NOT FOUND <code>{{ $route.params.notfound }}</code>
    </h1>
    <router-link :to="{ name: 'Home' }"> Back to Home</router-link>
  </div>
</template>
