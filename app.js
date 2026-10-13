'use strict';
const projects = {
  ip: { title: 'IP 增长智能体', category: 'AI AGENT / BUSINESS', lead: '让趋势洞察接上内容创作与商品机会。', background: 'IP 运营不止需要持续产出内容，还需要判断什么值得做，以及如何把内容与商业机会连接起来。这个项目围绕 IP 公司、主理人与品牌团队的需求展开。', approach: ['梳理 IP 信息、用户与趋势，寻找值得进一步验证的机会。','将内容方向与商品创意放到同一条产品路径中。','通过演示与客户需求讨论，持续明确产品边界。'], outcome: '现有内容包括产品演示与商务沟通材料，围绕真实业务需求持续探索增长工作流。', focus: '需求分析 · 产品定义 · 增长工作流 · 商业化探索' },
  mirro: { title: 'Mirro', category: 'AI SOCIAL / DIGITAL LIFE', lead: '让另一个你，带来认识世界与连接他人的新方式。', background: '探索一个由 AI 数字分身组成的第二世界：分身能够积累经历与记忆，帮助真人发现可能感兴趣的人、活动与关系机会。', approach: ['围绕数字分身、人格与长期记忆设计产品体验。','让数字世界里的经历能够被看见、被理解。','将现实关系的选择权留给用户，明确 AI 行动边界。'], outcome: '现有内容包括概念方案、原型与项目沟通材料，聚焦数字分身、世界体验与关系发现。', focus: '产品构想 · 数字生命 · 社交体验 · 原型设计' },
  bean: { title: '录音豆智能助手', category: 'MEMORY / AI × HARDWARE', lead: '把一天的交流，接上人物、事情与下一步。', background: '会议、活动、朋友邀约与灵感分散在一天里。只有转写与摘要，还不足以帮助用户记住承诺、整理变化和准备下一次交流。', approach: ['以一天为入口，组织多次独立交流。','关联人物与事情，保存有来源的事实和约定。','从记录继续走向提醒、准备材料和写作等任务。'], outcome: '现有内容包括 Anker 黑客松智能录音赛题的产品需求文档与页面设计规范，覆盖一天的交流、人物记忆与行动组织。', focus: '场景设计 · AI 记忆 · 硬件协同 · 产品需求' },
  cards: { title: 'AIGC 卡牌', category: 'AIGC / CARD SERIES', lead: '让生成式视觉，进入可以握在手里的媒介。', background: '以卡牌与文创为载体，把角色、符号、故事和材料组织成一套连贯的产品表达。包含 The Court of Cards 与相关文创设计探索。', approach: ['建立卡面、图形与系列之间的视觉关系。','探索纸张、工艺与包装对作品体验的影响。','将主题叙事与设计说明整合为展示材料。'], outcome: '现有内容包括《马之宫廷》的卡面、角色等级、牌背、包装方案与工艺说明。包装和工艺图片为概念效果图，卡面为既有设计稿。', focus: '系列设计 · 卡牌叙事 · 视觉表达 · 实体媒介' }
};
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
let previousFocus;
let currentGallery = [];
const imageDialog = document.querySelector('#image-dialog');
const projectHighlights = {
  ip: [['从 IP 出发','结合 IP 定位与用户需求，寻找适合自己的机会。'],['分步形成方案','从模型、搜索、洞察到匹配与增长方案，清楚呈现产品路径。'],['内容接上商品','把内容方向与商品创意放在同一条增长思路里。']],
  mirro: [['有生活感的世界','用场景与事件承载数字分身的经历。'],['有记忆的分身','围绕人格、经历与长期记忆设计持续的数字身份。'],['连接回到真人','通过社群与关系机会帮助发现同好，选择权留给用户。']],
  bean: [['以一天为入口','把工作、生活、社交与灵感组织成连续的一天。'],['关联人物与事情','跨多次交流接上同一件事，并保留原始信息来源。'],['从理解走向行动','根据已有背景，进一步准备材料、提醒与下一步任务。']],
  cards: [['统一的世界观','以马为角色原型，建立四花色的宫廷叙事。'],['角色有分工','J 的行动、Q 的推演、K 的判断形成清楚的等级关系。'],['从卡面到包装','将色彩、丝带与马首徽记延续到牌背、牌盒及材质表现。']]
};
function renderHighlights(id) {
  return `<section class="dialog-block"><h3>项目亮点</h3><div class="highlight-grid">${projectHighlights[id].map(([title,text],index) => `<article><span>0${index+1}</span><h4>${title}</h4><p>${text}</p></article>`).join('')}</div></section>`;
}
function renderFigure(images,index,featured=false) {
  const image = images[index];
  return `<figure class="gallery-figure ${featured?'gallery-featured':''}"><button class="gallery-image" data-gallery-index="${index}" aria-label="放大查看：${image.title}"><img src="${image.src}" alt="${image.title}，${image.kind}" loading="lazy" decoding="async"><span>查看大图 ↗</span></button><figcaption><p class="gallery-kind">${image.kind}</p><h4>${image.title}</h4><p>${image.description}</p></figcaption></figure>`;
}
function galleryGroup(images,title,description,indices,className='') {
  return `<section class="showcase-group ${className}"><div class="gallery-heading"><h3>${title}</h3><span>点击图片，查看大图 ↗</span></div><p class="showcase-description">${description}</p><div class="gallery-grid">${indices.map(index=>renderFigure(images,index,indices.length===1)).join('')}</div></section>`;
}
function renderGallery(images,id) {
  let content;
  if (id === 'ip') {
    content = `<div class="case-steps"><span>01 · IP 模型</span><span>02 · 搜索配置</span><span>03 · 情绪洞察</span><span>04 · 机会匹配</span><span>05 · 增长方案</span></div>` +
      galleryGroup(images,'从洞察，到增长方案','以现有 Demo 展示工作流，再回到 IP 定位与增长方向。',[0],'workflow-showcase') +
      galleryGroup(images,'围绕 IP 定位展开','先理解 IP，再讨论什么机会值得继续验证。',[1]);
  } else if (id === 'mirro') {
    content = galleryGroup(images,'一个世界，两种连接','进入世界感受分身的生活，再通过社群发现人与活动。',[0,1],'world-showcase');
  } else if (id === 'bean') {
    content = `<div class="case-steps bean-steps"><span>记录 · 接住一天</span><span>记忆 · 连接背景</span><span>助手 · 准备下一步</span></div>` +
      galleryGroup(images,'今天、记忆、助手','三个主入口分别承接当天信息、跨日背景和下一步准备。',[0]) +
      galleryGroup(images,'原始记录与设备状态','从来源和处理进度理解一次交流，保留回溯与更正的入口。',[1]);
  } else {
    content = galleryGroup(images,'马之宫廷：牌局之上的秩序','黑桃制定秩序，红桃保管承诺，方块掌管技艺，梅花让分散的力量组成牌局。',[0]) +
      galleryGroup(images,'四种花色，四种性格','统一边框与色彩语言，让每个花色仍有独立的叙事。',[1,2,3,4],'suit-showcase') +
      galleryGroup(images,'角色与等级','从宫廷人物到大小王，体态、眼神、服装和道具一起塑造身份。',[5,6],'character-showcase') +
      galleryGroup(images,'视觉创作与材质表现','从平面设计走向场景、纸感与金属光泽的概念表达。',[7,8],'material-showcase');
  }
  return `<div class="project-gallery project-gallery-${id}" aria-label="项目图片展示">${content}</div>`;
}
dialogContent.addEventListener('click', event => {
  const button = event.target.closest('[data-gallery-index]');
  if (!button) return;
  const image = currentGallery[Number(button.dataset.galleryIndex)];
  const full = document.querySelector('#image-full');
  full.src = image.src; full.alt = image.title + '，' + image.kind;
  document.querySelector('#image-caption').textContent = image.title;
  imageDialog.showModal();
});
document.querySelector('#close-image').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => { if(event.target === imageDialog) imageDialog.close(); });
function closeProject() { dialog.close(); }
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  previousFocus = button;
  currentGallery = window.projectGalleries[button.dataset.project] || [];
  dialogContent.innerHTML = `<p class="dialog-category">${project.category}</p><h2 id="dialog-title" class="dialog-title">${project.title}</h2><p class="dialog-lead">${project.lead}</p><section class="dialog-block"><h3>项目介绍</h3><p>${project.background}</p></section>${renderHighlights(button.dataset.project)}${renderGallery(currentGallery,button.dataset.project)}<section class="dialog-block"><h3>项目进展</h3><p>${project.outcome}</p></section><a class="button primary dialog-contact" href="mailto:647683112@qq.com?subject=${encodeURIComponent('关于 ' + project.title + ' 的合作交流')}">聊聊这个项目 <span>↗</span></a>`;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.scrollTop = 0;
}));
document.querySelector('#close-dialog').addEventListener('click', closeProject);
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProject();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; previousFocus?.focus(); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-category]').forEach(item => { item.hidden = category !== 'all' && item.dataset.category !== category; });
}));
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const contactDialog = document.querySelector('#contact-dialog');
const contactBody = document.querySelector('#contact-dialog-body');
const contactStatus = document.querySelector('#copy-status');
const contactDetails = {
  email: { title: '邮箱联系', value: '647683112@qq.com', href: 'mailto:647683112@qq.com', action: '发邮件聊聊', copy: '复制邮箱' },
  phone: { title: '电话联系', value: '14779010514', href: 'tel:14779010514', action: '拨打电话', copy: '复制手机号' }
};
let contactTrigger;
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  const method = button.dataset.contact;
  contactTrigger = button;
  contactStatus.textContent = '';
  document.querySelector('#contact-dialog-title').textContent = method === 'wechat' ? '微信联系' : contactDetails[method].title;
  if (method === 'wechat') {
    contactBody.innerHTML = '<img class="contact-qr" src="assets/wechat-qr.jpg" alt="Leo 的微信二维码" width="853" height="1032"><p>扫一扫，添加微信聊聊。<br>手机浏览可以打开原图后保存，用微信识别。</p><a class="contact-original" href="assets/wechat-qr.jpg" target="_blank" rel="noopener">打开完整二维码 ↗</a>';
  } else {
    const details = contactDetails[method];
    contactBody.innerHTML = `<a class="contact-value" href="${details.href}">${details.value}</a><div class="contact-dialog-actions"><a class="button primary" href="${details.href}">${details.action} ↗</a><button class="button secondary" data-copy-contact="${method}">${details.copy} ＋</button></div>`;
  }
  contactDialog.showModal();
  document.body.style.overflow = 'hidden';
}));
document.querySelector('#close-contact').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', event => {
  if (event.target !== contactDialog) return;
  const bounds = contactDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) contactDialog.close();
});
contactDialog.addEventListener('close', () => { document.body.style.overflow = ''; contactTrigger?.focus(); });
contactBody.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy-contact]');
  if (!button) return;
  const details = contactDetails[button.dataset.copyContact];
  try { await navigator.clipboard.writeText(details.value); contactStatus.textContent = '已复制，期待你的联系。'; }
  catch { contactStatus.textContent = '请长按或选中上方联系方式进行复制。'; }
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.section-title,.career-list article,.strength-list article').forEach(item => { item.classList.add('reveal-ready'); observer.observe(item); });
}
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let frame;
  hero.addEventListener('pointermove', event => {
    if (reducedMotion.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => { const bounds = hero.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width - .5; const y = (event.clientY - bounds.top) / bounds.height - .5; heroImage.style.transform = `scale(1.025) translate(${x * 8}px,${y * 6}px)`; });
  });
  hero.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); heroImage.style.transform = ''; });
}

