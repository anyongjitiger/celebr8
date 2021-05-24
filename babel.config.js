module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.windows.js',
          '.native.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        root: ["./"],
        alias: {
          // "@themes": ["src/themes/index"],
          // "@hooks": ["src/hooks/index"],
          // "@config": ["src/config/index"],
          // "@screens": ["src/screens/index"],
          // "@constants": ["src/constants/index"],
          // "@navigation": ["src/navigation/index"],
          // "@components": ["src/components/index"],
          // "@services": ["src/services/index"],
          // "@global": ["src/global/index"],
        },
        cwd: 'packagejson',
      },
    ],
    [
      "babel-plugin-root-import",
      {
        "paths": [
          {
            "rootPathSuffix": "./src/themes/index",
            "rootPathPrefix": "@themes"
          },
          {
            "rootPathSuffix": "./src/hooks/index",
            "rootPathPrefix": "@hooks"
          },
          {
            "rootPathSuffix": "./src/global/index",
            "rootPathPrefix": "@global"
          },
          {
            "rootPathSuffix": "./src/config/index",
            "rootPathPrefix": "@config"
          },
          {
            "rootPathSuffix": "./src/screens/index",
            "rootPathPrefix": "@screens"
          },
          {
            "rootPathSuffix": "./src/constants/index",
            "rootPathPrefix": "@constants"
          },
          {
            "rootPathSuffix": "./src/navigation/index",
            "rootPathPrefix": "@navigation"
          },
          {
            "rootPathSuffix": "./src/components/index",
            "rootPathPrefix": "@components"
          },
          {
            "rootPathSuffix": "./src/services/index",
            "rootPathPrefix": "@services"
          },
          {
            "rootPathSuffix": "./src/types/index",
            "rootPathPrefix": "@types"
          },
          {
            "rootPathSuffix": "./src/helpers/index",
            "rootPathPrefix": "@helpers"
          },
          {
            "rootPathSuffix": "./src/i18n/index",
            "rootPathPrefix": "@i18n"
          },
          {
            "rootPathSuffix": "./src/assets/images/index",
            "rootPathPrefix": "@images"
          },
        ]
      }
    ],
    '@babel/plugin-proposal-optional-chaining',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console', 'react-native-reanimated/plugin'],
    },
  },
};
