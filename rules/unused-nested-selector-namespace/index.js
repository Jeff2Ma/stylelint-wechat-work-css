'use strict'

const stylelint = require('stylelint')
const namespace = require('../../utils/namespace')
const msgPrefix = require('../../utils/messagePrefix')
const ruleName = namespace('unused-nested-selector-namespace')
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `${msgPrefix.main} Disallow 'qui_xxx' or 'util_xxx' selector in nested selectors.`
})

function rule (actual) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual})
    if (!validOptions) {
      return
    }

    root.walkRules(rule => {
      if (rule.parent.type !== 'rule') {
        return
      }

      if ((rule.selector.indexOf('qui_') <= -1) || (rule.selector.indexOf('util_') <= -1)) {
        return
      }

      // if (context.fix) {
      //   // Apply fixes using PostCSS API
      //   rule.selector.replace('qui_','ww_');
      //   return // Return and don't report a problem
      // }

      stylelint.utils.report({
        message: messages.rejected,
        node: rule,
        result,
        ruleName
      })

      // console.log()
    })
  }
}

rule.ruleName = ruleName
rule.messages = messages
module.exports = rule
