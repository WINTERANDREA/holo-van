# HOLO VAN - Booking System Implementation Plan

**Stack:** Cal.com (self-hosted) + WeTravel + Stripe + Next.js
**Estimated Development Time:** 2-4 weeks

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     HOLO VAN Next.js App                         │
│                      (holo-van.com)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  /prenota        │    │  /itinerari/     │                   │
│  │  (Booking Page)  │    │  gruppo          │                   │
│  │                  │    │  (Group Trips)   │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           │                       │                              │
│           ▼                       ▼                              │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  Cal.com Embed   │    │  WeTravel Link   │                   │
│  │  (Custom Styled) │    │  (Styled Page)   │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           │                       │                              │
│           ▼                       ▼                              │
│  ┌──────────────────────────────────────────┐                   │
│  │              Stripe Payments              │                   │
│  └──────────────────────────────────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

External Services:
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│    Cal.com       │  │    WeTravel      │  │     Stripe       │
│  (Self-hosted)   │  │    (SaaS)        │  │     (SaaS)       │
│  Railway/Vercel  │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## Phase 1: Cal.com Self-Hosted Setup

### Option A: Railway Deployment (Recommended)

1. **Create Railway Account**
   ```
   https://railway.app/
   ```

2. **Deploy Cal.com Template**
   ```bash
   # Railway has a 1-click Cal.com template
   # Visit: https://railway.app/template/cal-com
   ```

3. **Configure Environment Variables**
   ```env
   # Required
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=<generate-random-32-chars>
   CALENDSO_ENCRYPTION_KEY=<generate-random-32-chars>

   # Stripe Integration
   STRIPE_API_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...

   # App URL
   NEXT_PUBLIC_WEBAPP_URL=https://booking.holo-van.com
   NEXT_PUBLIC_WEBSITE_URL=https://holo-van.com

   # Email (Resend recommended)
   EMAIL_FROM=noreply@holo-van.com
   EMAIL_SERVER_HOST=smtp.resend.com
   EMAIL_SERVER_PORT=465
   EMAIL_SERVER_USER=resend
   EMAIL_SERVER_PASSWORD=re_...
   ```

4. **Set Up Custom Domain**
   ```
   booking.holo-van.com → Railway deployment
   ```

### Option B: Vercel Deployment

1. **Fork Cal.com Repository**
   ```bash
   git clone https://github.com/calcom/cal.com.git
   cd cal.com
   ```

2. **Set Up Database (Neon or Supabase)**
   ```bash
   # Create PostgreSQL database
   # Copy connection string to DATABASE_URL
   ```

3. **Deploy to Vercel**
   ```bash
   vercel deploy
   ```

---

## Phase 2: HOLO VAN Brand Customization

### 2.1 Custom CSS Theme

Create `/src/styles/cal-theme.css` in your Next.js app:

```css
/* HOLO VAN Holographic Theme for Cal.com Embed */

:root {
  /* Brand Colors */
  --holo-charcoal: #2D2926;
  --holo-offwhite: #FAFAFA;
  --holo-pink: #FFB8D0;
  --holo-peach: #FFD4A8;
  --holo-yellow: #FFFFA8;
  --holo-mint: #B8FFB8;
  --holo-cyan: #A8FFF4;
  --holo-blue: #B8D4FF;
  --holo-lavender: #E0B8FF;
}

/* Holographic Gradient */
.cal-holographic-bg {
  background: linear-gradient(
    135deg,
    var(--holo-pink) 0%,
    var(--holo-peach) 15%,
    var(--holo-yellow) 25%,
    var(--holo-mint) 40%,
    var(--holo-cyan) 55%,
    var(--holo-blue) 70%,
    var(--holo-lavender) 85%,
    var(--holo-pink) 100%
  );
  background-size: 400% 400%;
  animation: holographic-shift 15s ease infinite;
}

@keyframes holographic-shift {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}

/* Cal.com Embed Overrides */
.cal-embed {
  font-family: 'Archivo', sans-serif !important;
}

.cal-embed [data-testid="event-type-link"] {
  font-family: 'Archivo ExtraCondensed', sans-serif !important;
  text-transform: uppercase;
  font-weight: 600;
}

.cal-embed button[data-testid="confirm-button"] {
  background: var(--holo-charcoal) !important;
  font-family: 'Archivo ExtraCondensed', sans-serif !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cal-embed button[data-testid="confirm-button"]:hover {
  background: linear-gradient(
    135deg,
    var(--holo-pink) 0%,
    var(--holo-cyan) 50%,
    var(--holo-lavender) 100%
  ) !important;
  color: var(--holo-charcoal) !important;
}
```

