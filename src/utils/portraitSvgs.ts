/**
 * High-fidelity Vector Portraits matching the user-uploaded photos:
 * 1. Arafat Ibraimi (Präsident): arafat_profile.png - beige suit, black tie, beard, smile
 * 2. Kadir Saduli (Vize-Präsident): kadir_profile.png - dark suit, glasses, beard, tie
 * 3. Mixhit Osmani (Imam): imam.png - navy suit, white shirt, goatee, colorful pocket square
 * 4. Seran Islami (Mitglied): IMG_0295-EDIT.jpg - sunglasses, gold chain, dark shirt, beach/ocean
 * 5. VAIG_V2: The official 3 golden arches logo
 */

// VAIG_V2 Logo SVG Data URI
export const VAIG_V2_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 760" fill="none">
  <!-- Middle Arch (Tallest) -->
  <path d="M 280 750 L 280 200 C 280 90 370 0 480 0 C 590 0 680 90 680 200 L 680 750" stroke="#9E8468" stroke-width="26" stroke-linecap="butt"/>
  <path d="M 345 750 L 345 205 C 345 130 405 70 480 70 C 555 70 615 130 615 205 L 615 750" stroke="#9E8468" stroke-width="26" stroke-linecap="butt"/>
  <!-- Left Arch -->
  <path d="M 25 750 L 25 360 C 25 240 105 160 200 160 C 295 160 375 240 375 360 L 375 750" stroke="#9E8468" stroke-width="26" stroke-linecap="butt"/>
  <path d="M 90 750 L 90 365 C 90 295 140 230 200 230 C 260 230 310 295 310 365 L 310 750" stroke="#9E8468" stroke-width="26" stroke-linecap="butt"/>
  <!-- Right Arch -->
  <path d="M 585 750 L 585 360 C 585 240 665 160 760 160 C 855 160 935 240 935 360 L 935 750" stroke="#9E8468" stroke-width="26" stroke-linecap="butt"/>
  <path d="M 650 750 L 650 365 C 650 295 700 230 760 230 C 820 230 870 295 870 365 L 870 750" stroke="#9E8468" stroke-width="26" stroke-linecap="butt"/>
</svg>
`)}`;

// Arafat Ibraimi portrait
export const ARAFAT_PROFILE_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg_arafat" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7C7267"/>
      <stop offset="50%" stop-color="#5A524A"/>
      <stop offset="100%" stop-color="#3D3732"/>
    </linearGradient>
    <linearGradient id="suit_tan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#D7BA9D"/>
      <stop offset="100%" stop-color="#B89678"/>
    </linearGradient>
    <linearGradient id="skin_arafat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E2B193"/>
      <stop offset="100%" stop-color="#C79275"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg_arafat)"/>
  <!-- Suit Shoulders -->
  <path d="M 60 400 L 90 280 L 160 270 L 200 330 L 240 270 L 310 280 L 340 400 Z" fill="url(#suit_tan)"/>
  <!-- White Collar Shirt -->
  <polygon points="160,270 200,320 170,300" fill="#F8FAFC"/>
  <polygon points="240,270 200,320 230,300" fill="#F8FAFC"/>
  <polygon points="175,270 225,270 200,315" fill="#FFFFFF"/>
  <!-- Black Tie -->
  <polygon points="194,305 206,305 212,400 188,400" fill="#1E293B"/>
  <!-- Neck -->
  <rect x="170" y="220" width="60" height="60" fill="#C79275" rx="10"/>
  <!-- Head -->
  <ellipse cx="200" cy="180" rx="68" ry="85" fill="url(#skin_arafat)"/>
  <!-- Short Dark Hair -->
  <path d="M 132 170 C 132 105 160 85 200 85 C 240 85 268 105 268 170 C 265 140 250 100 200 100 C 150 100 135 140 132 170 Z" fill="#26221F"/>
  <!-- Ears -->
  <ellipse cx="130" cy="185" rx="10" ry="16" fill="#C79275"/>
  <ellipse cx="270" cy="185" rx="10" ry="16" fill="#C79275"/>
  <!-- Eyes & Eyebrows -->
  <path d="M 160 152 Q 175 148 185 153" stroke="#1A1816" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M 215 153 Q 225 148 240 152" stroke="#1A1816" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="173" cy="165" rx="5" ry="4" fill="#1A1816"/>
  <ellipse cx="227" cy="165" rx="5" ry="4" fill="#1A1816"/>
  <!-- Nose -->
  <path d="M 200 160 L 196 188 L 205 188" stroke="#A77257" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Full Beard & Mustache -->
  <path d="M 150 195 Q 200 205 250 195 C 260 235 245 265 200 268 C 155 265 140 235 150 195 Z" fill="#25211E"/>
  <!-- Cheerful Smile Teeth -->
  <path d="M 180 206 Q 200 216 220 206 Q 200 220 180 206 Z" fill="#FFFFFF"/>
