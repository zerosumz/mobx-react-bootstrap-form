import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';


let pkg = require('./package.json');
let external = Object.keys(pkg.peerDependencies);

let plugins = [
    babel({
        exclude: 'node_modules/**',
        plugins: ['external-helpers']
    }),
    uglify()
];

export default {
    input: 'src/index.js',
    plugins: plugins,
    external: external,
    output: [
        {
            file: pkg.main,
            format: 'es',
            sourcemap: true
        }
    ]
};