### 2.2 Event Types Configuration

Create the following event types in Cal.com dashboard:

| Event Type | Duration | Description (IT) | Description (EN) |
|------------|----------|------------------|------------------|
| `camper-small` | All day | Camper Van Compatto | Compact Camper Van |
| `camper-medium` | All day | Camper Van Standard | Standard Camper Van |
| `camper-large` | All day | Camper Van Famiglia | Family Camper Van |
| `consultation` | 30 min | Chiamata Conoscitiva | Discovery Call |

### 2.3 Custom Booking Questions

Add these custom fields to each event type:

```json
{
  "bookingFields": [
    {
      "name": "pickupLocation",
      "type": "select",
      "label": "Punto di Ritiro / Pickup Location",
      "options": ["Milano", "Roma", "Firenze", "Venezia"]
    },
    {
      "name": "driversLicense",
      "type": "text",
      "label": "Numero Patente / License Number",
      "required": true
    },
    {
      "name": "passengers",
      "type": "number",
      "label": "Numero Passeggeri / Number of Passengers",
      "min": 1,
      "max": 6
    }
  ]
}
```

---

## Phase 3: Next.js Integration

### 3.1 Install Cal.com Embed Package

```bash
npm install @calcom/embed-react
```

### 3.2 Create Booking Component

Create `/src/components/booking/CalBooking.tsx`:

```tsx
'use client';

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalBookingProps {
  eventType: string;
  locale?: 'it' | 'en';
}

export function CalBooking({ eventType, locale = 'it' }: CalBookingProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#2D2926",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <Cal
      calLink={`holovan/${eventType}`}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        theme: "light",
        locale: locale,
      }}
    />
  );
}
```

### 3.3 Create Booking Page

Create `/src/app/[locale]/prenota/page.tsx`:

```tsx
import { CalBooking } from '@/components/booking/CalBooking';
import { HolographicBackground } from '@/components/effects/HolographicBackground';

interface BookingPageProps {
  params: { locale: string };
  searchParams: { van?: string };
}

export default function BookingPage({ params, searchParams }: BookingPageProps) {
  const locale = params.locale as 'it' | 'en';
  const vanType = searchParams.van || 'camper-medium';

  return (
    <main className="min-h-screen">
      <HolographicBackground>
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-archivo-condensed text-5xl font-semibold uppercase mb-8 text-holo-charcoal">
            {locale === 'it' ? 'PRENOTA IL TUO CAMPER' : 'BOOK YOUR CAMPER'}
          </h1>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <CalBooking eventType={vanType} locale={locale} />
          </div>
        </div>
      </HolographicBackground>
    </main>
  );
}
```

### 3.4 Inline Embed Alternative

For deeper customization, use the inline embed:

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function CalInlineBooking() {
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://booking.holo-van.com/embed/embed.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      Cal.inline({
        elementOrSelector: calRef.current,
        calLink: "holovan/camper-van",
        config: {
          theme: "light",
          styles: {
            body: {
              background: "transparent"
            }
          }
        }
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={calRef} className="cal-embed-container" />;
}
```

---

## Phase 4: Stripe Payment Integration

### 4.1 Cal.com Stripe Setup

1. **In Cal.com Dashboard:**
   - Go to Settings → Payments
   - Connect Stripe account
   - Set default currency to EUR

2. **Configure Payment per Event Type:**
   ```
   camper-small: €89/day minimum
   camper-medium: €119/day minimum
   camper-large: €149/day minimum
   consultation: Free
   ```

### 4.2 Stripe Webhook Handler

Create `/src/app/api/webhooks/stripe/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Handle successful booking payment
      await handleBookingConfirmed(session);
      break;

    case 'payment_intent.payment_failed':
      // Handle failed payment
      break;
  }

  return NextResponse.json({ received: true });
}