</svg>
`)}`;

// Kadir Saduli portrait
export const KADIR_PROFILE_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg_kadir" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8E9AA8"/>
      <stop offset="50%" stop-color="#5E6C7C"/>
      <stop offset="100%" stop-color="#3B4654"/>
    </linearGradient>
    <linearGradient id="suit_kadir" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E232A"/>
      <stop offset="100%" stop-color="#0F1216"/>
    </linearGradient>
    <linearGradient id="skin_kadir" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ECD0B9"/>
      <stop offset="100%" stop-color="#D7B195"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg_kadir)"/>
  <!-- Black Suit Shoulders -->
  <path d="M 50 400 L 80 270 L 160 260 L 200 320 L 240 260 L 320 270 L 350 400 Z" fill="url(#suit_kadir)"/>
  <!-- White Pocket Square -->
  <polygon points="265,330 285,320 295,335" fill="#FFFFFF"/>
  <!-- White Shirt & Tie -->
  <polygon points="160,260 240,260 200,315" fill="#FFFFFF"/>
  <polygon points="194,305 206,305 212,400 188,400" fill="#0A0D12"/>
  <!-- Neck -->
  <rect x="175" y="215" width="50" height="55" fill="#D7B195" rx="8"/>
  <!-- Head -->
  <ellipse cx="200" cy="175" rx="64" ry="80" fill="url(#skin_kadir)"/>
  <!-- Short Neat Hair -->
  <path d="M 140 160 C 140 100 165 85 200 85 C 235 85 260 100 260 160 C 255 125 240 95 200 95 C 160 95 145 125 140 160 Z" fill="#2B2622"/>
  <!-- Glasses -->
  <rect x="155" y="152" width="38" height="24" rx="4" fill="none" stroke="#2D3748" stroke-width="3"/>
  <rect x="207" y="152" width="38" height="24" rx="4" fill="none" stroke="#2D3748" stroke-width="3"/>
  <line x1="193" y1="162" x2="207" y2="162" stroke="#2D3748" stroke-width="3"/>
  <line x1="140" y1="160" x2="155" y2="160" stroke="#2D3748" stroke-width="2.5"/>
  <line x1="245" y1="160" x2="260" y2="160" stroke="#2D3748" stroke-width="2.5"/>
  <!-- Eyes -->
  <ellipse cx="174" cy="164" rx="4.5" ry="4" fill="#201C18"/>
  <ellipse cx="226" cy="164" rx="4.5" ry="4" fill="#201C18"/>
  <!-- Neat Beard & Mustache -->
  <path d="M 160 200 Q 200 208 240 200 C 248 230 235 255 200 258 C 165 255 152 230 160 200 Z" fill="#2C2723"/>
  <path d="M 185 208 Q 200 216 215 208" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
</svg>
`)}`;

