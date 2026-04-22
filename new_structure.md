app/
  (public)/                    -- no auth required
    page.tsx                   -- landing page
    signin/page.tsx
    signup/page.tsx
    invite/[token]/page.tsx
    share/[id]/page.tsx

  (auth)/                      -- Spring Boot JWT required
    dashboard/
      layout.tsx               -- loads user, org, workspace context
      page.tsx
      inbox/page.tsx
      tasks/page.tsx
      ai/page.tsx
      mail/page.tsx
      github/page.tsx
      chat/[channel]/page.tsx
      docs/
        layout.tsx
        page.tsx
        [docId]/page.tsx       -- individual doc pages (missing currently)
      projects/
        [projectSlug]/         -- dynamic, not hardcoded sprint-3
          page.tsx
          board/page.tsx
          settings/page.tsx    -- missing
      teams/
        [teamSlug]/            -- dynamic, not hardcoded backend
          page.tsx
    account/
      layout.tsx
      profile/page.tsx
      security/page.tsx
      notifications/page.tsx
      connections/page.tsx
      billing/page.tsx
    settings/
      layout.tsx
      general/page.tsx
      members/page.tsx
      roles/page.tsx
      github/page.tsx
      subscription/page.tsx
      seats/page.tsx
      invoices/page.tsx
      automations/page.tsx
      webhooks/page.tsx
      email/page.tsx
      appearance/page.tsx
      notifications/page.tsx
      danger/page.tsx

  api/                         -- Next.js API routes (minimal — most logic is Spring Boot)
    auth/
      callback/route.ts        -- OAuth callback handler
      refresh/route.ts         -- JWT refresh proxy
    webhooks/
      stripe/route.ts          -- Stripe webhook receiver
    upload/
      presign/route.ts         -- R2 presigned URL generator proxy