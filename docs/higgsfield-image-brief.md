# Image brief: Higgsfield generations for the menu and category panels

Ten images: one portrait for the full-screen menu and one landscape for the category
panels, for each of the five categories. Each uses a real Joe & Jone product photo from
joeandjone.co.uk as the product reference, so the product in the scene is the real one.

## Shared art direction (use for all ten)

- Setting: calm, premium contemporary washroom. Warm cream and stone surfaces, soft natural
  daylight, gentle shadows, a little brushed-brass or oak accent. Match the look of the
  current hero slide 3 image (`public/hero/flush-sensor-lounge.webp`).
- The reference product must stay exact: same shape, finish and proportions. No logos or
  text added. Do not invent extra product features.
- Photorealistic, architectural interior photography, 35–50 mm lens feel, no visible
  people unless noted, no clutter.
- Export at full quality (PNG or maximum-quality JPEG/WebP). Do not compress.

## Menu images (portrait, 3:4, at least 1536 × 2048)

Shown in the right half of the full-screen menu, cropped edge to edge. Keep the product
in the middle third so it survives cropping.

| Category | Product reference | Scene | Save as |
|---|---|---|---|
| Automatic Faucets | https://joeandjone.co.uk/wp-content/uploads/2023/08/af22.jpg | The chrome sensor tap on a pale travertine vanity, close three-quarter view, soft morning light across the basin | `public/menu/automatic-faucets.webp` |
| Automatic Soap Dispensers | https://joeandjone.co.uk/wp-content/uploads/2023/08/ad51.jpg | The chrome soap dispenser on a cream stone counter beside a basin, close three-quarter view | `public/menu/automatic-soap-dispenser.webp` |
| Hand Dryers | No photo exists on the current site; needs a real product photo from the client first | Wall-mounted on a warm plaster wall above a slim ledge | `public/menu/hand-dryer.webp` |
| Toilet Flush | https://joeandjone.co.uk/wp-content/uploads/2023/08/at75.jpg | The black glass flush plate with its glowing ring, wall-mounted above a white wall-hung WC | `public/menu/automatic-toilet-flush.webp` |
| Urinal Flush | https://joeandjone.co.uk/wp-content/uploads/2023/07/uf1.jpg | The brushed steel plate with illuminated button on a stone-clad wall above a white urinal | `public/menu/urinal-flush.webp` |

## Category panel images (landscape, 16:9, at least 2560 × 1440)

Full-screen panels on the homepage. Text sits in the **top-left** corner (tag, title,
button) and the **bottom-right** corner (description), so keep those two corners calm and
uncluttered and place the product in the centre.

| Category | Product reference | Scene | Save as |
|---|---|---|---|
| Automatic Faucets | af22.jpg (above) | Wide shot of a long stone vanity with the sensor tap centred, window light from the left | `public/panels/automatic-faucets.webp` |
| Automatic Soap Dispensers | ad51.jpg (above) | Wide shot of a basin counter with the dispenser centred, towels folded softly out of focus to one side | `public/panels/automatic-soap-dispenser.webp` |
| Hand Dryers | Needs a real product photo first | Wide shot of a washroom wall with the dryer centred | `public/panels/hand-dryer.webp` |
| Toilet Flush | at75.jpg (above) | Wide shot of a WC wall, flush plate centred at eye level, lit niche to the right | `public/panels/automatic-toilet-flush.webp` |
| Urinal Flush | uf1.jpg (above) | Wide shot of a commercial washroom wall with the urinal and flush plate centred | `public/panels/urinal-flush.webp` |

Note: the Automatic Faucets panel currently shows the tap video, which takes priority over
its panel image. Remove `panelVideo` for that category in `src/content/demo/catalogue.ts`
if the generated image should be used instead.

## After generating

Drop the files in with the names above (WebP or JPG both work; update the extension in
`src/content/demo/catalogue.ts` if you use JPG), then tell Claude. The width/height values
in the catalogue will be updated to match, and nothing is re-compressed.
