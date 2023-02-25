import "./globals.css";

// Required Core Stylesheet
import "@glidejs/glide/dist/css/glide.core.css";

// Optional Theme Stylesheet
import "@glidejs/glide/dist/css/glide.theme.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
}
