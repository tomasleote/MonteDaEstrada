import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

/**
 * ESM workaround to get __dirname in Node.js modules
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration for retries and timeouts
 */
const CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // ms between retries
  DOWNLOAD_TIMEOUT: 15000, // 15 seconds per download
  MIN_FILE_SIZE: 100, // bytes - skip files smaller than this
};

/**
 * Download a single image with retry logic
 * @param {string} url - Full URL of the image
 * @param {string} filePath - Destination file path
 * @param {number} retries - Current retry count
 * @returns {Promise<Object>} Result object with success/failure info
 */
async function downloadImage(url, filePath, retries = 0) {
  return new Promise((resolve) => {
    const makeRequest = () => {
      const file = fs.createWriteStream(filePath);
      const timeout = setTimeout(() => {
        file.destroy();
        resolve({
          success: false,
          reason: 'timeout',
          url,
          filePath,
        });
      }, CONFIG.DOWNLOAD_TIMEOUT);

      https
        .get(url, (response) => {
          clearTimeout(timeout);

          // Handle redirects
          if (response.statusCode >= 300 && response.statusCode < 400) {
            file.destroy();
            fs.unlink(filePath, () => {}); // Clean up
            if (response.headers.location) {
              // Don't resolve yet, re-request with new URL
              https.get(response.headers.location, (redirectResponse) => {
                redirectResponse.pipe(file);
                file.on('finish', () => {
                  file.close();
                  const stats = fs.statSync(filePath);
                  if (stats.size < CONFIG.MIN_FILE_SIZE) {
                    fs.unlink(filePath, () => {});
                    resolve({
                      success: false,
                      reason: 'too_small',
                      size: stats.size,
                      url,
                      filePath,
                    });
                  } else {
                    resolve({
                      success: true,
                      size: stats.size,
                      url,
                      filePath,
                    });
                  }
                });
              });
            }
            return;
          }

          if (response.statusCode !== 200) {
            file.destroy();
            fs.unlink(filePath, () => {});
            resolve({
              success: false,
              reason: `http_${response.statusCode}`,
              statusCode: response.statusCode,
              url,
              filePath,
            });
            return;
          }

          response.pipe(file);
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(filePath);
            if (stats.size < CONFIG.MIN_FILE_SIZE) {
              fs.unlink(filePath, () => {});
              resolve({
                success: false,
                reason: 'too_small',
                size: stats.size,
                url,
                filePath,
              });
            } else {
              resolve({
                success: true,
                size: stats.size,
                url,
                filePath,
              });
            }
          });
        })
        .on('error', (err) => {
          clearTimeout(timeout);
          file.destroy();
          fs.unlink(filePath, () => {});

          if (retries < CONFIG.MAX_RETRIES) {
            console.log(
              `  ⟳ Retry ${retries + 1}/${CONFIG.MAX_RETRIES} for ${path.basename(filePath)}`
            );
            setTimeout(() => {
              downloadImage(url, filePath, retries + 1).then(resolve);
            }, CONFIG.RETRY_DELAY);
          } else {
            resolve({
              success: false,
              reason: 'network_error',
              error: err.message,
              url,
              filePath,
            });
          }
        });
    };

    makeRequest();
  });
}

/**
 * URL encode spaces and special characters in filenames
 * @param {string} filename - Original filename
 * @returns {string} URL-encoded filename
 */
function encodeFilename(filename) {
  return filename.replace(/ /g, '%20');
}

/**
 * Get file extension from URL
 * @param {string} url - URL or filename
 * @returns {string} File extension (lowercase)
 */
function getExtension(url) {
  const match = url.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : 'jpg';
}

/**
 * Create directory if it doesn't exist
 * @param {string} dirPath - Directory path
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Main download function
 */
async function main() {
  console.log('📥 Starting image download process...\n');

  // Read manifest
  const manifestPath = path.join(__dirname, 'image-scrape-manifest.json');
  const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestContent);

  const { baseUrl, targetDir, filterMinSize } = manifest;
  const absoluteTargetDir = path.join(__dirname, targetDir);

  console.log(`Base URL: ${baseUrl}`);
  console.log(`Target Directory: ${absoluteTargetDir}`);
  console.log(`Min File Size Filter: ${filterMinSize} bytes\n`);

  // Statistics
  const stats = {
    totalImages: 0,
    downloaded: 0,
    skipped: 0,
    filtered: 0,
    failed: 0,
    byReason: {},
  };

  // Process each page section
  for (const [sectionKey, sectionData] of Object.entries(manifest.pages)) {
    console.log(`\n🗂️  Processing section: ${sectionKey}`);
    console.log(`   Folder: ${sectionData.folder}`);

    const folderPath = path.join(absoluteTargetDir, sectionData.folder);
    ensureDir(folderPath);

    const allImages = [
      ...(sectionData.headers || []),
      ...(sectionData.fullSizeImages || []),
    ];

    console.log(`   Total images: ${allImages.length}`);

    // Process each image
    for (const imageData of allImages) {
      stats.totalImages++;
      const { url: originalUrl, name } = imageData;

      // Encode the URL (handle spaces as %20)
      const encodedUrl = encodeFilename(originalUrl);
      const fullUrl = `${baseUrl}${encodedUrl}`;
      const extension = getExtension(originalUrl);
      const fileName = `${name}.${extension}`;
      const filePath = path.join(folderPath, fileName);

      // Check if file already exists
      if (fs.existsSync(filePath)) {
        const stats_obj = fs.statSync(filePath);
        console.log(
          `  ✓ Skipped: ${fileName} (${(stats_obj.size / 1024).toFixed(1)}KB - already exists)`
        );
        stats.skipped++;
        continue;
      }

      // Download the image
      console.log(`  ⬇️  Downloading: ${fileName}`);
      const result = await downloadImage(fullUrl, filePath);

      if (result.success) {
        const sizeKB = (result.size / 1024).toFixed(1);
        console.log(`  ✅ Downloaded: ${fileName} (${sizeKB}KB)`);
        stats.downloaded++;
      } else {
        const reason = result.reason || 'unknown';
        console.log(`  ❌ Failed: ${fileName} - ${reason}`);
        stats.failed++;
        stats.byReason[reason] = (stats.byReason[reason] || 0) + 1;

        // Clean up failed download
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, () => {});
        }
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Download Summary');
  console.log('='.repeat(60));
  console.log(`Total images found:    ${stats.totalImages}`);
  console.log(`Successfully downloaded: ${stats.downloaded}`);
  console.log(`Skipped (already exist): ${stats.skipped}`);
  console.log(`Failed downloads:      ${stats.failed}`);

  if (Object.keys(stats.byReason).length > 0) {
    console.log('\nFailure reasons:');
    for (const [reason, count] of Object.entries(stats.byReason)) {
      console.log(`  - ${reason}: ${count}`);
    }
  }

  console.log('='.repeat(60));
  console.log('✨ Process complete!\n');

  // List folder contents
  console.log('📁 Folder Structure:');
  for (const [sectionKey, sectionData] of Object.entries(manifest.pages)) {
    const folderPath = path.join(absoluteTargetDir, sectionData.folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      const totalSize = files.reduce((sum, file) => {
        const filePath = path.join(folderPath, file);
        const stats_obj = fs.statSync(filePath);
        return sum + stats_obj.size;
      }, 0);
      console.log(
        `  ${sectionData.folder}/: ${files.length} files (${(totalSize / 1024 / 1024).toFixed(2)}MB)`
      );
    }
  }
  console.log('');
}

// Run main function
main().catch(console.error);
