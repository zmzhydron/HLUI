<template>
  <div class="cusContainer" :class="{showTitle: showTitle,hideBorder: hideBorder }">
    <div class="content">
      <span class="title" v-if="showTitle">{{title}}:</span>
      <CheckboxGroup @on-change="onChange" v-model="selectedList">
        <Checkbox v-for="item in list" :key="item[refValueKey]" :label="item[refNameKey]" />
      </CheckboxGroup>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'selected',
    event: `change`
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    hideBorder: {
      type: Boolean,
      default: false
    },
    refValueKey: {
      type: String,
      default: 'id'
    },
    refNameKey: {
      type: String,
      default: 'name'
    },
    list: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Array,
      default: () => []
    },
    onchangecb: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      selectedList: this.pair()
    };
  },
  watch: {
    selected(a, b) {
      this.selectedList = this.pair();
    }
  },
  computed: {
    showTitle() {
      return this.title.length !== 0;
    }
  },
  methods: {
    pair() {
      return this.selected.map(item => {
        return this.list.filter(o => {
          return o[this.refValueKey] === item;
        })[0][this.refNameKey];
      });
    },
    rePair(list) {
      return list.map(item => {
        return this.list.filter(o => {
          return o[this.refNameKey] === item;
        })[0][this.refValueKey];
      });
    },
    onChange(list) {
      this.selectedList = list;
      let l = this.rePair(list);
      this.$emit('change', l);
      this.onchangecb(l);
    }
  },
  mounted: function() {}
};
</script>
