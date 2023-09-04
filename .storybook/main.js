const path = require('path');


module.exports = {
    "stories": ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
    "framework": {
        name: "@storybook/react-webpack5",
        options: {}
    },
    "features": {
        "storyStoreV7": true
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, "../src/"),
        };

        const file_loader_rule = config.module.rules.find(
            (rule) => rule.test && rule.test.test('.svg')
        );
        file_loader_rule.exclude = /svg$/;
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
        });

        return config;
    }

};