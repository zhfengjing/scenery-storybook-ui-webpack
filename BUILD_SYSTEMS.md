# 构建系统说明

## 为什么需要两套构建系统？

项目中有两套独立的构建系统，它们服务于不同的目的：

### 1. Webpack 构建系统 ⚙️

**用途：** 构建可发布到 npm 的组件库

**命令：**
- `npm run build` - 生产环境构建
- `npm run dev` - 开发模式（监听文件变化）

**产物位置：** `dist/` 目录

**产物内容：**
```
dist/
├── index.js              # UMD 格式的 JS 文件
├── index.js.map         # Source map
├── index.d.ts           # TypeScript 类型定义
└── components/          # 组件类型定义
    ├── Button/
    │   ├── Button.d.ts
    │   └── index.d.ts
    └── Dialog/
        ├── Dialog.d.ts
        └── index.d.ts
```

**特点：**
- 打包所有组件到一个文件
- 生成 TypeScript 类型定义
- 外部化 React/React-DOM（不打包进库）
- 压缩和优化代码
- 适合被其他项目 import 使用

**使用场景：**
```javascript
// 其他项目中使用
npm install @scenery-ui/components

import { Button, Dialog } from '@scenery-ui/components';
```

---

### 2. Storybook 构建系统 📚

**用途：** 构建组件文档和交互式演示网站

**命令：**
- `npm run storybook` - 启动开发服务器（localhost:6006）
- `npm run build-storybook` - 构建静态网站

**产物位置：** `storybook-static/` 目录

**产物内容：**
```
storybook-static/
├── index.html           # 入口页面
├── iframe.html          # 组件预览框架
├── assets/              # CSS、JS 等资源
├── sb-*.*              # Storybook 运行时文件
└── components/          # 各个组件的独立 bundle
```

**特点：**
- 每个 story 独立打包
- 包含 Storybook UI 界面
- 包含文档和交互控件
- 可以直接在浏览器中访问
- 适合部署到 GitHub Pages 等静态托管

**使用场景：**
- 开发时预览组件
- 编写组件文档
- 组件演示和测试
- 团队协作查看组件库

---

## 详细对比

| 特性 | Webpack 构建 | Storybook 构建 |
|------|-------------|----------------|
| **目的** | 生成 npm 包 | 生成文档网站 |
| **产物** | JavaScript 库 | 静态 HTML 网站 |
| **输出格式** | UMD (通用模块) | 多个独立的 bundle |
| **是否包含 React** | 否（外部依赖） | 是（完整应用） |
| **是否包含 UI** | 否（仅组件） | 是（Storybook 界面） |
| **文件大小** | 小（~50KB） | 大（~几 MB） |
| **类型定义** | 生成 .d.ts | 不生成 |
| **发布目标** | npm registry | Web 服务器 |
| **访问方式** | `import` 导入 | 浏览器访问 |

## 工作流程

### 开发新组件

```bash
# 1. 启动 Storybook 进行开发
npm run storybook

# 2. 编写组件和 stories
# 3. 在浏览器中实时预览
# 4. 完成后构建组件库
npm run build
```

### 发布流程

```bash
# 1. 构建组件库（用于 npm）
npm run build

# 2. 发布到 npm
npm run publish:npm

# 3. 构建 Storybook（用于文档）
npm run build-storybook

# 4. 部署 Storybook 到 GitHub Pages
git push origin main  # 触发自动部署
```

## 配置文件对比

### Webpack 配置 (webpack.config.js)

```javascript
{
  entry: './src/index.ts',           // 单一入口
  output: {
    filename: 'index.js',            // 单一输出
    library: { type: 'umd' }         // UMD 格式
  },
  externals: {
    react: 'react',                  // 不打包 React
    'react-dom': 'react-dom'
  }
}
```

### Storybook 配置 (.storybook/main.ts)

```typescript
{
  stories: ['../src/**/*.stories.tsx'],  // 多个 story 文件
  framework: '@storybook/react-webpack5', // Storybook 框架
  // 内部使用自己的 webpack 配置
  // 会打包 React 和所有依赖
}
```

## 为什么不能只用一个？

### 只用 Webpack？
❌ 缺点：
- 没有可视化的组件文档
- 无法交互式测试组件
- 团队成员难以查看组件

### 只用 Storybook？
❌ 缺点：
- Storybook 产物体积大，不适合作为 npm 包
- 包含很多开发相关代码，不适合生产环境
- 无法被其他项目轻量级引入

## 最佳实践

1. **开发时：** 使用 `npm run storybook`
   - 快速迭代
   - 实时预览
   - 编写文档

2. **构建时：** 使用 `npm run build`
   - 生成优化后的库文件
   - 生成类型定义
   - 准备发布到 npm

3. **文档时：** 使用 `npm run build-storybook`
   - 生成静态文档网站
   - 部署到 GitHub Pages
   - 供团队和用户查阅

## 类比理解

可以把这两套系统类比为：

- **Webpack 构建** = 出版一本书（精简、便携、可发行）
- **Storybook 构建** = 建立一个图书馆网站（交互、展示、可浏览）

书是给读者拿回家看的（npm 包），
网站是给大家在线浏览的（文档站）。

## 总结

两套系统各司其职：

- **Webpack**: 生产环境构建 → npm 发布
- **Storybook**: 开发文档构建 → 在线展示

这是现代组件库的标准配置，几乎所有大型 UI 库（Ant Design、Material-UI、Chakra UI 等）都采用这种架构。
