# Amani

English | [简体中文](README.zh-CN.md)

Amani is a clean, modern, and minimalist Hugo theme designed for personal blogs and portfolios. \
It focuses on content readability while providing a beautiful and responsive design.

Based on [Pehtheme](https://github.com/fauzanmy/pehtheme-hugo) with enhancements and customizations.

> The theme name "Amani" is inspired by a song from the legendary Hong Kong band Beyond, paying homage to their musical legacy.

## Improvements

- 🌓 Dark/Light mode support
- 🌍 Multilingual support (en, zh-CN, ja-JP)
- 📊 Built with TailwindCSS v4
- 🔍 Search functionality (based on Pagefind)
- 🧜‍♀️ Mermaid support
- ✨ Centralized management of SVG icons
- 🔔 GitHub alerts style support

## Shortcomings

> [!WARNING]
> As the author is a backend developer

* Lack of page design
* Struggles with frontend development
* HTML element semantics may not be perfectly implemented

## TODO

- [ ] SEO
- [ ] OG metadata
- [ ] AMP support

## Requirements

- Hugo v0.146.0 or higher
- Node.js and pnpm for development

## Installation

1. Create a new Hugo site (skip if you already have one):
   ```bash
   hugo new site my-blog
   cd my-blog
   ```

2. Add Amani as a submodule:
   ```bash
   git submodule add https://github.com/zhanglianxin/amani.git themes/amani
   ```

3. Update your site's configuration file (hugo.yaml):
   ```yaml
   theme: amani
   ```

## Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   hugo server -D
   ```

## Configuration

Create or modify your `hugo.yaml` file in your site's root directory. Here's a basic example:

```yaml
title: Your Site Title
baseURL: "https://example.com"
languageCode: en-US
defaultContentLanguage: en
theme: amani
hasCJKLanguage: true
summaryLength: 30
```

For detailed configuration options, please refer to the [`hugo.yaml`](hugo.yaml) file and [`config`](config) directory.

## Contributing

🙏 Contributions are welcome! Please feel free to submit a Pull Request.

## License

This theme is released under the MIT license. For more information read the [License](LICENSE).

## Credits

- Built with [Hugo](https://gohugo.io/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons from [Bootstrap Icons](https://icons.getbootstrap.com/)
