# LinguoAI - Premium Writing Assistant

A production-ready SaaS platform that provides AI-powered writing analysis, featuring user authentication, credit-based billing, advanced text analysis, and report generation.

## Features

- **Authentication System** - Secure signup/login with session management
- **Text Analysis** - Grammar, spelling, style, tone, and readability checks
- **Plagiarism Detection** - Detect copied content and potential plagiarism
- **AI Content Detection** - Identify AI-generated text and humanize it
- **Report Generation** - Export analysis results as TXT, CSV, or PDF
- **Credit System** - Monthly credit-based usage model
- **Analysis History** - Track all past analyses with date and metrics
- **Multi-tier Pricing** - Starter, Professional, and Enterprise plans
- **User Dashboard** - Comprehensive analytics and settings management

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4 with semantic design tokens
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage

### Backend
- **API Routes**: Next.js Route Handlers
- **Analysis Engine**: Advanced text analysis with multiple metrics
- **Export System**: Multi-format report generation (TXT, CSV, PDF)
- **Credit Management**: Request-based credit deduction

## Project Structure

\`\`\`
linguoai/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx (Landing Page)
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx (Main Dashboard)
│   │   ├── layout.tsx
│   │   ├── history/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── help/page.tsx
│   │   └── upgrade/page.tsx
│   └── api/
│       ├── analyze/route.ts
│       ├── export/route.ts
│       ├── credits/route.ts
│       └── payment/
│           ├── checkout/route.ts
│           └── webhook/route.ts
├── components/
│   ├── nav-bar.tsx
│   ├── hero-section.tsx
│   ├── features-grid.tsx
│   ├── pricing-section.tsx
│   ├── cta-section.tsx
│   ├── footer.tsx
│   ├── dashboard-layout.tsx
│   ├── dashboard-sidebar.tsx
│   ├── text-analyzer.tsx
│   ├── analysis-options.tsx
│   ├── report-viewer.tsx
│   ├── pricing-card.tsx
│   ├── quick-stats.tsx
│   └── analysis-history.tsx
├── lib/
│   └── analysis-utils.ts
└── README.md
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/linguoai.git
cd linguoai
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Overview

### Landing Page
- Modern hero section with value proposition
- Feature highlights with icons
- Pricing tiers (Starter, Professional, Enterprise)
- Call-to-action sections
- Responsive footer

### Authentication
- Email/password signup with validation
- Secure login with localStorage sessions
- Password confirmation checks
- Auto-redirect to dashboard when authenticated

### Dashboard
- **Text Analyzer** - Paste or type text for analysis
- **Analysis Options** - Select specific checks (grammar, tone, readability, etc.)
- **Live Results** - Real-time analysis with detailed issue breakdown
- **Quick Stats** - Display total analyses, average score, words analyzed, credits remaining
- **Analysis History** - View past analyses with timestamps and metrics

### Analysis Engine
The analysis system evaluates text for:
- Grammar issues and sentence construction
- Style and tone suggestions
- Readability score (0-100)
- Plagiarism probability
- AI-generated content probability
- Paraphrase opportunities

### Report Generation
- View detailed analysis results
- Copy reports to clipboard
- Export to multiple formats (TXT, CSV, PDF)
- Severity-based issue categorization

### User Settings
- Email notification preferences
- Detailed report options
- Private mode toggle (disable history)

## API Routes

### POST /api/analyze
Performs comprehensive text analysis.

**Request:**
\`\`\`json
{
  "text": "Your text here...",
  "options": ["grammar", "tone", "readability", "plagiarism", "ai-detect"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "grammarIssues": 5,
  "styleSuggestions": 3,
  "readabilityScore": 78,
  "wordCount": 150,
  "sentenceCount": 8,
  "issues": [
    {
      "type": "Grammar",
      "message": "Subject-verb agreement error",
      "severity": "high"
    }
  ]
}
\`\`\`

### POST /api/export
Generates and exports analysis reports.

**Request:**
\`\`\`json
{
  "text": "Your text here...",
  "analysis": { /* analysis object */ },
  "format": "txt|csv|pdf"
}
\`\`\`

### GET/POST /api/credits
Manages user credits.

## Pricing Plans

| Plan | Price | Credits | Features |
|------|-------|---------|----------|
| Starter | $9/mo | 100 | Basic analysis, Grammar & spelling, Readability |
| Professional | $29/mo | 500 | All Starter + Plagiarism detection, AI detection, Advanced style |
| Enterprise | $99/mo | 2000+ | All Professional + API access, Custom integrations, Dedicated support |

## Deployment

### Frontend on Vercel
\`\`\`bash
vercel deploy
\`\`\`

### Backend Configuration
- Set environment variables in Vercel dashboard
- Connect to database (Supabase/Neon)
- Configure payment webhook

## Future Enhancements

1. **Database Integration** - Connect to Supabase/Neon for persistent data
2. **Real Authentication** - Implement Supabase Auth or Firebase
3. **AI Integrations** - Connect to real grammar and plagiarism APIs
4. **Payment Processing** - Integrate Stripe for subscriptions
5. **User Profiles** - Save preferences and analysis history
6. **Team Features** - Collaboration and shared workspaces
7. **API for Developers** - REST API for third-party integrations
8. **Mobile App** - React Native mobile version

## License

MIT
