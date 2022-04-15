<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <DrawflowNodes></DrawflowNodes>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DrawflowNodes from './components/DrawflowNodes.vue';

export default {
  name: 'App',

  components: {
    DrawflowNodes,
  },
  
}
</script>
