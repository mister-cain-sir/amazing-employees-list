module.exports = {
  entry: {
    main: "./app/scripts/main.tsx",
  },
  output: {
    filename: "[name].min.js",
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/transform-runtime"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
