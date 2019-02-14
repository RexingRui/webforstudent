module.exports = {
    devServer: {
        open: true,
        proxy: {
			"/api": {
				target: "http://localhost:8888",
				secure: false,
				changeOrigin: true,
				// pathRewrite: {"^/api": ""}
			}
        }
    },
    transpileDependencies: [
        /\/node_modules\/vue-echarts\//,
        /\/node_modules\/resize-detector\//
    ]
};
