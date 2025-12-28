# 发布指南

本文档介绍如何发布和更新此 UI 组件库到 npm 平台，以及如何部署 Storybook 文档。

## 前置条件

1. 拥有 npm 账号（如果没有，请访问 https://www.npmjs.com/signup 注册）
2. 在本地登录 npm：
   ```bash
   npm login
   ```

## 版本管理

本项目使用语义化版本（Semantic Versioning），版本号格式为：`MAJOR.MINOR.PATCH`

- **PATCH**: 向后兼容的 bug 修复
- **MINOR**: 向后兼容的新功能
- **MAJOR**: 不向后兼容的重大更改

### 更新版本号

使用以下命令更新版本号：

```bash
# 补丁版本更新（例如：0.1.0 -> 0.1.1）
npm run version:patch

# 小版本更新（例如：0.1.0 -> 0.2.0）
npm run version:minor

# 大版本更新（例如：0.1.0 -> 1.0.0）
npm run version:major
```

这些命令会自动：
1. 更新 package.json 中的版本号
2. 创建一个 git commit
3. 创建一个 git tag

## 发布到 npm

### 首次发布

1. 确保代码已提交到 git
2. 运行构建命令测试：
   ```bash
   npm run build
   ```
3. 发布到 npm：
   ```bash
   npm run publish:npm
   ```

### 后续发布流程

1. 完成代码修改并提交到 git
2. 更新版本号（根据修改类型选择）：
   ```bash
   npm run version:patch  # 或 minor/major
   ```
3. 发布到 npm：
   ```bash
   npm run publish:npm
   ```
4. 推送代码和标签到 GitHub：
   ```bash
   git push origin main --tags
   ```

## 部署 Storybook

### 自动部署到 GitHub Pages

项目已配置 GitHub Actions 自动部署流程：

1. 将代码推送到 main 分支：
   ```bash
   git push origin main
   ```

2. GitHub Actions 会自动：
   - 安装依赖
   - 构建 Storybook
   - 部署到 GitHub Pages

3. 部署完成后，可以通过以下地址访问：
   ```
   https://<your-username>.github.io/<repository-name>/
   ```

### 手动部署

如果需要手动部署到其他平台：

1. 构建 Storybook：
   ```bash
   npm run build-storybook
   ```

2. 部署 `storybook-static` 目录到你的托管平台

## 完整发布检查清单

- [ ] 所有测试通过
- [ ] 代码已提交到 git
- [ ] 更新 README.md（如有必要）
- [ ] 运行 `npm run build` 确保构建成功
- [ ] 更新版本号（使用 version:patch/minor/major）
- [ ] 发布到 npm（使用 publish:npm）
- [ ] 推送代码和标签到 GitHub
- [ ] 验证 GitHub Pages 上的 Storybook 已更新
- [ ] 验证 npm 包可以正常安装和使用

## 回滚版本

如果发布的版本有问题，可以：

1. 废弃有问题的版本（不推荐删除）：
   ```bash
   npm deprecate @scenery-ui/components@<version> "版本有问题，请使用 <new-version>"
   ```

2. 发布修复版本

## 注意事项

- 发布前确保在本地测试过构建产物
- 大版本更新前建议在测试项目中验证
- 保持 CHANGELOG.md 更新（建议创建此文件记录每个版本的变更）
- 确保 peerDependencies 版本范围合理
