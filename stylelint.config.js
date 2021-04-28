module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: ['stylelint-scss'],
  rules: {
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function'
        ]
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'no-empty-source': null,
    'no-descending-specificity': null
  }
}
