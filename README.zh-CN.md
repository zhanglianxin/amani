# Amani

[English](README.md) | 简体中文

Amani 是一个清新、现代和简约的 Hugo 主题，专为个人博客和作品集设计。它注重内容的可读性，同时提供美观且响应式的设计。\

本主题基于 [Pehtheme](https://github.com/fauzanmy/pehtheme-hugo) 开发，加入了多项增强和定制功能。

> 主题名称 "Amani" 灵感来源于香港传奇乐队 Beyond 的一首歌曲，以此向他们的音乐致敬。

## 改进特性

- 🌓 明暗主题支持
- 🌍 多语言支持（英文、简体中文、日语）
- 📊 使用 TailwindCSS v4 构建
- 🔍 搜索功能（基于 Pagefind）
- 🧜‍♀️ Mermaid 支持
- ✨ SVG icons 集中管理
- 🔔 GitHub alerts 支持

## 不足之处

> [!WARNING]
> 由于作者是后端开发

* 缺少页面 UI 设计
* フロントエンド開発が苦手
* HTML 元素语义化可能未完美实现

## 待实现

- [ ] SEO
- [ ] OG metadata
- [ ] AMP support

## 系统要求

- Hugo v0.146.0 或更高版本
- Node.js 和 pnpm（用于开发）

## 安装

1. 创建新的 Hugo 站点（如果已有可跳过）：
   ```bash
   hugo new site my-blog
   cd my-blog
   ```

2. 添加 Amani 作为子模块：
   ```bash
   git submodule add https://github.com/zhanglianxin/amani.git themes/amani
   ```

3. 更新站点配置文件（hugo.yaml）：
   ```yaml
   theme: amani
   ```

## 开发

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 启动开发服务器：
   ```bash
   hugo server -D
   ```

## 配置

在站点根目录创建或修改 `hugo.yaml` 文件。以下是基本示例：

```yaml
title: 你的站点标题
baseURL: "https://example.com"
languageCode: zh-CN
defaultContentLanguage: zh-CN
theme: amani
hasCJKLanguage: true
summaryLength: 30
```

详细配置选项请参考 [`hugo.yaml`](hugo.yaml) 文件和 [`config`](config)目录。

## 贡献

🙏 欢迎提交贡献！请随时提交 Pull Request。

## 许可证

本主题基于 MIT 许可证发布。更多信息请查看 [License](LICENSE)。

## 致谢

- 使用 [Hugo](https://gohugo.io/) 构建
- 使用 [TailwindCSS](https://tailwindcss.com/) 样式
- 图标来自 [Bootstrap Icons](https://icons.getbootstrap.com/)
