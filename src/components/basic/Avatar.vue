<template>
  <a-section style="border-radius: 50%;" v-bind="$attrs" @a-tap="tapAvatar()"></a-section>
</template>

<script>
import ASection from '@/components/basic/Section'

import config from '@/config'

export default {
  components: { ASection },

  methods: {
    tapAvatar() {
      if (this.disabled) {
        return
      }

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