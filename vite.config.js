import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './src/Select2.vue',
            name: 'Select2',
            fileName: (format) => `select2-vue.${format}.js`,
        },
        rollupOptions: {
            external: ['vue', 'jquery', 'select2'],
            output: {
                globals: {
                    vue: 'Vue',
                    jquery: '$',
                    select2: 'Select2',
                },
            },
        },
    },
});
