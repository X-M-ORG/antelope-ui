<template>
  <div :style="mPositionStyle">
    <slot v-if="timer.sec > 0" name="wait" :data="timeData"></slot>
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
    // 方式1：设定开始和结束
    start: {
      type: [String, Number, Date],
      default: ''
    },
    end: {
      type: [String, Number, Date],
      default: ''
    },

    // 方式2：设定固定时间的倒计时，单位 ms
    sec: {
      type: [String, Number],
      default: ''
    },

    // 允许手动控制倒计时
    manual: {
      type: [Boolean, Number, String]
    }
  },

  data() {
    return {
      timer: {
        id: 0,
        sec: 0
      }
    }
  },

  computed: {
    timeData() {
      const all = this.timer.sec / 1000
      const H = Math.floor(all / 3600)
      const d = H > 23 ? Math.floor(H / 24) : 0
      const h = H > 23 ? H % 24 : H
      const m = Math.floor(all / 60) - H * 60
      const s = Math.ceil(all - H * 3600 - m * 60)

      return {
        all,
        dd: d < 10 ? `0${d}` : d,
        HH: H < 10 ? `0${H}` : H,
        hh: h < 10 ? `0${h}` : h,
        mm: m < 10 ? `0${m}` : m,
        ss: s < 10 ? `0${s}` : s,
        d,
        H,
        h,
        m,
        s
      }
    }
  },

  watch: {
    start() {
      this.initTimer()
    },
    end() {
      this.initTimer()
    },
    sec() {
      this.initTimer()
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
        this.timer.sec = end - start
      } else if (this.sec) {
        this.timer.sec = Number(this.sec)
      } else {
        return
      }

      if (this.timer.sec > 0) {
        this.timer.id && clearInterval(this.timer.id)
        this.timer.id = 0

        this.manual || this.countdownStart()
      } else {
        this.$emit('countdown-over')
      }
    },

    countdownStart() {
      if (this.timer.sec > 0) {
        this.timer.sec -= 1000
      }

      this.timer.id = setInterval(() => {
        this.timer.sec -= 1000
        this.$emit('timer-reduce', this.timer.sec)

        if (this.timer.sec <= 0) {
          this.timer.id && clearInterval(this.timer.id)
          this.timer.id = 0
          this.$emit('countdown-over')
        }
      }, 1000)
    }
  }
}
</script>
