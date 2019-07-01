<template>
  <div
    class="sp-progress"
    :class="[
      'sp-progress--' + type,
      status ? 'is-' + status : '',
      {
        'sp-progress--without-text': !showText,
        'sp-progress--text-inside': textInside,
      }
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      v-if="type === 'line'"
      class="sp-progress-bar"
    >
      <div
        class="sp-progress-bar__outer"
        :style="{height: strokeWidth + 'px'}"
      >
        <div
          class="sp-progress-bar__inner"
          :style="barStyle"
        >
          <div
            v-if="showText && textInside"
            class="sp-progress-bar__innerText"
          >{{ percentage }}%</div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="sp-progress-circle"
      :style="{height: width + 'px', width: width + 'px'}"
    >
      <svg viewBox="0 0 100 100">
        <path
          class="sp-progress-circle__track"
          :d="trackPath"
          stroke="#e5e9f2"
          :stroke-width="relativeStrokeWidth"
          fill="none"
        ></path>
        <path
          class="sp-progress-circle__path"
          :d="trackPath"
          stroke-linecap="round"
          :stroke="stroke"
          :stroke-width="relativeStrokeWidth"
          fill="none"
          :style="circlePathStyle"
        ></path>
      </svg>
    </div>
    <div
      v-if="showText && !textInside"
      class="sp-progress__text"
      :style="{fontSize: progressTextSize + 'px'}"
    >
      <template v-if="!status">{{ percentage }}%</template>
      <i
        v-else
        :class="iconClass"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SpProgress',
  props: {
    type: {
      type: String,
      default: 'line',
      validator: val => ['line', 'circle'].indexOf(val) > -1
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    status: {
      type: String
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 126
    },
    showText: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    barStyle() {
      const style = {}
      style.width = this.percentage + '%'
      style.backgroundColor = this.color
      return style
    },
    relativeStrokeWidth() {
      return (this.strokeWidth / this.width * 100).toFixed(1)
    },
    trackPath() {
      const radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)

      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
    },
    perimeter() {
      const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2
      return 2 * Math.PI * radius
    },
    circlePathStyle() {
      const perimeter = this.perimeter
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    stroke() {
      let ret
      if (this.color) {
        ret = this.color
      } else {
        switch (this.status) {
        case 'success':
          ret = '#13ce66'
          break
        case 'exception':
          ret = '#ff4949'
          break
        default:
          ret = '#20a0ff'
        }
      }
      return ret
    },
    iconClass() {
      if (this.type === 'line') {
        return this.status === 'success' ? 'sp-icon-circle-check' : 'sp-icon-circle-close'
      } else {
        return this.status === 'success' ? 'sp-icon-check' : 'sp-icon-close'
      }
    },
    progressTextSize() {
      return this.type === 'line'
        ? 12 + this.strokeWidth * 0.4
        : this.width * 0.111111 + 2
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-progress {
  position: relative;
  line-height: 1;

  &__text {
    font-size: 14px;
    color: $color-text-regular;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    line-height: 1;

    i {
      display: block;
    }
  }

  &--circle {
    display: inline-block;

    .sp-progress__text {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      transform: translate(0, -50%);

      i {
        vertical-align: middle;
        display: inline-block;
      }
    }
  }

  &--without-text {
    .sp-progress__text {
      display: none;
    }

    .sp-progress-bar {
      padding-right: 0;
      margin-right: 0;
      display: block;
    }
  }

  &--text-inside {
    .sp-progress-bar {
      padding-right: 0;
      margin-right: 0;
    }
  }

  &.is-success {
    .sp-progress-bar__inner {
      background-color: $color-success;
    }

    .sp-progress__text {
      color: $color-success;
    }
  }

  &.is-exception {
    .sp-progress-bar__inner {
      background-color: $color-danger;
    }

    .sp-progress__text {
      color: $color-danger;
    }
  }
}

.sp-progress-bar {
  padding-right: 50px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  margin-right: -55px;
  box-sizing: border-box;

  &__outer {
    height: 6px;
    border-radius: 100px;
    background-color: $border-color-lighter;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
  }
  &__inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: $color-primary;
    text-align: right;
    border-radius: 100px;
    line-height: 1;
    white-space: nowrap;
    transition: width 0.6s ease;

    &::after {
      display: inline-block;
      content: "";
      height: 100%;
      vertical-align: middle;
    }
  }

  &__innerText {
    display: inline-block;
    vertical-align: middle;
    color: $color-white;
    font-size: 12px;
    margin: 0 5px;
  }
}

@keyframes progress {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 32px 0;
  }
}
</style>

