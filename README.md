# Portmind AI — Real-Time Maritime & Logistics Intelligence Platform

Portmind AI is a real-time intelligence operating system for modern ports, maritime terminals, and logistics hubs. By unifying computer vision (YOLOv11), predictive analytics (XGBoost), multi-agent orchestration (LangGraph), and semantic knowledge search (ChromaDB), Portmind AI turns raw camera feeds, AIS telemetry, and IoT signals into closed-loop operator actions within milliseconds.

---

## 🚀 Key Features

* **Container Intelligence**: Detects containers, reads alphanumeric shipping IDs (OCR), and performs real-time structural damage scanning.
* **Crane & Asset Predictive Maintenance**: Integrates ML pipelines (XGBoost) to evaluate crane mechanical vibrations, calculate Remaining Useful Life (RUL), and predict failures before they happen.
* **Safety & Compliance Guardrails**: Real-time safety scanning for PPE violations (e.g., helmet/vest detection), thermal anomalies, fire hazards, and unauthorized zone intrusions.
* **Vessel Intelligence**: Ingests real-time AIS data to forecast vessel Estimated Time of Arrival (ETA), optimize berth allocations, and map routes.
* **Knowledge RAG & AI Copilot**: Instantly queries operational manuals, harbor rulebooks, and RAG databases using a natural language interface.
* **Operator Command Center**: An ultra-responsive, real-time command dashboard showing live video inference streams, high-priority safety alerts, and live metrics.

---

## 🛠️ Technology Stack

* **Frontend**: React 19, Vite, TypeScript, Framer Motion (animations), Lucide React (icons).
* **Styling**: Tailwind CSS v4 (flexible, component-based variables, sleek dark mode support).
* **Router & Framework**: TanStack Start (SSR, file-based routing), Vinxi, Nitro.
* **Dev Tools**: ESLint (linting), Prettier (formatting).
* **Package Manager**: NPM (fully migrated from Bun).

---

## 📂 Project Directory Structure

```text
portmind-ai-main/
├── Frontend/                    # Main frontend application folder
│   ├── .lovable/                # Platform config files
│   ├── public/                  # Static assets (partner logos, icons)
│   ├── src/
│   │   ├── components/          # Reusable UI components & layouts
│   │   │   └── ui/              # Atom-level components (buttons, calendar, dialog)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility files, configs, and error catching
│   │   └── routes/              # TanStack Start file-based routing layout
│   ├── tsconfig.json            # TypeScript configuration
│   ├── eslint.config.js         # ESLint style checking config
│   ├── vite.config.ts           # Vite server compilation config
│   └── package.json             # NPM dependencies & scripts
├── .gitignore                   # Workspace root Git ignore file
└── README.md                    # Core project documentation (this file)
```

---

## ⚙️ Setup and Installation

Follow these steps to run the application locally on your machine.

### Prerequisites

* **Node.js**: Ensure you have Node.js installed (v20+ or newer recommended).
* **NPM**: Package manager (comes bundled with Node.js).

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Aryanbuha890/Portmind-AI-Hacknomics.git
   cd portmind-ai-main
   ```

2. **Navigate to the Frontend Directory**:
   ```bash
   cd Frontend
   ```

3. **Install Dependencies**:
   Install all package dependencies via NPM (this resolves and configures peer dependencies):
   ```bash
   npm install
   ```

4. **Start the Local Development Server**:
   Launch the development server on `http://localhost:8080/`:
   ```bash
   npm run dev
   ```

5. **Code Formatting**:
   Ensure code style is uniform before making a commit:
   ```bash
   npm run format
   ```

6. **Build for Production**:
   Compile the production-ready client and server artifacts:
   ```bash
   npm run build
   ```

---

## 📝 Routing Rules (TanStack Start)

Portmind AI uses file-based routing. All pages and route handlers reside inside `Frontend/src/routes/`. 

* `__root.tsx` is the application shell wrapping every view.
* `index.tsx` is the home/landing dashboard page.
* Parent-nested pages are mapped under directories like `app/` and `auth/`.

*Note: Avoid creating standard Next.js folders like `app/layout.tsx` or `src/pages/` as TanStack Start operates under its own file-based routing schema.*

---

## 🤝 Contribution and Push Guidelines

To ensure your code meets styling standards, run formatting checks before staging:
```bash
# Formats all files automatically using Prettier and .gitignore settings
npm run format

# Run linter checks
npm run lint
```
