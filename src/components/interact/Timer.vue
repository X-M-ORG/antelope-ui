<template>
  <div :style="mixinPositionStyle">
    <slot v-if="timeSecond > 0" name="wait" :time="timePrams"></slot>
    <slot v-else name="arrival"></slot>
  </div>
</template>

<script>
import status from '@/mixins/status'
import box from '@/mixins/box'
import position from '@/mixins/position'
import event from '@/mixins/event'

export default {
  mixins: [status, box, position, event],

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
      if (this.start && this.end) {
        const start = new Date(this.start).getTime()
        const end = new Date(this.end).getTime()
        this.timeSecond = end - start
      } else if (this.second) {
        this.timeSecond = Number(this.second)
      } else {
        return
      }

      if (this.timeSecond) {
        if (this.timeSecond > 0) {
          this.timer && clearInterval(this.timer)
          this.startTimer()
        } else {
          this.$emit('timer-end')
        }
      }
    },

    startTimer() {
      if (this.timeSecond > 0) {
        this.timeSecond -= 1000
      }
      this.timer = setInterval(() => {
        this.timeSecond -= 1000
        this.$emit('timer-reduce', this.timeSecond)

        if (this.timeSecond <= 0) {
          clearInterval(this.timer)
          this.timer = 0
          this.$emit('timer-end')
        }
      }, 1000)
    }
  }
}
</script>