async function handleBookingConfirmed(session: Stripe.Checkout.Session) {
  // Send confirmation email
  // Update internal booking system
  // Trigger calendar sync
  console.log('Booking confirmed:', session.id);
}
```

---

## Phase 5: WeTravel Group Trips Integration

### 5.1 WeTravel Account Setup

1. **Create Account:** https://www.wetravel.com/
2. **Verify Business Profile**
3. **Set Up Payment Methods** (Stripe recommended for consistency)

### 5.2 Create Group Trip Template

Example trip configuration:

| Field | Value |
|-------|-------|
| Trip Name | Avventura Toscana in Camper |
| Duration | 7 giorni |
| Min Participants | 3 camper (6 people) |
| Max Participants | 10 camper (20 people) |
| Deposit | €200 per camper |
| Payment Plans | 3 installments |

### 5.3 Link Integration Strategy

Create `/src/app/[locale]/itinerari/[slug]/page.tsx`:

```tsx
import { WeTravel Link } from '@/components/booking/WeTravelLink';

const GROUP_TRIPS = {
  'toscana-adventure': {
    weTravelUrl: 'https://www.wetravel.com/trips/holovan-toscana-2026',
    title: { it: 'Avventura Toscana', en: 'Tuscany Adventure' },
    description: { it: '7 giorni tra le colline', en: '7 days through the hills' }
  },
  'coastal-route': {
    weTravelUrl: 'https://www.wetravel.com/trips/holovan-costiera-2026',
    title: { it: 'Rotta Costiera', en: 'Coastal Route' },
    description: { it: 'Da Genova a Napoli', en: 'From Genoa to Naples' }
  }
};

