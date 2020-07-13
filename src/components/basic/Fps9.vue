<template>
  <div class="a-fps9" :style="fps9Style"></div>
</template>

<script>
import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

export default {
  mixins: [status, box, position, event],

  computed: {
    fps9Style() {
      return {
        ...this.mPositionStyle,
        backgroundSize: '300% 300%'
      }
    }
  }
}
</script>

<style>
.a-fps9 {
  animation: fps9-animation 1s infinite both steps(1) 0s;
}

@keyframes fps9-animation {
  from,
  to {
    background-position: 0 0;
  }

  11.11% {
    background-position: 50% 0;
  }

  22.22% {
    background-position: 100% 0;
  }

  33.33% {
    background-position: 0 50%;
  }

  44.44% {
    background-position: 50% 50%;
  }

  55.55% {
    background-position: 100% 50%;
  }

  66.66% {
    background-position: 0 100%;
  }

  77.77% {
    background-position: 50% 100%;
  }

  88.88% {
    background-position: 100% 100%;
  }
}
</style>
