<template>
  <a-section class="a-page" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </a-section>
</template>

<script>
import ASection from './Section'

export default {
  components: {
    ASection
  }
}
</script>

<style lang="scss">
.a-page {
  > *:not(:first-child) {
    margin-top: -0.02rem;
  }
}
</style>
