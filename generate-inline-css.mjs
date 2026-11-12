import { critical } from 'critical';
import { writeFile } from 'node:fs/promises';
import path from 'path';

async function generateCritical() {
  try {
    // Project ka main root directory
    const rootDir = path.resolve('.');
    const distDir = path.join(rootDir, 'dist'); // dist folder ka path

    const { html, report } = await critical({
      base: rootDir,          // Root folder set kiya
      src: 'index.html',      // Root ki index.html
      inline: true,
      dimensions: [
        { width: 390, height: 844 } // Mobile Viewport
      ],
      minify: true,
      // Yahan ignore rules add kiye gaye hain
      ignore: [
        'svg',          // SVG elements ya rules ko ignore karne ke liye
        '@font-face',   // Agar aapko fonts inline nahi chahiye toh yeh bhi add kar sakte hain
        // /my-class/  // Agar kisi regular expression se match hone wale rules hatane hon
      ]
    });

    // Root wali index.html ko hi update karna
    await writeFile(path.join(distDir, 'index.html'), html);

    console.log('✅ Critical CSS generated successfully!');
    console.log('Critical CSS size:', report.bytes?.critical, 'bytes');
    console.log('Engine:', report.engine);
  } catch (err) {
    console.error('❌ Error generating critical CSS:', err);
  }
}

generateCritical();