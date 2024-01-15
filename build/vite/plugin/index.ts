import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import windi from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { configHtmlPlugin } from './html';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue'],
      dts: 'types/auto-imports.d.ts',
      // 解决eslint报错问题
      eslintrc: {
        // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
        enabled: false,
        filepath: './.eslintrc-auto-import.json', // 生成的文件路径
        globalsPropValue: true,
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      // 指定自定义组件位置(默认:src/components)
      dirs: ['src/**/components'],
      // 配置文件位置 (false:关闭自动生成)
      dts: false,
      // dts: 'types/components.d.ts',
    }),
    vueJsx(),
    vue(),
  ];

  vitePlugins.push(windi());

  isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  return vitePlugins;
}
