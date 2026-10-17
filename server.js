const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

// Gallery image names to keep in auto-sync between assets/ and assets/theta-theta-telugu/gallery/
const GALLERY_IMAGE_NAMES = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];

/**
 * Checks and auto-synchronizes gallery images between root assets/ and gallery subfolder.
 * If a user updates assets/{1..6}.png, it syncs to gallery/{1..6}.png.
 * If a user updates gallery/{1..6}.png, it syncs to assets/{1..6}.png.
 */
function syncGalleryImageIfNewer(imgName) {
  try {
    const rootPath = path.join(__dirname, 'assets', imgName);
    const subPath = path.join(__dirname, 'assets', 'theta-theta-telugu', 'gallery', imgName);

    const hasRoot = fs.existsSync(rootPath);
    const hasSub = fs.existsSync(subPath);

    if (hasRoot && hasSub) {
      const rootStat = fs.statSync(rootPath);
      const subStat = fs.statSync(subPath);

      if (rootStat.mtimeMs > subStat.mtimeMs + 50) {
        fs.copyFileSync(rootPath, subPath);
        console.log(`[Auto-Sync] Updated gallery/${imgName} from newer assets/${imgName}`);
      } else if (subStat.mtimeMs > rootStat.mtimeMs + 50) {
        fs.copyFileSync(subPath, rootPath);
        console.log(`[Auto-Sync] Updated assets/${imgName} from newer gallery/${imgName}`);
      }
    } else if (hasRoot && !hasSub) {
      fs.copyFileSync(rootPath, subPath);
      console.log(`[Auto-Sync] Copied assets/${imgName} to gallery/${imgName}`);
    } else if (hasSub && !hasRoot) {
      fs.copyFileSync(subPath, rootPath);
      console.log(`[Auto-Sync] Copied gallery/${imgName} to assets/${imgName}`);
    }
  } catch (err) {
    console.warn(`[Auto-Sync Warning] ${imgName}:`, err.message);
  }
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  // Check if requested file is one of the 6 gallery images and ensure latest version is ready
  const baseName = path.basename(reqPath).toLowerCase();
  if (GALLERY_IMAGE_NAMES.includes(baseName)) {
    syncGalleryImageIfNewer(baseName);
  }

  const filePath = path.join(__dirname, reqPath);
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Generate strict ETag and Last-Modified based on file size and mtime
    const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;
    const lastModified = stats.mtime.toUTCString();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('ETag', etag);
    res.setHeader('Last-Modified', lastModified);

    // Development & Production Caching Policy:
    // HTML/JS/CSS: no-cache, must-revalidate (browser always re-checks with server)
    // Images/Assets: public, max-age=0, must-revalidate (instant 304 if unchanged, immediate 200 on update)
    if (ext === '.html' || ext === '.js' || ext === '.css') {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    // Handle Conditional Requests (304 Not Modified)
    const ifNoneMatch = req.headers['if-none-match'];
    const ifModifiedSince = req.headers['if-modified-since'];

    if (ifNoneMatch === etag || (ifModifiedSince && new Date(ifModifiedSince) >= stats.mtime)) {
      res.writeHead(304);
      res.end();
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
