


import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
const devMode = process.env.NODE_ENV === 'development';

console.log(`${devMode ? 'development' : 'production'} mode bundle`);

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.js',
            format: 'es',
            sourcemap: devMode ? 'inline' : false,
        },
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                preventAssignment: true,
            }),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                ],
            }),
            postcss({
                extract: true, // Extracts CSS into separate file
                minimize: !devMode, // Minify CSS in production mode
                sourceMap: devMode, // Enable source maps in development
                modules: false, // Disable CSS modules
                use: ['sass'], // Use Sass compiler
                plugins: [
                    require('autoprefixer')(), // Add vendor prefixes
                ],
            }),
            url({
                limit: 0,
                include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
                emitFiles: true,
                fileName: '[name][extname]',
                destDir: 'dist/assets/image/ArcadePlayerCharactersDesktop', // Where the files go in the dist
            })
            ,            
            terser({
                ecma: 2020,
                mangle: { toplevel: true },
                compress: {
                    module: true,
                    toplevel: true,
                    unsafe_arrows: true,
                    drop_console: !devMode,
                    drop_debugger: !devMode,
                },
                output: { quote_style: 1 },
            }),
        ],
        external: ['react', 'react-dom']
    },
];

