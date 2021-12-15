module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true
      },
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended'
      ],
      rules: {
        'import/prefer-default-export': 'off'
      }
    },
    {
      files: ['*.component.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/recommended'
      ],
      rules: {
        'max-len': ['error', { code: 140 }]
      }
    },
    {
      files: ['*.component.ts'],
      extends: [
        'plugin:@angular-eslint/template/process-inline-templates'
      ]
    }
  ]
};
