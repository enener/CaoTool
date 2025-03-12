// 情绪数据架构
const emotions = [
  {
    label: '高兴',
    color: 'url(#primary-gradient)',
    children: ['喜悦', '兴奋', '满足']
  },
  {
    label: '悲伤',
    color: 'url(#secondary-gradient)',
    children: ['失落', '孤独', '沮丧']
  },
  {
    label: '愤怒',
    color: 'url(#tertiary-gradient)',
    children: ['烦躁', '怨恨', '暴怒']
  }
];

// 初始化情绪轮盘
function createWheel() {
  const svg = document.getElementById('emotion-wheel');
  
  // 创建渐变色定义
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  [
    {id: 'primary-gradient', colors: ['#4a90e2', '#7c4dff']},
    {id: 'secondary-gradient', colors: ['#7c4dff', '#ff6f00']},
    {id: 'tertiary-gradient', colors: ['#ff6f00', '#4a90e2']}
  ].forEach(grad => {
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.id = grad.id;
    grad.colors.forEach((color, i) => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', `${i*100}%`);
      stop.setAttribute('class', i===0 ? 'primary-color' : 'secondary-color');
      gradient.appendChild(stop);
    });
    defs.appendChild(gradient);
  });
  svg.appendChild(defs);

  // 创建扇形路径
  const angle = 360 / emotions.length;
  emotions.forEach((emotion, i) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const startAngle = angle * i - 90;
    const endAngle = angle * (i + 1) - 90;
    
    const pathData = [
      'M 300 300',
      `L ${300 + 250 * Math.cos(startAngle * Math.PI / 180)} ${300 + 250 * Math.sin(startAngle * Math.PI / 180)}`,
      `A 250 250 0 0 1 ${300 + 250 * Math.cos(endAngle * Math.PI / 180)} ${300 + 250 * Math.sin(endAngle * Math.PI / 180)}`,
      'Z'
    ].join(' ');
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', emotion.color);
    path.classList.add('emotion-segment');
    path.addEventListener('click', () => handleSelection(emotion));
    svg.appendChild(path);

    // 添加文字标签
    const textAngle = startAngle + angle/2;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', 300 + 160 * Math.cos(textAngle * Math.PI / 180));
    text.setAttribute('y', 300 + 160 * Math.sin(textAngle * Math.PI / 180));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.classList.add('emotion-label');
    text.textContent = emotion.label;
    svg.appendChild(text);
  });
}

// 处理情绪选择
function handleSelection(emotion) {
  const detailDiv = document.getElementById('selection-detail');
  detailDiv.innerHTML = `
    <h5>${emotion.label}</h5>
    <p>相关子类：${emotion.children.join('、')}</p>
    <p class="mb-0">点击其他区域继续选择</p>
  `;
}

// 重置选择
function resetSelection() {
  document.getElementById('selection-detail').innerHTML = '';
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
  createWheel();
  document.getElementById('emotion-wheel').addEventListener('click', e => {
    if(e.target.tagName !== 'path') resetSelection();
  });
});