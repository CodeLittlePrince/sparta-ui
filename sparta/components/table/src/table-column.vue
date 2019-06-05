<script>
export default {
  name: 'SpTableColumn',

  props: {
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    ellipsis: {
      type: Boolean,
      default: false
    }
  }
}
</script>
