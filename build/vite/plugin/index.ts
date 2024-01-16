import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import windi from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { configHtmlPlugin } from './html';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', '@vueuse/core'],
      dts: 'types/auto-imports.d.ts',
      // 解决eslint报错问题
      eslintrc: {
        // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
        enabled: false,
        filepath: './.eslintrc-auto-import.json', // 生成的文件路径
        globalsPropValue: true,
      },
      resolvers: [
        ElementPlusResolver(), // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(), // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      // 指定自定义组件位置(默认:src/components)
      dirs: ['src/**/components'],
      // 配置文件位置 (false:关闭自动生成)
      dts: false,
      // dts: 'types/components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
    vueJsx(),
    vue(),
  ];

  vitePlugins.push(windi());

  VITE_LEGACY &&
    isBuild &&
    vitePlugins.push(legacy({ targets: ['defaults', 'ie >= 11', 'chrome 52'] }));

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  return vitePlugins;
}
