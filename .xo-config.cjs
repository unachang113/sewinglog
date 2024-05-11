module.exports = {
  extends: ["xo-react"],
  prettier: true,
  space: 2,
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never"
      }
    ],
    "n/prefer-global/process": [
      "error",
      "always"
    ]
  }
};