// Mixhit Osmani (Imam) portrait
export const IMAM_PROFILE_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg_imam" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#24334A"/>
      <stop offset="50%" stop-color="#182333"/>
      <stop offset="100%" stop-color="#0E1622"/>
    </linearGradient>
    <linearGradient id="suit_navy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1D2A3E"/>
      <stop offset="100%" stop-color="#111B29"/>
    </linearGradient>
    <linearGradient id="skin_imam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EEDAC5"/>
      <stop offset="100%" stop-color="#DABFA5"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg_imam)"/>
  <!-- Navy Blazer Shoulders -->
  <path d="M 50 400 L 85 270 L 160 260 L 200 330 L 240 260 L 315 270 L 350 400 Z" fill="url(#suit_navy)"/>
  <!-- Colorful Pocket Square -->
  <polygon points="265,330 275,315 285,320 295,335" fill="#E11D48"/>
  <polygon points="275,318 285,312 290,322" fill="#F59E0B"/>
  <!-- Open Collar White Shirt -->
  <polygon points="165,260 200,325 185,280" fill="#F8FAFC"/>
  <polygon points="235,260 200,325 215,280" fill="#F8FAFC"/>
  <polygon points="180,260 220,260 200,310" fill="#FFFFFF"/>
  <!-- Neck -->
  <rect x="175" y="210" width="50" height="55" fill="#DABFA5" rx="8"/>
  <!-- Head -->
  <ellipse cx="200" cy="170" rx="62" ry="78" fill="url(#skin_imam)"/>
  <!-- Hair Styled Back -->
  <path d="M 140 155 C 138 95 165 75 200 75 C 235 75 262 95 260 155 C 255 115 235 88 200 88 C 165 88 145 115 140 155 Z" fill="#2E241F"/>
  <!-- Eyes & Brows -->
  <path d="M 160 148 Q 174 144 184 149" stroke="#1D1714" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 216 149 Q 226 144 240 148" stroke="#1D1714" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="173" cy="160" rx="4.5" ry="4" fill="#2E241F"/>
  <ellipse cx="227" cy="160" rx="4.5" ry="4" fill="#2E241F"/>
  <!-- Nose -->
  <path d="M 200 155 L 197 182 L 204 182" stroke="#B89B7E" stroke-width="2.5" fill="none"/>
  <!-- Goatee & Chin Beard -->
  <path d="M 185 198 Q 200 204 215 198" stroke="#2E241F" stroke-width="3" fill="none"/>
  <path d="M 194 220 L 206 220 L 200 236 Z" fill="#2E241F"/>
  <!-- Gentle Smile -->
  <path d="M 183 205 Q 200 216 217 205" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
</svg>
`)}`;

// Seran Islami portrait (IMG_0295-EDIT.jpg: sunglasses, beard, black resort polo, gold chain, sea sunset)
export const SERAN_ISLAMI_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg_sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E59966"/>
      <stop offset="40%" stop-color="#93C5FD"/>
      <stop offset="70%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
    <linearGradient id="skin_seran" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8BFA3"/>
      <stop offset="100%" stop-color="#D29F7F"/>
    </linearGradient>
    <linearGradient id="sunglasses_lens" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <!-- Ocean Sunset Background -->
  <rect width="400" height="400" fill="url(#bg_sea)"/>
  <!-- Distant Boats / Island -->
  <rect x="40" y="220" width="45" height="10" rx="3" fill="#FFFFFF" opacity="0.6"/>
  <rect x="120" y="215" width="30" height="7" rx="2" fill="#FFFFFF" opacity="0.5"/>
  <!-- Black Resort Polo Shirt -->
  <path d="M 40 400 L 70 280 L 160 270 L 200 320 L 240 270 L 330 280 L 360 400 Z" fill="#111827"/>
  <!-- Gold Chain Necklace -->
  <path d="M 175 285 Q 200 320 225 285" stroke="#F59E0B" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Neck -->
  <rect x="170" y="220" width="60" height="60" fill="#D29F7F" rx="10"/>
  <!-- Head -->
  <ellipse cx="200" cy="180" rx="68" ry="85" fill="url(#skin_seran)"/>
  <!-- Dark Hair -->
  <path d="M 132 170 C 132 105 160 85 200 85 C 240 85 268 105 268 170 C 265 130 250 98 200 98 C 150 98 135 130 132 170 Z" fill="#1C1917"/>
  <!-- Ears -->
  <ellipse cx="130" cy="185" rx="9" ry="15" fill="#D29F7F"/>
  <ellipse cx="270" cy="185" rx="9" ry="15" fill="#D29F7F"/>
  <!-- Luxury Tinted Sunglasses -->
  <rect x="148" y="150" width="46" height="32" rx="7" fill="url(#sunglasses_lens)" stroke="#F59E0B" stroke-width="2.5"/>
  <rect x="206" y="150" width="46" height="32" rx="7" fill="url(#sunglasses_lens)" stroke="#F59E0B" stroke-width="2.5"/>
  <line x1="194" y1="156" x2="206" y2="156" stroke="#F59E0B" stroke-width="3"/>
  <line x1="135" y1="156" x2="148" y2="156" stroke="#F59E0B" stroke-width="2.5"/>
  <line x1="252" y1="156" x2="265" y2="156" stroke="#F59E0B" stroke-width="2.5"/>
  <!-- Well Groomed Beard & Mustache -->
  <path d="M 150 195 Q 200 205 250 195 C 260 240 245 268 200 270 C 155 268 140 240 150 195 Z" fill="#1F1A16"/>
  <!-- Smile -->
  <path d="M 183 210 Q 200 220 217 210" stroke="#FFFFFF" stroke-width="2" fill="none"/>
</svg>
`)}`;
