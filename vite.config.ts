import { defineConfig, normalizePath, loadEnv, UserConfig, ConfigEnv } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(resolve('./src/styles/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_SERVE_WWW } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      open: true,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY, VITE_SERVE_WWW),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      sourcemap: !VITE_DROP_CONSOLE,
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
        format: {
          comments: false, // 删除注释
        },
      },
    },
    // css 相关的配置
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData 的内容会在每个 scss 文件的开头自动注入
          additionalData: `@import "${variablePath}";`,
        },
      },
      // 进行 PostCSS 配置
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.cjs', '.jsx', '.ts', '.json', '.vue'],
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  };
});
