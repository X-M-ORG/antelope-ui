<template>
  <div :style="mPositionStyle">
    <a-section v-for="name in items" :key="name" v-bind="active === name ? {} : positionParams">
      <slot :name="name"></slot>
    </a-section>
  </div>
</template>

<script>
import status from '../../mixins/status'
import box from '../../mixins/box'
import position from '../../mixins/position'
import event from '../../mixins/event'

import ASection from '../basic/Section'

export default {
  components: {
    ASection
  },

  mixins: [status, box, position, event],

  props: {
    active: {
      type: String,
      default: ''
    },

    items: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      positionParams: {
        position: '',
        top: '0',
        left: '150%',
        zIndex: '1',
        style: {
          pointerEvents: 'none',
          opacity: '0'
        }
      }
    }
  }
}
</script>
