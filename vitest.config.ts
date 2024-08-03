import { configDefaults, defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
          '@loggify': path.resolve(__dirname, './src')
        },
    },
})