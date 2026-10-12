# Leo Portfolio

岳逸豪 Leo 的个人作品网站。原生 HTML / CSS / JavaScript，无构建依赖。

## 页面内容

- 自我介绍与工作室主视觉
- IP 增长智能体、Mirro、录音豆智能助手、AIGC 创作、AIGC 卡牌
- 独立的工作经历、个人优势与合作入口
- 移动端菜单、作品分类、项目详情弹窗、邮箱复制、轻视差与滚动渐入

## 本地预览

在项目目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

访问 http://127.0.0.1:4173。

## GitHub Pages

仓库 Settings → Pages → Build and deployment → Deploy from a branch，选择 main 和 / (root)，保存。发布地址以 GitHub 返回的 URL 为准。

## 迁移到服务器

将 index.html、styles.css、app.js、assets/ 上传到静态网站目录即可。所有资源均使用相对地址，支持域名根目录与子目录。

Nginx 示例（替换网站根目录与域名）：

```nginx
server {
    listen 80;
    server_name your-domain.example;
    root /var/www/leo-portfolio;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```

## 修改内容

首页与工作经历：index.html。项目详情：app.js 顶部 projects。样式：styles.css。

公开邮箱为用户指定的 647683112@qq.com。微信二维码尚未提供；收到后加入 assets/wechat-qr.png，在合作入口展示。

## 素材与内容边界

assets/studio.png 为内置图像生成工具制作的原创工作室概念图。人物是占位数字形象，不是本人肖像。项目封面为 HTML / CSS 绘制的视觉示意，并非真实产品截图；需要时可替换为审核后的真实素材。

项目介绍基于提供的历史聊天与本地产品资料整理，不包含未经确认的客户、收入、用户规模、奖项或产品上线承诺。工作经历未加入未经确认的任职日期或量化成绩。
