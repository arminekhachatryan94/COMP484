<template>
<div>
    <div class="note-style" v-bind="note"></div>
</div>
</template>

<script>
export default {
  name: 'Note',
  data () {
    return {
      note: ''
    }
  }
}
</script>

<style scoped>
.note-style {
  padding-top: 50px;
}
</style>
