# HOLO VAN - Booking System Analysis

**Prepared for:** HOLO VAN
**Date:** January 2026
**Purpose:** Evaluate booking and calendar tools for camper van rental with group trip capabilities

---

## Executive Summary

This analysis evaluates 12 booking solutions for HOLO VAN's premium camper van rental business. Based on your requirements for **essential brand customization**, **group trip management as a core feature**, and **startup-phase volume (<50 bookings/month)**, we recommend:

**Primary Recommendation: Cal.com (self-hosted) + WeTravel**

| Metric | Value |
|--------|-------|
| Estimated Annual Cost | ~$950 |
| Brand Customization | 100% achievable |
| Group Trip Support | Industry-leading |
| Development Effort | Moderate |

---

## Your Requirements

| Requirement | Priority | Status |
|-------------|----------|--------|
| Holographic brand identity in booking UI | Essential | Addressed via Cal.com |
| Group trip coordination & booking | Core feature | Addressed via WeTravel |
| Monthly booking volume | <50/month | Free tiers qualify |
| Bilingual (IT/EN) support | Required | Both tools support |
| Stripe payment integration | Required | Native support |

---

## Solutions Evaluated

### Category A: RV/Camper-Specific Rental Software

| Solution | Pricing | UI Customization | Group Trips | Verdict |
|----------|---------|------------------|-------------|---------|
| [Wheelbase Pro](https://www.wheelbasepro.com/) | FREE | Limited | Basic | Good for fleet management, weak on branding |
| [Booqable](https://booqable.com/) | $29-34/mo | Moderate | Multi-item | Solid rental features, limited styling |
| [VEVS](https://www.vevs.com/caravan-rv-rental-software/) | $40-53/mo | Included site builder | Multi-vehicle | Conflicts with custom Next.js build |
| RENTALL | Custom quote | Flexible | Custom | Enterprise-focused, overkill for startup |

### Category B: General Booking/Calendar Tools

| Solution | Pricing | UI Customization | API Access | Verdict |
|----------|---------|------------------|------------|---------|
| [Cal.com](https://cal.com/) | FREE (self-hosted) | **Excellent** | Full REST API | **Best for brand control** |
| [Calendly](https://calendly.com/) | $10-16/seat/mo | Limited | Standard+ | Too restrictive for holographic theme |
| [SimplyBook.me](https://simplybook.me/) | €8.25-49.90/mo | Good (Premium) | Available | Incomplete white-label |

### Category C: Tour & Activity Platforms

| Solution | Pricing | Commission | UI Control | Verdict |
|----------|---------|------------|------------|---------|
| [Checkfront](https://www.checkfront.com/) | $49-99/mo + 3% | Yes | Widget-based | Fees add up quickly |
| [FareHarbor](https://fareharbor.com/) | 6% commission | Yes | Limited | Commission model unfavorable |
| [Rezdy](https://www.rezdy.com/) | $49-249/mo + 3% | Yes | Widget-based | Expensive for small operators |

### Category D: Group Travel Management

| Solution | Pricing | Group Features | Brand Control | Verdict |
|----------|---------|----------------|---------------|---------|
| [WeTravel](https://www.wetravel.com/) | FREE / $79/mo Pro | **Excellent** | Trip pages | **Best for group trips** |
| [Trawex](https://www.trawex.com/) | Custom | Enterprise | Full | Overkill for current scale |

### Category E: Custom Build

| Approach | Upfront Cost | Annual Cost | Control | Verdict |
|----------|--------------|-------------|---------|---------|
| Directus + Stripe + Next.js | $5,000-20,000 | ~$4,000-6,000 | **Total** | High investment, maximum control |

---

## Feature Comparison Matrix

| Feature | Cal.com | Calendly | SimplyBook | Booqable | WeTravel |
|---------|---------|----------|------------|----------|----------|
| **Holographic CSS** | Yes | No | Partial | No | No |
| **Custom Fonts** | Yes | No | Premium | No | No |
| **White-Label** | Yes | Enterprise | Premium | No | No |
| **Next.js Integration** | Native | Embed | Embed | Embed | Link |
| **Group Bookings** | Collective | Teams | Multi-provider | Multi-item | **Native** |
| **Payment Plans** | Via Stripe | Via Stripe | Built-in | Built-in | **Native** |
| **Participant Tracking** | No | No | CRM | CRM | **Native** |
| **Itinerary Builder** | No | No | No | No | **Native** |
| **Self-Hosted Option** | Yes | No | No | No | No |
| **API Availability** | Full | Standard+ | Available | Available | Available |

---

## Cost Analysis

### Annual Cost by Revenue Tier

| Solution | $30k Revenue | $100k Revenue | $300k Revenue |
|----------|--------------|---------------|---------------|
| **Cal.com (self-hosted)** | ~$50 hosting | ~$200 hosting | ~$500 hosting |
| **Calendly Standard** | $120-192/seat | $120-192/seat | $120-192/seat |
| **SimplyBook.me Premium** | ~€599 | ~€599 | ~€599 |
| **Booqable Essential** | ~$400 | ~$400 | ~$400 |
| **Checkfront** | ~$1,500 | ~$3,600 | ~$9,600 |
| **WeTravel Basic** | FREE + fees | FREE + fees | FREE + fees |
| **Custom Build** | ~$8,000-25,000 | ~$4,000 ongoing | ~$4,000 ongoing |

### Our Recommended Stack Cost

**Cal.com (self-hosted) + WeTravel Basic + Stripe**

| Component | Year 1 | Year 2+ |
|-----------|--------|---------|
| Cal.com Hosting (Vercel free tier) | $0 | $0 |
| Domain/SSL | Included in site | Included |
| WeTravel Basic | $0 | $0 |
| Stripe Fees (2.9% + $0.30) @ $30k | ~$900 | ~$900 |
| Development/Setup | ~$0 (DIY) or $2,000-5,000 | $0 |
| **Total** | **$900-6,000** | **~$900** |

---

## Recommendation: Cal.com + WeTravel

### Why Cal.com for Primary Booking

1. **Open Source**: Full code access means unlimited UI customization
2. **Booker Atoms**: Modular React components integrate into Next.js
3. **100% White-Label**: No Cal.com branding, complete control
4. **Free Self-Hosting**: Deploy on Vercel or Railway at no cost
5. **Stripe Native**: Built-in payment handling

### Why WeTravel for Group Trips

1. **Purpose-Built**: Designed specifically for multi-day group travel
2. **Payment Plans**: Installments for groups without custom code
3. **Participant Management**: Track who's paid, forms, waivers
4. **Itinerary Tools**: Share trip details with participants
5. **Free Tier**: Adequate for startup volume

### Integration Strategy

```
┌─────────────────────────────────────────────────────┐
│                  HOLO VAN Website                    │
│                   (Next.js)                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│   ┌──────────────┐         ┌──────────────┐        │
│   │   Cal.com    │         │   WeTravel   │        │
│   │   Embedded   │   OR    │  Trip Pages  │        │
│   │              │         │  (External)  │        │
│   └──────┬───────┘         └──────┬───────┘        │
│          │                        │                 │
│          ▼                        ▼                 │
│   ┌──────────────┐         ┌──────────────┐        │
│   │  Individual  │         │    Group     │        │
│   │   Bookings   │         │  Adventures  │        │
│   └──────┬───────┘         └──────┬───────┘        │
│          │                        │                 │
│          └──────────┬─────────────┘                 │
│                     ▼                               │
│            ┌──────────────┐                         │
│            │    Stripe    │                         │
│            │   Payments   │                         │
│            └──────────────┘                         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cal.com self-hosting complexity | Medium | Medium | Use Railway 1-click deploy |
| WeTravel external redirect (off-brand) | High | Low | Style trip pages, use consistent messaging |
| Stripe fee increases | Low | Low | Standard industry pricing |
| Cal.com project discontinued | Very Low | High | Open source = fork available |
| Volume outgrows free tier | Low (Year 1) | Low | Upgrade paths available |

---

## Alternative Considerations

### If Brand Flexibility Increases
**Booqable** ($29/mo) provides excellent rental-specific features with moderate customization.

### If Budget Increases
**Custom Build** with Directus + Stripe offers complete control but requires $5,000-20,000 upfront investment.

### If Volume Scales Rapidly
**Checkfront** or **Rezdy** with their OTA distribution could drive more bookings, despite higher fees.

---

## Next Steps

1. **Create Cal.com Account** - Set up self-hosted instance on Railway or Vercel
2. **Create WeTravel Account** - Configure a test group trip
3. **Brand Customization POC** - Test holographic gradient implementation in Cal.com
4. **Stripe Setup** - Connect payment processing
5. **Integration Development** - Embed booking into Next.js site

---

## Sources

### RV Rental Software
- [Wheelbase Pro](https://www.wheelbasepro.com/)
- [Booqable Pricing](https://booqable.com/pricing/)
- [VEVS Caravan & RV Rental](https://www.vevs.com/caravan-rv-rental-software/)

### Booking Calendars
- [Cal.com Pricing](https://cal.com/pricing)
- [Cal.com Enterprise](https://cal.com/enterprise)
- [Calendly Pricing](https://calendly.com/pricing)
- [SimplyBook.me Pricing](https://simplybook.me/en/pricing)

### Tour & Activity
- [Checkfront Pricing](https://www.checkfront.com/pricing/)
- [Rezdy Pricing](https://www.itqlick.com/rezdy/pricing)
- [FareHarbor](https://fareharbor.com/)

### Group Travel
- [WeTravel](https://www.wetravel.com/)
- [WeTravel Pricing](https://product.wetravel.com/pricing)

### Build vs Buy Analysis
- [ZentrumHub - Booking Engine Cost Analysis](https://www.zentrumhub.com/booking-engine-cost-build-vs-buy/)
- [Capterra - RV Rental Software Comparison](https://www.capterra.com/campground-management-software/)
- [G2 - Booqable Reviews](https://www.g2.com/products/booqable-rental-software/reviews)

---

*Analysis prepared January 2026*
