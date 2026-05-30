import sharp from 'sharp'
import { readdir, rename } from 'fs/promises'
import { join, extname } from 'path'

const imgDir = './src/image'
const files = await readdir(imgDir)

const MAX_WIDTH = 1200

for (const file of files) {
  const ext = extname(file).toLowerCase()
  const input = join(imgDir, file)
  const baseName = file.replace(ext, '')

  if (ext === '.png') {
    // 生成压缩后的 WebP
    const webpOutput = join(imgDir, `${baseName}.webp`)
    await sharp(input)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpOutput)
    console.log(`✅ ${baseName}.webp generated`)

    // 同时优化原始 PNG
    const tmpOutput = join(imgDir, `${baseName}_opt.png`)
    await sharp(input)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(tmpOutput)
    await rename(tmpOutput, input)
    console.log(`✅ ${file} compressed`)
  } else if (ext === '.jpg' || ext === '.jpeg') {
    // 生成 WebP
    const webpOutput = join(imgDir, `${baseName}.webp`)
    await sharp(input)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpOutput)
    console.log(`✅ ${baseName}.webp generated`)

    // 压缩原始 JPG
    const tmpOutput = join(imgDir, `${baseName}_opt.jpg`)
    await sharp(input)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(tmpOutput)
    await rename(tmpOutput, input)
    console.log(`✅ ${file} compressed`)
  }
}

console.log('🎉 All images compressed!')
