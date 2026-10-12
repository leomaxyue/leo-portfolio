'use strict';
const projects = {
  ip: { title: 'IP 增长智能体', category: 'AI AGENT / BUSINESS', lead: '让趋势洞察接上内容创作与商品机会。', background: 'IP 运营不止需要持续产出内容，还需要判断什么值得做，以及如何把内容与商业机会连接起来。这个项目围绕 IP 公司、主理人与品牌团队的需求展开。', approach: ['梳理 IP 信息、用户与趋势，寻找值得进一步验证的机会。','将内容方向与商品创意放到同一条产品路径中。','通过演示与客户需求讨论，持续明确产品边界。'], outcome: '现有内容包括产品演示与商务沟通材料，围绕真实业务需求持续探索增长工作流。', focus: '需求分析 · 产品定义 · 增长工作流 · 商业化探索' },
  mirro: { title: 'Mirro', category: 'AI SOCIAL / DIGITAL LIFE', lead: '让另一个你，带来认识世界与连接他人的新方式。', background: '探索一个由 AI 数字分身组成的第二世界：分身能够积累经历与记忆，帮助真人发现可能感兴趣的人、活动与关系机会。', approach: ['围绕数字分身、人格与长期记忆设计产品体验。','让数字世界里的经历能够被看见、被理解。','将现实关系的选择权留给用户，明确 AI 行动边界。'], outcome: '现有内容包括概念方案、原型与项目沟通材料，聚焦数字分身、世界体验与关系发现。', focus: '产品构想 · 数字生命 · 社交体验 · 原型设计' },
  bean: { title: '录音豆智能助手', category: 'MEMORY / AI × HARDWARE', lead: '把一天的交流，接上人物、事情与下一步。', background: '会议、活动、朋友邀约与灵感分散在一天里。只有转写与摘要，还不足以帮助用户记住承诺、整理变化和准备下一次交流。', approach: ['以一天为入口，组织多次独立交流。','关联人物与事情，保存有来源的事实和约定。','从记录继续走向提醒、准备材料和写作等任务。'], outcome: '现有内容包括 Anker 黑客松智能录音赛题的产品需求文档与页面设计规范，覆盖一天的交流、人物记忆与行动组织。', focus: '场景设计 · AI 记忆 · 硬件协同 · 产品需求' },
  aigc: { title: 'AIGC 创作', category: 'VISUAL / CREATIVE DIRECTION', lead: '用新的创作工具，把想象变成看得见的表达。', background: '把生成式工具放进视觉探索的过程，关注角色、场景、材质和叙事之间的关系，让创作围绕一个统一的主题展开。', approach: ['从视觉方向与主题出发，定义创作语言。','通过提示词与多轮调整探索构图、角色与材质。','将视觉素材组织成可交流、可继续制作的设计方案。'], outcome: '已整理视觉语言、创作提示词和设计展示材料。本页封面是网站视觉示意，后续可加入确认后的原始作品图。', focus: '视觉方向 · 生成式创作 · 角色与场景 · 设计表达' },
  cards: { title: 'AIGC 卡牌', category: 'AIGC / CARD SERIES', lead: '让生成式视觉，进入可以握在手里的媒介。', background: '以卡牌与文创为载体，把角色、符号、故事和材料组织成一套连贯的产品表达。包含 The Court of Cards 与相关文创设计探索。', approach: ['建立卡面、图形与系列之间的视觉关系。','探索纸张、工艺与包装对作品体验的影响。','将主题叙事与设计说明整合为展示材料。'], outcome: '现有内容包括卡牌产品故事、展示方案及相关设计包。本页卡面为系列视觉示意。', focus: '系列设计 · 卡牌叙事 · 视觉表达 · 实体媒介' }
};
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
let previousFocus;
function closeProject() { dialog.close(); }
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  previousFocus = button;
  dialogContent.innerHTML = `<p class="dialog-category">${project.category}</p><h2 id="dialog-title" class="dialog-title">${project.title}</h2><p class="dialog-lead">${project.lead}</p><section class="dialog-block"><h3>从什么问题开始</h3><p>${project.background}</p></section><section class="dialog-block"><h3>产品与创作思路</h3><ul>${project.approach.map(item => `<li>${item}</li>`).join('')}</ul></section><section class="dialog-block"><h3>已形成的内容</h3><p>${project.outcome}</p></section><section class="dialog-block"><h3>项目关注点</h3><p>${project.focus}</p></section><a class="button primary dialog-contact" href="mailto:647683112@qq.com?subject=${encodeURIComponent('关于 ' + project.title + ' 的合作交流')}">聊聊这个项目 <span>↗</span></a>`;
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
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('647683112@qq.com'); status.textContent = '邮箱已复制，期待你的来信。'; }
  catch { status.textContent = '暂时无法自动复制，请复制上方邮箱，或直接点击发送邮件。'; }
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
