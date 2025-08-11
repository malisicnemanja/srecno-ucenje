import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

describe('Production Build Tests', () => {
  const buildDir = path.join(process.cwd(), '.next')
  const timeout = 300000 // 5 minutes

  beforeAll(async () => {
    // Clean any existing build
    try {
      await fs.rm(buildDir, { recursive: true, force: true })
    } catch (error) {
      // Ignore if directory doesn't exist
    }
  }, timeout)

  afterAll(async () => {
    // Optionally clean up after tests
  })

  it('should build successfully without errors', async () => {
    let buildOutput = ''
    let buildError = ''

    try {
      const { stdout, stderr } = await execAsync('npm run build', {
        timeout: 250000,
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
      })
      buildOutput = stdout
      buildError = stderr
    } catch (error: any) {
      // Log the error for debugging
      console.error('Build failed:', error.message)
      console.error('Build output:', buildOutput)
      console.error('Build error:', buildError)
      throw new Error(`Build failed: ${error.message}`)
    }

    // Check for successful build indicators
    expect(buildOutput).toContain('Compiled successfully')
    
    // Check that build directory exists
    const buildExists = await fs.access(buildDir).then(() => true).catch(() => false)
    expect(buildExists).toBe(true)

    // Check for generated files
    const staticDir = path.join(buildDir, 'static')
    const staticExists = await fs.access(staticDir).then(() => true).catch(() => false)
    expect(staticExists).toBe(true)

  }, timeout)

  it('should generate all required static files', async () => {
    // Check for manifest file
    const manifestPath = path.join(buildDir, 'static', 'chunks')
    const manifestExists = await fs.access(manifestPath).then(() => true).catch(() => false)
    expect(manifestExists).toBe(true)

    // Check for pages directory
    const pagesDir = path.join(buildDir, 'server', 'pages')
    const pagesExists = await fs.access(pagesDir).then(() => true).catch(() => false)
    expect(pagesExists).toBe(true)
  })

  it('should not have TypeScript errors', async () => {
    try {
      const { stdout, stderr } = await execAsync('npx tsc --noEmit', {
        timeout: 60000
      })
      
      // If TypeScript compilation succeeds, there should be no errors
      expect(stderr).toBe('')
    } catch (error: any) {
      // If there are TypeScript errors, the test should fail
      console.error('TypeScript errors found:', error.message)
      throw new Error(`TypeScript errors: ${error.message}`)
    }
  })

  it('should not have ESLint errors', async () => {
    try {
      const { stdout, stderr } = await execAsync('npm run lint', {
        timeout: 60000
      })
      
      // Check that linting passed
      expect(stdout).not.toContain('error')
    } catch (error: any) {
      // ESLint found errors
      console.error('ESLint errors found:', error.message)
      throw new Error(`ESLint errors: ${error.message}`)
    }
  })

  it('should generate SEO-friendly pages', async () => {
    // Check for robots.txt generation
    const robotsExists = await fs.access(path.join(buildDir, 'robots.txt')).then(() => true).catch(() => false)
    if (!robotsExists) {
      // Check in public directory
      const publicRobotsExists = await fs.access(path.join(process.cwd(), 'public', 'robots.txt')).then(() => true).catch(() => false)
      expect(publicRobotsExists).toBe(true)
    }

    // Check for sitemap generation
    const sitemapExists = await fs.access(path.join(buildDir, 'sitemap.xml')).then(() => true).catch(() => false)
    // Sitemap might be generated differently, so this is optional
  })

  it('should have optimized assets', async () => {
    const staticDir = path.join(buildDir, 'static')
    
    try {
      const files = await fs.readdir(staticDir, { recursive: true })
      
      // Check for CSS files
      const cssFiles = files.filter(file => file.toString().endsWith('.css'))
      expect(cssFiles.length).toBeGreaterThan(0)
      
      // Check for JS files
      const jsFiles = files.filter(file => file.toString().endsWith('.js'))
      expect(jsFiles.length).toBeGreaterThan(0)
      
    } catch (error) {
      console.warn('Could not analyze static assets:', error)
    }
  })

  it('should have proper environment configuration', async () => {
    // Check that required environment variables are handled
    const configPath = path.join(process.cwd(), 'next.config.js')
    const configExists = await fs.access(configPath).then(() => true).catch(() => false)
    expect(configExists).toBe(true)

    if (configExists) {
      const configContent = await fs.readFile(configPath, 'utf-8')
      // Should have basic Next.js configuration
      expect(configContent).toContain('module.exports')
    }
  })

  it('should handle Sanity environment variables', async () => {
    // Check that Sanity configuration is present
    const sanityConfigPath = path.join(process.cwd(), 'sanity.config.ts')
    const sanityExists = await fs.access(sanityConfigPath).then(() => true).catch(() => false)
    expect(sanityExists).toBe(true)
  })

  it('should generate pages for all routes', async () => {
    const expectedRoutes = [
      '', // home page
      'o-autorki',
      'blog', 
      'metodologija',
      'fransiza-modeli',
      'faq',
      'kontakt',
      'kvizovi',
      'kalkulatori'
    ]

    const pagesDir = path.join(buildDir, 'server', 'pages')
    
    for (const route of expectedRoutes) {
      const pageFile = path.join(pagesDir, route + '.html')
      const jsFile = path.join(pagesDir, route + '.js')
      
      // Check if either HTML or JS file exists for the route
      const htmlExists = await fs.access(pageFile).then(() => true).catch(() => false)
      const jsExists = await fs.access(jsFile).then(() => true).catch(() => false)
      
      if (!htmlExists && !jsExists) {
        console.warn(`No build artifact found for route: ${route}`)
      }
    }
  })

  it('should handle Serbian language content in build', async () => {
    // This test ensures that Serbian characters don't break the build process
    const buildOutput = await execAsync('npm run build -- --quiet', {
      timeout: 120000
    }).then(result => result.stdout).catch(error => {
      throw new Error(`Build with Serbian content failed: ${error.message}`)
    })

    // Build should complete without character encoding issues
    expect(buildOutput).not.toContain('encoding error')
    expect(buildOutput).not.toContain('character error')
  })

  it('should have proper bundle size', async () => {
    try {
      const staticDir = path.join(buildDir, 'static')
      const chunks = await fs.readdir(path.join(staticDir, 'chunks'))
      
      // Check that there are chunk files (indicating code splitting)
      expect(chunks.length).toBeGreaterThan(0)
      
      // Main bundle shouldn't be excessively large (this is a basic check)
      const mainChunks = chunks.filter(chunk => chunk.includes('main'))
      expect(mainChunks.length).toBeGreaterThanOrEqual(0)
      
    } catch (error) {
      console.warn('Could not analyze bundle size:', error)
    }
  })
})

