module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@controllers': './src/controllers',
                '@services': './src/services',
                '@repositories': './src/repositories',
                '@providers': './src/providers',
                '@entities': './src/entities',
                '@utils': './src/utils'
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}