export default function GroupTripPage({ params }: { params: { locale: string, slug: string } }) {
  const trip = GROUP_TRIPS[params.slug as keyof typeof GROUP_TRIPS];
  const locale = params.locale as 'it' | 'en';

  return (
    <main>
      <h1>{trip.title[locale]}</h1>
      <p>{trip.description[locale]}</p>

      <a
        href={trip.weTravelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
      >
        {locale === 'it' ? 'PRENOTA IL TUO POSTO' : 'BOOK YOUR SPOT'}
      </a>
    </main>
  );
}
```

### 5.4 WeTravel Booking Notification Webhook

WeTravel can send webhooks for booking events. Set up handler:

```typescript
// /src/app/api/webhooks/wetravel/route.ts
export async function POST(request: Request) {
  const payload = await request.json();

  // Verify webhook signature (if WeTravel provides one)

  switch (payload.event) {
    case 'booking.created':
      // Sync to your system
      break;
    case 'payment.received':
      // Update payment status
      break;
  }

  return NextResponse.json({ received: true });
}
```

---

## Phase 6: Van Inventory Management

### 6.1 Simple Inventory Model

Create `/src/lib/inventory.ts`:

```typescript
export interface Van {
  id: string;
  name: string;
  slug: string;
  type: 'small' | 'medium' | 'large';
  capacity: number;
  dailyRate: number;
  calEventType: string;
  images: string[];
  features: string[];
}

export const VANS: Van[] = [
  {
    id: 'van-001',
    name: 'Horizon Compact',
    slug: 'horizon-compact',
    type: 'small',
    capacity: 2,
    dailyRate: 89,
    calEventType: 'camper-small',
    images: ['/vans/horizon-1.jpg', '/vans/horizon-2.jpg'],
    features: ['Cucina', 'Letto matrimoniale', 'WiFi']
  },
  {
    id: 'van-002',
    name: 'Voyager Standard',
    slug: 'voyager-standard',
    type: 'medium',
    capacity: 4,
    dailyRate: 119,
    calEventType: 'camper-medium',
    images: ['/vans/voyager-1.jpg', '/vans/voyager-2.jpg'],
    features: ['Cucina', 'Bagno', '2 Letti', 'WiFi', 'Pannello solare']
  },
  {
    id: 'van-003',
    name: 'Explorer Family',
    slug: 'explorer-family',
    type: 'large',
    capacity: 6,
    dailyRate: 149,
    calEventType: 'camper-large',
    images: ['/vans/explorer-1.jpg', '/vans/explorer-2.jpg'],
    features: ['Cucina completa', 'Bagno', '3 Letti', 'WiFi', 'Pannello solare', 'TV']
  }
];
```

### 6.2 Availability Check Component

```tsx
'use client';

import { useState } from 'react';
import { VANS, Van } from '@/lib/inventory';

export function AvailabilityChecker() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availableVans, setAvailableVans] = useState<Van[]>([]);

  const checkAvailability = async () => {
    // In production, this would query Cal.com API or your database
    const response = await fetch(`/api/availability?start=${startDate}&end=${endDate}`);
    const data = await response.json();
    setAvailableVans(data.availableVans);
  };

  return (
    <div className="availability-checker">
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={checkAvailability}>
        VERIFICA DISPONIBILITÀ
      </button>

      {availableVans.map(van => (
        <VanCard key={van.id} van={van} />
      ))}
    </div>
  );
}
```

---

## Testing Checklist

### Pre-Launch Testing

- [ ] Cal.com booking flow (all event types)
- [ ] Stripe payment processing (test mode)
- [ ] Email confirmations sending
- [ ] Calendar sync working
- [ ] WeTravel trip pages accessible
- [ ] Webhook handlers responding
- [ ] Holographic theme displaying correctly
- [ ] Mobile responsive design
- [ ] Italian/English language switching
- [ ] Accessibility (WCAG 2.1)

### Post-Launch Monitoring

- [ ] Set up Stripe dashboard alerts
- [ ] Monitor Cal.com uptime
- [ ] Track conversion rates
- [ ] Check email deliverability

---

## Environment Variables Summary

```env
# Cal.com
NEXT_PUBLIC_CAL_URL=https://booking.holo-van.com
CAL_API_KEY=cal_live_...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...

# WeTravel
WETRAVEL_API_KEY=wt_...
WETRAVEL_WEBHOOK_SECRET=...

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=prenotazioni@holo-van.com
```

---

## File Structure Summary

```
src/
├── app/
│   ├── [locale]/
│   │   ├── prenota/
│   │   │   └── page.tsx          # Booking page with Cal.com embed
│   │   └── itinerari/
│   │       └── [slug]/
│   │           └── page.tsx      # Group trip detail + WeTravel link
│   └── api/
│       ├── availability/
│       │   └── route.ts          # Van availability API
│       └── webhooks/
│           ├── stripe/
│           │   └── route.ts      # Stripe webhook handler
│           └── wetravel/
│               └── route.ts      # WeTravel webhook handler
├── components/
│   └── booking/
│       ├── CalBooking.tsx        # Cal.com embed component
│       ├── CalInlineBooking.tsx  # Inline embed alternative
│       └── AvailabilityChecker.tsx
├── lib/
│   └── inventory.ts              # Van data and types
└── styles/
    └── cal-theme.css             # Cal.com brand overrides
```

---

## Timeline Milestones

| Phase | Tasks | Dependency |
|-------|-------|------------|
| **1** | Cal.com Railway deployment | None |
| **2** | Brand customization + event types | Phase 1 |
| **3** | Next.js integration | Phase 2 |
| **4** | Stripe payment setup | Phase 1 |
| **5** | WeTravel setup + linking | None (parallel) |
| **6** | Van inventory + availability | Phase 3 |
| **Testing** | Full flow validation | All phases |
| **Launch** | DNS cutover, go live | Testing complete |

---

*Implementation plan prepared January 2026*
