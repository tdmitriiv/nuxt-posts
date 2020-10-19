<template>
  <v-app>
    <v-app-bar fixed app>
      <v-btn
        nuxt
        to="/"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt keep-alive />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>
