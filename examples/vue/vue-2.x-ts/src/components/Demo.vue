<template>
  <div>
    <textarea>
      {{ markup }}
    </textarea>
    <ul>
      <TreeNode
        v-for="(model, index) in treeData.children"
        :key="index"
        :model="model"
        :generateLabelFn="generateLabel"
      >
      </TreeNode>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TreeNode from './TreeNode.vue';
  import { MmmHtmlParser } from '../../../../../dist/index';
  import { MmmHtmlParserResultI } from "../../../../../src";
  import { MmmHtmlParserResultTagI } from "../../../../../src/MmmHtmlParserResultTagI";
  import { MmmHtmlParserResultRootI } from "../../../../../src/MmmHtmlParserResultRootI";

  export default Vue.extend({
    name: 'Demo',
    components: {
      TreeNode
    },
    created() {
      console.log('----- created -----');
      MmmHtmlParser.options.trimRootWhitespace = true;
      MmmHtmlParser.options.generateAdvancedObjects = true;
      const root = new MmmHtmlParser().start(this.markup);
      console.log('root.tagsTotalCount: ', root.tagsTotalCount);
      console.log('root.tagsIgnoredCount: ', root.tagsIgnoredCount);
      console.log('root.tagsOpenedCount: ', root.tagsOpenedCount);
      console.log('- root.tagsClosedCount: ', root.tagsClosedCount);
      console.log('= tagsRemainingCount: ', (root.tagsOpenedCount - root.tagsClosedCount));
      console[root.tagsErrorCount > 0 ? 'warn' : 'log']('! tagsErrorCount', root.tagsErrorCount);
      this.treeData = root;
    },
    data() {
      return {
        treeData: {},
        markupMe: `
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
              <Tree
                v-for="(model, index) in model.children"
                :key="index"
                :model="model"
                :generateLabelFn="generateLabelFn"
              >
              </Tree>
            </ul>
            <div
              v-if="open && model.type === 'Tag' && !model.isSelfClosingTag && !model.isVoidTag"
              :class="{'type-tag': model.type === 'Tag', 'type-text': model.type === 'Text'}"
            >
              &lt;{{ model.tagName }}&gt;
            </div>
          </li>
        `,
        markup0: `
          <span>
            Text without closing tag
        `,
        markup1: `
          <form action="/action_page.php"><fieldset>
            <legend>Personal information:</legend>
            First
            name:
            <br />
            <self />
            <input type="text" name="firstname" value="Mickey">
          </fieldset>

        `,
        markup2: `
          <form action="/action_page.php">
            <fieldset>
              <legend>Personal information:</legend>
              First name:<br>
              <input type="text" name="firstname" value="Mickey"><br>
              Last name:<br>
              <input type="text" name="lastname" value="Mouse"><br><br>
              <input type="submit" value="Submit">
            </fieldset>
          </form>
          <content>
            <div>
              <self />
            </div>
          </content>

        `,
        markupCodeEx: `
          <code>
            <fieldset>
              <legend>Personal information:</legend>
              First name:<br>
              <input type="text" name="firstname" value="Mickey"><br>
              Last name:<br>
              <input type="text" name="lastname" value="Mouse"><br><br>
              <input type="submit" value="Submit">
            </fieldset>
          </code>
          <content>
            <div>
              <self />
            </div>
          </content>
        `,
        markupCodeEx2: `
          <code>
            <fieldset>
              <legend>Personal information:</legend>
              First name:<br>
              <input type="text" name="firstname" value="Mickey"><br>
              Last name:<br>
              <input type="text" name="lastname" value="Mouse"><br><br>
              <input type="submit" value="Submit">
            </fieldset>
        `
      }
    },
    computed: {
      markup(): string {
        return this.markupCodeEx;
      }
    },
    methods: {
      generateLabel(model: MmmHtmlParserResultI) {
        switch(model.type) {
          case 'Root': {
            return 'Root'
          }
          case 'Tag': {
            return model.content;
          }
          case 'Text': {
            return model.content.length > 200 ? `${model.content.substring(0, 200)} ... ` : model.content;
          }
        }
      }
    }
  });
</script>

<style>
  textarea {
    width: 100%;
    height: 200px;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: none;
  }
</style>