// Keep navigation in sync with reading position, without intercepting scrolling.
const pageHeader = document.querySelector('.header');
const pageSections = Array.from(document.querySelectorAll('main > section[id]'));
const pageLinks = Array.from(navigation.querySelectorAll('a'));
let readingFrame;
function updateReadingPosition() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  pageHeader.style.setProperty('--reading-progress', scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
  pageHeader.classList.toggle('is-scrolled', window.scrollY > 32);
  const active = pageSections.filter(section => section.getBoundingClientRect().top <= window.innerHeight * .35).at(-1) || pageSections[0];
  pageLinks.forEach(link => {
    if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => { cancelAnimationFrame(readingFrame); readingFrame = requestAnimationFrame(updateReadingPosition); }, { passive: true });
window.addEventListener('resize', updateReadingPosition);
updateReadingPosition();

// A small spatial response helps desktop covers feel like objects on a desk.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.project-button').forEach(button => {
    const poster = button.querySelector('.poster');
    let tiltFrame;
    button.addEventListener('pointermove', event => {
      if (reducedMotion.matches) return;
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        const bounds = button.getBoundingClientRect();
        poster.style.setProperty('--tilt-x', ((.5 - (event.clientY - bounds.top) / bounds.height) * 3).toFixed(2) + 'deg');
        poster.style.setProperty('--tilt-y', (((event.clientX - bounds.left) / bounds.width - .5) * 4).toFixed(2) + 'deg');
      });
    });
    button.addEventListener('pointerleave', () => { cancelAnimationFrame(tiltFrame); poster.style.removeProperty('--tilt-x'); poster.style.removeProperty('--tilt-y'); });
  });
}
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const projectObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); projectObserver.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.project').forEach(project => { project.classList.add('reveal-ready'); projectObserver.observe(project); });
}
