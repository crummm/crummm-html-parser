<template>
  <li class="item">
    <div
      :class="{'type-tag': model.type === 'Tag', 'type-text': model.type === 'Text'}"
      @click="toggle"
      @dblclick="changeType"
    >
      <span
        v-if="isFolder"
      >
        <span
          v-if="open"
          class="open-indicator"
        >
          &nbsp;&ndash;
        </span>
        <span
          v-else
          class="close-indicator"
        >
          +
        </span>
      </span>
      {{ generateLabelFn ? generateLabelFn(model) : model.content }}
      <span
        v-if="!open"
      >
        ... &lt;/{{ model.tagName }}&gt;
      </span>
    </div>
    <ul
      v-show="open"
      v-if="isFolder"
    >
      <TreeNode
        v-for="(model, index) in model.children"
        :key="index"
        :model="model"
        :generateLabelFn="generateLabelFn"
      >
      </TreeNode>
    </ul>
    <div
      v-if="open && model.type === 'Tag' && !model.isSelfClosingTag && !model.isVoidTag"
      :class="{'type-tag': model.type === 'Tag', 'type-text': model.type === 'Text'}"
    >
      &lt;{{ model.tagName }}&gt;
    </div>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: "TreeNode",
    props: {
      model: Object,
      generateLabelFn: Function
    },
    data: function () {
      return {
        open: true
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length;
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open;
        }
      },
      changeType: function () {
        if (!this.isFolder) {
          Vue.set(this.model, 'children', []);
          this.open = true
        }
      },
      addChild: function () {
        this.model.children.push({
          name: 'new stuff'
        })
      }
    }
  });
</script>

<style scoped>
  .item {
    cursor: pointer;
  }
  .type-tag {
    font-weight: 500;
  }
  .type-text {
    color: darkgray;
  }
  .open-indicator {
    margin-left: -1em;
    color: red;
  }
  .close-indicator {
    margin-left: -1em;
  }
</style>
