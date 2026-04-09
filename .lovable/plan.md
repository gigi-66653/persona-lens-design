

## Panel Session 重新设计

### 问题
当前展开区域只是简单的 key-value 网格，无法承载截图中展示的三大内容块。

### 新的展开区域结构

展开后显示 **3个内容区块**，每个区块用蓝色圆点 + 大写标题标识，保持杂志排版风格：

**区块 1 — WHO THEY ARE**
- 多个维度组（如 Anxiety Level、Trigger Event、Trust Anchor）
- 每组包含 2-3 个条目，用**水平进度条 + 百分比**展示分布
- 进度条：深蓝填充 + 浅灰底色，圆角

**区块 2 — BRAND RELATIONSHIP**
- 混合展示：部分用**圆点列表 + 百分比**（如 Top Purchase Drivers），部分用**进度条**（如 Switching Status）
- 保持与区块1一致的排版节奏

**区块 3 — CONSUMER VOICES**
- 2-3 条引用文本
- 左侧蓝色竖线边框，卡片式引用样式

### 数据结构改造

将 `expandedDetails` 从简单的 `{label, value}[]` 改为结构化的 3 个区块：

```ts
interface BarItem { label: string; value: number; }
interface DimensionGroup { title: string; items: BarItem[]; }
interface BulletGroup { title: string; items: BarItem[]; }

interface ExpandedData {
  whoTheyAre: DimensionGroup[];        // 进度条组
  brandRelationship: {
    bulletGroups: BulletGroup[];        // 圆点列表
    barGroups: DimensionGroup[];       // 进度条组
  };
  consumerVoices: string[];            // 引用文本
}
```

### 改动范围

1. **PersonaCard.tsx** — 更新 props 类型，重写展开区域的渲染逻辑：
   - 新增 `BarChart` 子组件（水平进度条）
   - 新增 `SectionHeader` 子组件（蓝色圆点 + 大写标题）
   - 新增 `QuoteCard` 子组件（左侧蓝色竖线引用）
   - 3个区块用细分隔线分开

2. **Index.tsx** — 更新 5 张卡片的 demo 数据，填充完整的 3 区块内容

### 视觉风格
- 进度条：`bg-primary` 填充（深蓝），`bg-muted` 底色（浅灰），高度 6px，圆角
- 区块标题：`● WHO THEY ARE` 样式，蓝色圆点 + 大写 + 宽字距
- 引用卡片：左侧 3px `border-l-primary` 蓝色竖线，浅灰背景，圆角
- 整体保持与外层卡片一致的杂志感排版