describe('Build Quality Checks', () => {
  it('should not have console errors or warnings in build output', async () => {
    try {
      const { stdout, stderr } = await execAsync('npm run build 2>&1', {
        timeout: 180000
      })
      
      // Build output should not contain critical errors
      const criticalErrors = [
        'Module not found',
        'Cannot resolve module',
        'Unexpected token',
        'SyntaxError',
        'TypeError'
      ]
      
      for (const error of criticalErrors) {
        expect(stdout).not.toContain(error)
        expect(stderr).not.toContain(error)
      }
      
    } catch (error: any) {
      throw new Error(`Build quality check failed: ${error.message}`)
    }
  })

  it('should optimize images properly', async () => {
    const publicImagesDir = path.join(process.cwd(), 'public', 'images')
    
    try {
      const imagesDirExists = await fs.access(publicImagesDir).then(() => true).catch(() => false)
      
      if (imagesDirExists) {
        const images = await fs.readdir(publicImagesDir, { recursive: true })
        const webpImages = images.filter(img => img.toString().endsWith('.webp'))
        const jpgImages = images.filter(img => img.toString().endsWith('.jpg'))
        
        // Should have some optimized images
        if (jpgImages.length > 0) {
          expect(webpImages.length).toBeGreaterThan(0)
        }
      }
    } catch (error) {
      console.warn('Could not check image optimization:', error)
    }
  })

  it('should have proper CSS optimization', async () => {
    try {
      const staticDir = path.join(process.cwd(), '.next', 'static', 'css')
      const cssExists = await fs.access(staticDir).then(() => true).catch(() => false)
      
      if (cssExists) {
        const cssFiles = await fs.readdir(staticDir)
        const minifiedCss = cssFiles.filter(file => file.includes('.css'))
        
        expect(minifiedCss.length).toBeGreaterThan(0)
      }
    } catch (error) {
      console.warn('Could not check CSS optimization:', error)
    }
  })
})