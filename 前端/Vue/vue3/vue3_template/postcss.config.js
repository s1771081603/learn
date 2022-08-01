module.exports = ({ file }) => {
    if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
        vwUnit = 50
    } else {
        vwUnit = 100
    }
    return {
        plugins: {
            'postcss-pxtorem': {
                rootValue: vwUnit,
                unitPrecision: 3,
                propList: ['*'],
                replace: true,
                mediaQuery: false,
                minPixelValue: 2
            }
        }
    }
}