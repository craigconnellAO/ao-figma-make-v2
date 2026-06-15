/**
 * Agentation MCP Loader
 * 
 * Loads the official Agentation toolbar via esm.sh CDN and connects it to the
 * agentation-mcp server at localhost:4747 for real-time annotation sync.
 *
 * Usage (before </body>):
 *   <script type="module" src="../kit/agentation-loader.js"></script>
 *
 * Only activates on localhost / 127.0.0.1 / local network IPs.
 * Requires a local HTTP server (e.g. `npx serve .`)
 */

const host = location.hostname;
if (host !== 'localhost' && host !== '127.0.0.1' && !host.startsWith('192.168')) {
  // Not local dev — do nothing
} else {
  try {
    // Single CDN source that handles all deps internally via esm.sh resolution
    const { createElement } = await import('https://esm.sh/react@18.3.1');
    const { createRoot } = await import('https://esm.sh/react-dom@18.3.1/client?deps=react@18.3.1');
    const { Agentation } = await import('https://esm.sh/agentation@3.0.2?deps=react@18.3.1,react-dom@18.3.1');

    const container = document.createElement('div');
    container.id = 'agentation-root';
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(
      createElement(Agentation, {
        endpoint: 'http://localhost:4747',
        onSessionCreated: (sessionId) => {
          console.log('[Agentation] Session started:', sessionId);
        }
      })
    );

    console.log('[Agentation] Toolbar active → http://localhost:4747');
  } catch (err) {
    console.warn('[Agentation] Failed to load toolbar:', err.message);
  }
}
