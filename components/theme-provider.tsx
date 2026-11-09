import * as React from "react"

// The app forces a dark theme: the `dark` class is set statically on <html>
// in app/layout.tsx (class-based dark mode, see app/globals.css). This
// provider is kept as the home for future theme logic (e.g. a light/dark
// toggle). Note: next-themes was removed because its ThemeProvider renders
// an inline <script>, which React 19.3 refuses to render from components.
function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export { ThemeProvider }
