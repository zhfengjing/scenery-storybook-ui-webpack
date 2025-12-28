# 快速开始指南

## 项目概述

这是一个基于 Storybook + React + Webpack + TailwindCSS + Radix UI 搭建的现代化 UI 组件库。

## 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Webpack 5** - 模块打包工具
- **TailwindCSS 4** - 样式框架
- **Radix UI** - 无障碍组件基础库
- **Storybook 10** - 组件文档和开发环境
- **class-variance-authority** - 组件变体管理

## 安装依赖

```bash
npm install
```

## 开发

### 启动 Storybook 开发环境

```bash
npm run storybook
```

访问 http://localhost:6006 查看组件文档。

### 监听模式构建

```bash
npm run dev
```

## 构建

### 构建组件库

```bash
npm run build
```

构建产物位于 `dist/` 目录。

### 构建 Storybook 静态站点

```bash
npm run build-storybook
```

构建产物位于 `storybook-static/` 目录。

## 项目结构

```
.
├── .github/
│   └── workflows/
│       └── deploy-storybook.yml  # GitHub Pages 自动部署配置
├── .storybook/                   # Storybook 配置
│   ├── main.ts                   # 主配置文件
│   └── preview.ts                # 预览配置
├── src/
│   ├── components/               # 组件目录
│   │   ├── Button/              # Button 组件
│   │   │   ├── Button.tsx       # 组件实现
│   │   │   ├── Button.stories.tsx # Storybook 文档
│   │   │   └── index.ts         # 导出
│   │   └── Dialog/              # Dialog 组件
│   ├── styles/
│   │   └── globals.css          # 全局样式（TailwindCSS）
│   └── index.ts                 # 主入口文件
├── dist/                        # 构建产物（npm 发布）
├── package.json
├── tsconfig.json                # TypeScript 配置
├── webpack.config.js            # Webpack 配置
├── tailwind.config.js           # TailwindCSS 配置
├── postcss.config.js            # PostCSS 配置
├── README.md                    # 项目说明
├── PUBLISH.md                   # 发布指南
├── CHANGELOG.md                 # 变更日志
└── LICENSE                      # 许可证
```

## 添加新组件

1. 在 `src/components/` 下创建组件目录：
   ```bash
   mkdir src/components/NewComponent
   ```

2. 创建组件文件：
   ```typescript
   // src/components/NewComponent/NewComponent.tsx
   import React from 'react';

   export interface NewComponentProps {
     // 定义 props
   }

   export const NewComponent: React.FC<NewComponentProps> = (props) => {
     return <div>New Component</div>;
   };
   ```

3. 创建 Storybook 文档：
   ```typescript
   // src/components/NewComponent/NewComponent.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { NewComponent } from './NewComponent';

   const meta = {
     title: 'Components/NewComponent',
     component: NewComponent,
     tags: ['autodocs'],
   } satisfies Meta<typeof NewComponent>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {},
   };
   ```

4. 创建导出文件：
   ```typescript
   // src/components/NewComponent/index.ts
   export { NewComponent, type NewComponentProps } from './NewComponent';
   ```

5. 在主入口导出：
   ```typescript
   // src/index.ts
   export { NewComponent, type NewComponentProps } from './components/NewComponent';
   ```

## 使用 TailwindCSS

组件样式使用 TailwindCSS 工具类。可以结合 `class-variance-authority` 和 `clsx` 管理变体：

```typescript
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const variants = cva(
  'base-classes',
  {
    variants: {
      size: {
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
  }
);
```

## 使用 Radix UI

项目已集成以下 Radix UI 组件：

- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-select
- @radix-ui/react-tooltip
- @radix-ui/react-slot

可以直接导入使用，参考 `src/components/Dialog/Dialog.tsx`。

## 发布到 npm

详见 [PUBLISH.md](./PUBLISH.md)

## 部署 Storybook

项目已配置 GitHub Actions 自动部署。推送到 main 分支后自动部署到 GitHub Pages。

手动部署：
```bash
npm run build-storybook
# 将 storybook-static 目录部署到你的托管平台
```

## 常见问题

### 1. 构建失败

确保安装了所有依赖：
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. Storybook 启动失败

清除缓存：
```bash
rm -rf node_modules/.cache
npm run storybook
```

### 3. 样式不生效

确保导入了全局样式：
```typescript
import '@scenery-ui/components/dist/index.css'; // 使用时
// 或在开发时
import './styles/globals.css';
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License - 详见 [LICENSE](./LICENSE)
