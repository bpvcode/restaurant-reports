module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
    //   'airbnb',
    //   'airbnb-typescript',
    //   'airbnb/hooks',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:@typescript-eslint/recommended',
    //   'prettier',
    //   'plugin:prettier/recommended',
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      project: './tsconfig.json',
    },
    rules: {
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'jsx-a11y/label-has-for': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
      'react/require-default-props': 'off', // Since we do not use prop-types
      'react/no-danger': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/prefer-default-export': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'no-underscore-dangle': 'off',
      'operator-linebreak': 'off',
      'react/function-component-definition': [
        // Fix issue on airbnb config
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'max-len': 0,
      'object-curly-newline': 0,
      'implicit-arrow-linebreak': 0,
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'jsx-a11y/label-has-for': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'id-blacklist': [2, 'useStateMachine'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
    overrides: [
      // Override some TypeScript rules just for .js files
      {
        files: ['*.js'],
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
        },
      },
    ],
  };
