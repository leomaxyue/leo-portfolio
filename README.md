# Leo Portfolio

岳逸豪 Leo 的个人作品网站。原生 HTML / CSS / JavaScript，无构建依赖。

## 页面内容

- 自我介绍与工作室主视觉
- IP 增长智能体、Mirro、录音豆智能助手、AIGC 卡牌（含视觉创作与材质表现）
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

首页与工作经历：index.html。项目详情：app.js 顶部 projects。图集：gallery.js。样式：styles.css。

公开邮箱为用户指定的 647683112@qq.com。微信二维码尚未提供；收到后加入 assets/wechat-qr.png，在合作入口展示。

## 素材与内容边界

assets/studio.png 为内置图像生成工具制作的原创工作室概念图。人物是占位数字形象，不是本人肖像。项目封面与图集已替换为现有项目资料中精选的 Demo 截图、界面设计概念、卡面设计稿与包装效果图。共 15 张，采用 WebP 网页副本；原始文件未修改。图库中标明设计阶段，包装效果图不表述为实体实拍。

项目介绍基于提供的历史聊天与本地产品资料整理，不包含未经确认的客户、收入、用户规模、奖项或产品上线承诺。工作经历未加入未经确认的任职日期或量化成绩。

作品列表使用主题封面与信息卡；完整截图与设计稿只在项目详情的图集中展示。AIGC 创作与卡牌已合并。

2026-10-13：新增明亮工作室主视觉与暖白主题，浮动导航支持当前段落与阅读进度，电脑端作品封面有轻倾斜反馈；动效尊重减少动态设置。

首页四个作品入口采用内置 imagegen 生成的概念场景封面（assets/covers/），并标注“概念封面”；它们只作主题表达，原始产品截图与既有卡面在详情图集中完整保留。新封面不代表真实设备外形、游戏上线场景或已生产的卡牌。
