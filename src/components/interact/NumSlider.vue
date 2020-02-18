<template>
  <div class="a-num-slider" :style="numSliderStyle">
    <div
      class="item"
      v-for="item of 10"
      :key="item"
      :class="{ 'slider-in': (item-1) === inValue, 'slider-out': (item-1) === outValue }"
    >{{ item - 1 }}</div>
  </div>
</template>

<script>
import basicMixins from '../../mixins/basic'

export default {
  mixins: [basicMixins],

  props: {
    value: {
      type: [String, Number],
      default: 0
    },

    itemClassName: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      inValue: 0,
      outValue: ''
    }
  },

  computed: {
    numSliderStyle() {
      let style = {
        height: '100%',
        width: '100%',
        ...this.m_basicStyle
      }

      return style
    }
  },

  watch: {
    value(newVal, oldVal = 0) {
      this.outValue = Number(oldVal)
      this.inValue = Number(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.a-num-slider {
  position: relative;
  overflow: hidden;
}

.a-num-slider .item {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(100%);
}

.a-num-slider .item.slider-in {
  animation: sliderIn 0.5s linear;
  animation-fill-mode: forwards;
}

.a-num-slider .item.slider-out {
  animation: sliderOut 0.5s linear;
  animation-fill-mode: forwards;
}

@keyframes sliderIn {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes sliderOut {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
