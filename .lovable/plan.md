

## 恢复 Persona Gallery 标题 + Headline

### 问题
上一次实现 TopNav + StepIndicator 时，把原来的 "Persona Gallery" 标题和副标题 "Click a card to expand and view detailed dimension analysis" 删掉了。用户要求保留。

### 改动

**`src/pages/Index.tsx`**：在 StepIndicator 下方、卡片网格上方，恢复原有的 header 区域：

```tsx
<header className="mb-10 text-center">
  <h1 className="text-3xl font-bold tracking-tight text-foreground">
    Persona Gallery
  </h1>
  <p className="mt-2 text-muted-foreground">
    Click a card to expand and view detailed dimension analysis
  </p>
</header>
```

插入位置：`<div className="relative z-10 mx-auto max-w-5xl px-6 py-10">` 内部、grid 之前。

仅改 Index.tsx 一个文件。

