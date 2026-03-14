# AIOpsClaw MVP

## 项目概述

AIOpsClaw 是一个智能运维平台，通过 LLM 驱动的自动化实现"我稍后会自动化它"的理念。

## 核心架构

### 1. Gateway（网关）
- WebSocket 服务器
- 插件系统管理
- 会话和状态管理

### 2. UI（控制面板）
- LitElement 构建的 Web Components
- 实时状态显示
- 技能管理界面

### 3. Skills（技能系统）
- 自动化工作流
- 工具集成
- 记忆系统

## 技术栈

- **运行时**: Node.js 24+
- **语言**: TypeScript
- **包管理**: pnpm
- **UI 框架**: LitElement
- **构建工具**: Vite / Rolldown

## 快速开始

```bash
cd aiopsclaw/claw-core
pnpm install
pnpm gateway:dev
pnpm ui:dev
```

访问 http://localhost:5174/

## 目录结构

```
aiopsclaw/
├── claw-core/          # 核心代码
│   ├── src/           # 源代码
│   ├── extensions/    # 扩展插件
│   ├── packages/      # 包
│   ├── ui/            # UI 界面
│   └── scripts/       # 脚本
└── docs/              # 文档
```

## License

MIT
