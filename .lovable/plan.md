

## Panel Session 改为侧边 Drawer

### 方案

将展开详情从"卡片内原地展开"改为**右侧抽屉（Drawer）**，点击卡片后从屏幕右侧滑出详情面板，卡片布局完全不受影响。

### 视觉设计
- Drawer 宽度约 **420px**，从右侧滑入，带半透明遮罩层
- 保持毛玻璃质感 + 杂志排版风格，与卡片风格一致
- 顶部显示 **Persona Name + 描述**（呼应卡片信息）
- 下方依次展示 3 个区块（Who They Are / Brand Relationship / Consumer Voices）
- 内容可滚动，Drawer 固定高度为视口高度

### 改动范围

1. **PersonaCard.tsx**：
   - 移除卡片内的展开逻辑（grid-rows 动画、ChevronDown 旋转）
   - 改为点击时调用回调 `onSelect(personaData)`，将数据传递给父组件
   - 卡片恢复为纯展示卡片，不再有 `isExpanded` 状态

2. **新建 PersonaDrawer.tsx**：
   - 使用 Shadcn `Sheet` 组件（已有），从右侧滑出
   - 接收完整的 persona 数据（name、description、expandedData）
   - 渲染 SectionHeader、BarChart、QuoteCard 等子组件（从 PersonaCard 迁移出来）
   - 保持相同的杂志排版风格

3. **Index.tsx**：
   - 新增 `selectedPersona` state
   - 点击卡片时设置 `selectedPersona`，打开 Drawer
   - 关闭 Drawer 时清空选中状态

