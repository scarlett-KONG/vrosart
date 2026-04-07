# 双语网站重构计划

## 1. 目标

将当前单语网站重构为一个支持英语 (`/en/`) 和法语 (`/fr/`) 的双语网站。所有核心资源（CSS, JS, 图片）将保持共享，以避免重复和简化维护。

## 2. 新的文件结构

我们将把现有的文件迁移到一个新的目录结构中。这将是最终的结构：

```
/
├── en/
│   ├── index.html
│   ├── about.html
│   ├── commissions.html
│   ├── prints.html
│   ├── success.html
│   └── product-detail-site/
│       ├── product-1.html
│       └── ...
├── fr/
│   ├── index.html
│   ├── about.html
│   ├── commissions.html
│   ├── prints.html
│   ├── success.html
│   └── product-detail-site/
│       ├── product-1.html
│       └── ...
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── ...
├── api/
│   └── checkout.js
└── index.html (语言重定向器)
```

## 3. 执行步骤

1.  **创建目录**: 创建 `/en` 和 `/fr` 两个主目录，以及它们各自内部的 `/product-detail-site` 子目录。
2.  **移动英语文件**: 将所有现有的 `.html` 文件移动到新的 `/en` 目录中。
3.  **复制法语文件**: 将 `/en` 目录的所有内容复制到 `/fr` 中，作为法语翻译的起点。
4.  **更新资源路径**: 批量修改所有 `/en` 和 `/fr` 目录下的 `.html` 文件，将 `css/`, `js/`, `images/` 的引用路径更新为正确的相对路径 (例如，从 `css/style.css` 改为 `../css/style.css`)。
5.  **更新内部导航链接**: 修正所有 `.html` 文件中的导航栏和页面内链接，确保它们指向对应语言目录下的正确页面 (例如，在 `en/about.html` 中，"Commissions" 页面的链接应指向 `commissions.html` 而不是 `../commissions.html`)。
6.  **创建根目录重定向器**: 在网站根目录创建一个新的 `index.html`。它将包含一小段 JavaScript，用于检测用户的浏览器语言，并自动跳转到 `/en/` 或 `/fr/`。
7.  **添加语言切换器**: 在网站的页眉部分，我会添加一个 "EN / FR" 的切换链接，方便用户在两种语言之间手动切换。
8.  **调整Stripe支付流程**: 创建 `/en/success.html` 和 `/fr/success.html` 支付成功页面，并更新 `js/script.js` 以便在调用支付API时传递正确的语言特定URL。
9.  **优化SEO**: 为每个页面的 `<head>` 部分添加 `hreflang` 标签，并更新 `<html>` 标签的 `lang` 属性，以告知搜索引擎这是一个双语网站。