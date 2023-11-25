
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
// 当前工作目录路径
const root: string = process.cwd();
export default defineConfig(({ mode }) => {
  // 环境变量
  const env = loadEnv(mode, root, "")
  return {
    base: env.VITE_PUBLIC_PATH || "/",
    plugins: [
      vue(),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      // 允许 setup 语法糖上添加组件名属性
      vueSetupExtend(),
      // 生产环境 gzip 压缩资源
      viteCompression(),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      },
      extensions: ['.js', '.json', '.ts', '.vue']
    },
    server: {
      host: true,
      proxy: {

      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  }
})
// export default defineConfig({
//   plugins: [vue()],
// })
