# CaoTool

多功能文本处理工具集合，包含格式化、转换、预览等实用功能

## 功能特性

✅ 英文短句格式化工具  
✔ 自动规范大小写和标点  
✔ 智能段落重组优化排版

✅ JSON转TXT工具  
✔ 结构化展示JSON数据  
✔ 支持嵌套层级可视化

✅ Markdown实时预览工具  
✔ 即时渲染效果预览  
✔ 支持代码语法高亮  
✔ 文件导入导出功能

✅ 换行符清除工具  
✔ 自动合并多余空行  
✔ 智能空格处理

✅ 图片转WebP工具  
✔ 可视化质量调节  
✔ 实时压缩比例显示

✅ 情绪轮盘识别工具  
✔ 三级情绪分类可视化  
✔ 交互式轮盘选择  
✔ 详细情绪描述展示

## 快速开始

1. 克隆仓库
```bash
git clone https://github.com/yourusername/CaoTool.git
```
2. 安装依赖
```bash
cd CaoTool && npm install
```
3. 启动服务
```bash
npm run dev
```

## 技术栈

- **核心框架**: 原生HTML5/CSS3/JavaScript(ES6)
- **UI框架**: [Bootstrap 5.3](https://getbootstrap.com/) 响应式布局
- **Markdown解析**: [marked 12.0](https://marked.js.org/)
- **代码高亮**: [highlight.js 11.9](https://highlightjs.org/)
- **数据可视化**: [D3.js 7.8](https://d3js.org/)（情绪轮盘）
- **构建工具**: [Vite 4.4](https://vitejs.dev/)
- **浏览器API**: File/Clipboard API、Canvas API

## 项目结构
```
CaoTool/
├── feelings-wheel/  # 情绪轮盘工具
├── format-tool/     # 文本格式化工具
├── image-to-webp/   # 图片转换工具
├── json-to-txt/    # JSON转换工具
├── linebreak-remover/ # 换行符处理
├── markdown-preview/ # Markdown预览
└── public/         # 静态资源
```

## 移动端适配

- 全功能响应式布局（≥320px屏幕）
- 触摸友好交互设计
- 智能视口缩放控制
- 移动端专属手势操作（轮盘工具）

## 贡献指南
欢迎通过Issue提交问题或PR参与开发：
1. Fork本仓库
2. 创建功能分支
3. 提交PR并描述变更

## 许可协议
[MIT License](LICENSE)