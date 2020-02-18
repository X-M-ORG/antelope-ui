<template>
  <div :style="timerStyle">
    <slot v-if="timeSecond > 0" name="wait" :time="timePrams"></slot>
    <slot v-else name="arrival"></slot>
  </div>
</template>

<script>
import basicMixins from '../../mixins/basic'

export default {
  mixins: [basicMixins],

  props: {
    start: {
      type: [String, Number, Date],
      default: ''
    },
    end: {
      type: [String, Number, Date],
      default: ''
    },

    second: {
      type: [String, Number],
      default: ''
    }
  },

  data() {
    return {
      timer: 0,
      timeSecond: Number(this.second)
    }
  },

  watch: {
    start() {
      this.initTimer()
    },
    end() {
      this.initTimer()
    },
    second() {
      this.initTimer()
    }
  },

  computed: {
    timerStyle() {
      return {
        height: '100%',
        width: '100%',
        ...this.m_basicStyle
      }
    },

    timePrams() {
      let all = this.timeSecond / 1000
      let h = Math.floor(all / 3600)
      let m = Math.floor(all / 60) - h * 60
      let s = all - h * 3600 - m * 60

      h = h < 10 ? `0${h}` : h
      m = m < 10 ? `0${m}` : m
      s = s < 10 ? `0${s}` : s

      return { h, m, s, all }
    }
  },

  mounted() {
    this.initTimer()
  },

  methods: {
    initTimer() {
      if (this.start && this.start) {
        const start = new Date(this.start).getTime()
        const end = new Date(this.end).getTime()
        this.timeSecond = end - start
      } else if (this.second) {
        this.timeSecond = Number(this.second)
      } else {
        return
      }

      if (this.timeSecond) {
        this.timer && clearInterval(this.timer)
        this.startTimer()
      }
    },

    startTimer() {
      if (this.timeSecond > 0) {
        this.timeSecond -= 1000
      }
      this.timer = setInterval(() => {
        if (this.timeSecond > 0) {
          this.timeSecond -= 1000
          this.$emit('timer-reduce', this.timeSecond)
        } else {
          clearInterval(this.timer)
          this.timer = 0
          this.$emit('timer-end')
        }
      }, 1000)
    }
  }
}
</script>
