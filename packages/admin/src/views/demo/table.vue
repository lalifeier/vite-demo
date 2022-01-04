<template>
  <div class="tableFixHead">
    <table>
      <thead>
        <tr>
          <th>TH 1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>11</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {}
  })
</script>

<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 8px 16px;
  }
  th {
    background: #eee;
  }

  .tableFixHead {
    height: 800px;
    overflow: auto;
  }
  .tableFixHead thead th {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .tableFixHead tbody th {
    position: sticky;
    left: 0;
  }

  .tableFixHead,
  .tableFixHead td {
    box-shadow: inset 1px -1px #000;
  }
  .tableFixHead th {
    box-shadow: inset 1px 1px #000, 0 1px #000;
  }
</style>
