<script>
export default {
  name: 'SpCol',

  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter() {
      let parent = this.$parent
      while (parent && parent.$options.name !== 'SpRow') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    }
  },
  render(h) {
    let classList = []
    let style = {}

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `sp-col-${prop}-${this[prop]}`
            : `sp-col-${this[prop]}`
        )
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`sp-col-${size}-${this[size]}`)
      } else if (typeof this[size] === 'object') {
        let props = this[size]
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `sp-col-${size}-${prop}-${props[prop]}`
              : `sp-col-${size}-${props[prop]}`
          )
        })
      }
    })

    return h(this.tag, {
      class: ['sp-col', classList],
      style
    }, this.$slots.default)
  }
}
</script>

<style lang="scss">
@use "sass:math";
@import "sparta/common/scss/base/mixin";

[class*="sp-col-"] {
  float: left;
  box-sizing: border-box;
}

.sp-col-0 {
  display: none;
}

@for $i from 0 through 24 {
  .sp-col-#{$i} {
    width: (math.div(1, 24) * $i * 100) * 1%;
  }

  .sp-col-offset-#{$i} {
    margin-left: (math.div(1, 24) * $i * 100) * 1%;
  }

  .sp-col-pull-#{$i} {
    position: relative;
    right: (math.div(1, 24) * $i * 100) * 1%;
  }

  .sp-col-push-#{$i} {
    position: relative;
    left: (math.div(1, 24) * $i * 100) * 1%;
  }
}

/* xs
-------------------------- */
@include res(xs) {
  .sp-col-xs-0 {
    display: none;
  }

  @for $i from 0 through 24 {
    .sp-col-xs-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-xs-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-xs-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-xs-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

/* sm
-------------------------- */
@include res(sm) {
  .sp-col-sm-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .sp-col-sm-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-sm-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-sm-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-sm-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

/* md
-------------------------- */
@include res(md) {
  .sp-col-md-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .sp-col-md-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-md-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-md-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-md-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

/* lg
-------------------------- */
@include res(lg) {
  .sp-col-lg-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .sp-col-lg-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-lg-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-lg-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-lg-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

/* xl
-------------------------- */
@include res(xl) {
  .sp-col-xl-0 {
    display: none;
  }
  @for $i from 0 through 24 {
    .sp-col-xl-#{$i} {
      width: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-xl-offset-#{$i} {
      margin-left: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-xl-pull-#{$i} {
      position: relative;
      right: (math.div(1, 24) * $i * 100) * 1%;
    }

    .sp-col-xl-push-#{$i} {
      position: relative;
      left: (math.div(1, 24) * $i * 100) * 1%;
    }
  }
}

</style>

