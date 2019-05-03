const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: 'css',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@primary-color': '#F77759', // primary color for all components
			'@primary-5': '#E0D3D3',
			'@link-color': '#23acc5', // link color
			'@success-color': '#6ce982', // success state color
			'@warning-color': '#eb5384', // warning state color
			'@error-color': '#ee4635', // error state color
			'@font-size-base': ' 15px', // major text font size
			'@heading-color': '#BA5726', // heading text color
			'@text-color': '#BA5726', // major text color
			'@text-color-secondary': ' rgba(16, 11, 10, .45)', // secondary text color
			'@disabled-color': 'rgba(16, 11, 10, .25)', // disable state color
			'@border-radius-base': ' 4px', // major border radius
			'@border-color-base': '#E0D3D3', // major border color
			'@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)', // major shadow for layers
		},
	})
);
