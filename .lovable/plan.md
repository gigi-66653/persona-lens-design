

## 5张卡片布局 — 解决展开交互问题

### 问题分析
3+2 居中布局 + 原地展开 = 第二行展开时视觉不平衡、布局可能跳动

### 推荐方案：保持 CSS Grid + 最后一行居中

用 CSS Grid 3列，但通过让最后两张卡片占据中间位置来实现居中效果，避免 flexbox 的布局跳动问题。

```text
Grid column:  1           2           3
Row 1:     [Card 1]    [Card 2]    [Card 3]
Row 2:        [Card 4]    [Card 5]
              col 1-2     col 2-3
```

**实现方式**：保持 `grid grid-cols-3`，用 JS 判断最后一行的卡片数量：
- 如果最后一行2张：第4张从第1列中间偏移开始（用 `col-start-1 justify-self-end` + `col-start-3 justify-self-start`），或者更简单地让第4张 `col-start-1` 加左padding、第5张 `col-start-3` 加右padding 来视觉居中
- 更简洁的做法：**最后一行2张卡片各占 `col-span-1`，外层容器加一个空的 `col-start-1` 占位**

### 最简方案（推荐）

其实最干净的做法：**保持 grid-cols-3 不变，最后一行不足3张时，在前面插入一个空的占位 div**。

```text
Row 2:   [空占位]   [Card 4]   [Card 5]
```

这样：
- Grid 布局不变，展开时每张卡片只影响自己所在行
- 第二行的两张卡片自然靠右居中
- 不会出现 flex-wrap 的跳动问题

### 改动范围
1. **Index.tsx**：添加2张新 persona 数据
2. **Index.tsx**：在 grid 渲染逻辑中，当最后一行不足3张时，在行首插入空 `<div />` 占位，使卡片视觉居中
3. **PersonaCard** 不需要改动，展开逻辑保持原样

