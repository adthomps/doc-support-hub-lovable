# APT spacing audit & alignment

## Audit findings

Scope: every page in `src/pages/*` plus shared layout primitives (`AptSection`, `AptCard`, `Footer`, `Header`, `AptBreadcrumbs`).

What is already correct
- All pages wrap content in `AptSection` with `spacing="compact"` (hubs/docs/support) or `spacing="default"` (Index landing).
- All cards are `AptCard` (default / interactive / subtle / hero / feature). No raw `<div>` cards.
- No hardcoded colors found (`text-white`, `bg-black`, `#hex` in components).
- Grid containers consistently use `grid lg:grid-cols-3 gap-6`.

Inconsistencies to fix
1. Main column vertical rhythm — mixed:
   - `space-y-6`: Developers, Businesses, Resellers, GettingStarted, Article, Status.
   - `space-y-4`: Support, Faq, ApiReference, Changelog.
   Rule: every "main column that stacks cards" uses `space-y-6`.

2. Side aside rhythm — mostly `space-y-6`, but `ApiReference.tsx` aside uses `space-y-4`. Align to `space-y-6`.

3. `AptCardContent` inner rhythm — mixed `space-y-2 / 3 / 4 / 5`. Adopt a 3-tier rule:
   - `space-y-2` for tight link/button stacks (nav lists, FAQ links, CTA stacks).
   - `space-y-3` for mixed metadata + list rows (article rows, status rows).
   - `space-y-4` for prose / form blocks / numbered procedures.
   Replace one-off `space-y-5` (Developers) and `space-y-2.5` (Developers ol) with `space-y-4` / `space-y-2`.

4. Off-scale spacing — remove:
   - `Resellers.tsx` `-mt-1` on persona description.
   - `Article.tsx` hero uses `mb-3 / mt-2 / mt-4` ad-hoc; wrap header content in `space-y-3` stack.
   - `Index.tsx` `space-y-2 mb-6` list — switch to `space-y-2` + trailing `mt-6` button.

5. Page intros — `Changelog.tsx` currently renders its own `space-y-4 mb-6` header above the AptSection content area. Move title/description/filters into the existing `AptSection` `eyebrow/title/description/actions` props so all pages share the same header pattern.

6. `Support.tsx` `TabsContent` uses `mt-4 space-y-4`; align inner stack to `space-y-6` so it matches the main column rhythm (tabs sit inside the main column).

7. `AptSection.tsx` header gap — currently `mb-10` + internal `gap-3`. Keep as-is (it is the canonical primitive); the fixes above flow into it.

## Spacing standard (documented in plan.md)

```
Section spacing      AptSection spacing="compact" (hubs/docs) | "default" (landing)
Section header       AptSection eyebrow/title/description/actions (no custom header)
Two-col grid         grid lg:grid-cols-3 gap-6
Main column stack    space-y-6
Aside stack          space-y-6
Card inner — tight   space-y-2  (link/CTA stacks)
Card inner — list    space-y-3  (rows with metadata)
Card inner — prose   space-y-4  (paragraphs, forms, steps)
List items inside ul/ol  space-y-1.5
Card padding         AptCard padding= dense | default | feature (no ad-hoc p-*)
No off-scale         no -mt-*, no space-y-2.5 / 5, no per-element mt-2/mt-3/mt-4 stacks
```

## Files to edit

- `src/pages/Support.tsx` — main column `space-y-4` → `space-y-6`; TabsContent `space-y-4` → `space-y-6`.
- `src/pages/Faq.tsx` — main column `space-y-4` → `space-y-6`.
- `src/pages/ApiReference.tsx` — main column `space-y-4` → `space-y-6`; aside `space-y-4` → `space-y-6`; AptCardContent `space-y-4` (sidebar tips) stays per rule.
- `src/pages/Changelog.tsx` — remove custom `space-y-4 mb-6` header; move title + filters into `AptSection` `description` / `actions`; Accordion stays `space-y-3`.
- `src/pages/Developers.tsx` — `space-y-5` → `space-y-4`; `space-y-2.5` → `space-y-2`.
- `src/pages/Resellers.tsx` — drop `-mt-1` on persona description.
- `src/pages/Article.tsx` — wrap hero header children in a single `space-y-3` stack; remove `mb-3 / mt-2 / mt-4` one-offs.
- `src/pages/Index.tsx` — replace `space-y-2 mb-6` with `space-y-2` and lift the CTA spacing to a wrapper.
- `.lovable/plan.md` — append the "APT spacing standard" block above as the project's spacing contract.

No new components, no token changes, no logic changes. Pure presentational alignment.
