---
name: Artisan Ochre
colors:
  surface: '#fff8f3'
  surface-dim: '#e2d8ce'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf2e8'
  surface-container: '#f7ece2'
  surface-container-high: '#f1e6dc'
  surface-container-highest: '#ebe1d7'
  on-surface: '#1f1b15'
  on-surface-variant: '#50453b'
  inverse-surface: '#353029'
  inverse-on-surface: '#faefe5'
  outline: '#82756a'
  outline-variant: '#d4c4b7'
  surface-tint: '#7c5730'
  primary: '#79542e'
  on-primary: '#ffffff'
  primary-container: '#956c44'
  on-primary-container: '#fffbff'
  inverse-primary: '#eebd8e'
  secondary: '#635d5a'
  on-secondary: '#ffffff'
  secondary-container: '#eae1dc'
  on-secondary-container: '#69635f'
  tertiary: '#396173'
  on-tertiary: '#ffffff'
  tertiary-container: '#527a8c'
  on-tertiary-container: '#fbfdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcbd'
  primary-fixed-dim: '#eebd8e'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#61401b'
  secondary-fixed: '#eae1dc'
  secondary-fixed-dim: '#cdc5c0'
  on-secondary-fixed: '#1f1b18'
  on-secondary-fixed-variant: '#4b4642'
  tertiary-fixed: '#bfe9fe'
  tertiary-fixed-dim: '#a3cce1'
  on-tertiary-fixed: '#001f2a'
  on-tertiary-fixed-variant: '#224c5d'
  background: '#fff8f3'
  on-background: '#1f1b15'
  surface-variant: '#ebe1d7'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  margin-mobile: 20px
  margin-desktop: 64px
  gutter: 24px
  section-gap: 80px
---

## Brand & Style
The design system is rooted in an artisanal, grounded aesthetic that prioritizes tactile quality and editorial clarity. It targets an audience that values craftsmanship, slow-living, and authenticity.

The design style is a blend of **Minimalism** and **Tactile Editorial**. It utilizes generous whitespace and a sophisticated, earth-toned palette to create a sense of calm and permanence. Visual interest is generated through high-quality typography and subtle surface transitions rather than heavy ornamentation. The interface should feel like a well-curated physical monograph—intentional, sturdy, and refined.

## Colors
The color palette is derived from natural materials: clay, charcoal, and aged paper. 

- **Primary (#a67c52):** A deep ochre used for key actions, brand moments, and highlighting craftsmanship. 
- **Secondary (#282421):** A deep charcoal used for high-contrast typography and "night punctuation"—elements that need to anchor the layout.
- **Surface (#fdfaf5):** A warm ivory that serves as the base for the entire UI, reducing the harshness of pure white.
- **Surface-container (#f5f0e6):** Used for subtle layering, grouping content, or as a background for input elements.

## Typography
This design system utilizes a classic serif-and-sans pairing to achieve an editorial feel.

- **Headlines:** Set in **Newsreader**. These should utilize the variable optical sizing to maintain a literary, authoritative character. Larger sizes use a slight negative letter-spacing to feel tighter and more premium.
- **Body & Labels:** Set in **Work Sans**. This provides a professional, grounded contrast to the serif headlines. Use the medium weight for labels to ensure legibility against the warm surface colors.
- **Scale:** Maintain a clear hierarchy. Mobile headlines are scaled down slightly to ensure the "editorial" look doesn't overwhelm smaller viewports.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous margins to evoke the feeling of a premium magazine layout.

- **Desktop:** 12-column grid with a maximum content width of 1280px. High-impact editorial sections may use offset layouts (e.g., content spanning columns 3-10) to create asymmetric interest.
- **Mobile:** 4-column grid with increased side margins (20px) to frame the content comfortably.
- **Rhythm:** Use an 8px baseline. Vertical spacing between distinct sections should be significant (80px+) to allow the design to breathe and emphasize the artisanal focus.

## Elevation & Depth
Depth is conveyed primarily through **Tonal Layers** and **Low-contrast Outlines**. Avoid heavy drop shadows which contradict the grounded nature of the brand.

- **Level 0 (Base):** Surface color (#fdfaf5).
- **Level 1 (Cards/Containers):** Surface-container (#f5f0e6) or a 1px border in #6e675f at 15% opacity.
- **Level 2 (Interaction):** When an element is lifted (e.g., a card on hover), use a very soft, diffused amber-tinted shadow: `0px 12px 24px rgba(166, 124, 82, 0.08)`.

## Shapes
The shape language is **Soft**. Corners are slightly rounded to feel approachable and organic, but not overly "bubbly" or tech-focused. 

Standard components use a 4px (0.25rem) radius. Larger containers or cards can scale up to 8px (0.5rem). This maintains a structural, architectural integrity while removing the sharpness of a purely brutalist approach.

## Components
- **Buttons:** Primary buttons use the Ochre background with Ivory text. Secondary buttons are outlined in Deep Charcoal with a subtle 1px stroke. Use wide horizontal padding for a more "cinematic" button presence.
- **Input Fields:** Use the Surface-container color as the fill. The active state is indicated by a 1px Ochre bottom-border rather than a full box glow.
- **Cards:** Flat design. Use the Surface-container background to differentiate content blocks. Images within cards should have a slight 4px corner radius.
- **Chips/Tags:** Small, pill-shaped but keeping the `rounded-lg` (0.5rem) limit. Use low-contrast charcoal text on a surface-container background.
- **Dividers:** Use thin, 1px lines in the Primary Ochre color at 20% opacity to separate editorial sections without breaking the flow.
- **Navigation:** Top navigation should be minimal, using Label-LG typography with generous tracking (letter spacing).