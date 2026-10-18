export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var saved = localStorage.getItem('linko-theme');
              var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (saved === 'dark' || (!saved && supportDarkMode) || saved === undefined) {
                document.documentElement.classList.add('dark');
                document.documentElement.setAttribute('data-theme', 'dark');
              } else if (saved === 'light') {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}
