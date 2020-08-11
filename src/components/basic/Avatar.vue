<template>
  <a-section style="border-radius: 50%;" v-bind="$attrs" @a-tap="tapAvatar()"></a-section>
</template>

<script>
import config from '../../config'

import ASection from './Section'

export default {
  components: { ASection },

  methods: {
    tapAvatar() {
      const aTap = this.$listeners['a-tap'] || this.$listeners.aTap

      if (aTap) {
        aTap(this.$attrs, config.onTapAvatar)
      } else {
        config.onTapAvatar(this.$attrs)
      }
    }
  }
}
</script>