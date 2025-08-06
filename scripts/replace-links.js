const fs = require('fs')
const path = require('path')

const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'build', 'dist', 'public', 'scripts']
const FILE_EXTENSIONS = ['.js', '.jsx', '.tsx', '.ts']
const SAFE_LINK_PATH = '@/components/common/SafeLink'

let totalFixed = 0
let filesModified = []

function shouldSkipFile(filePath) {
  // Skip SafeLink component itself
  if (filePath.includes('SafeLink')) return true
  // Skip test files
  if (filePath.includes('.test.') || filePath.includes('.spec.')) return true
  // Skip config files
  if (filePath.includes('next.config') || filePath.includes('tailwind.config')) return true
  
  return false
}

function replaceInFile(filePath) {
  if (shouldSkipFile(filePath)) return false
  
  let content = fs.readFileSync(filePath, 'utf8')
  let originalContent = content
  let modified = false
  
  // Pattern 1: Add SafeLink import if file uses Link from next/link
  if (content.includes("from 'next/link'") || content.includes('from "next/link"')) {
    // Check if SafeLink is already imported
    if (!content.includes('SafeLink')) {
      // Add SafeLink import at the top
      const importRegex = /(import.*from ['"]next\/link['"];?)/
      content = content.replace(importRegex, `$1\nimport SafeLink from '${SAFE_LINK_PATH}'`)
      
      // Replace <Link with <SafeLink
      content = content.replace(/<Link\s/g, '<SafeLink ')
      content = content.replace(/<\/Link>/g, '</SafeLink>')
      
      modified = true
    }
  }
  
  // Pattern 2: Fix common href patterns
  const patterns = [
    // href={variable} without fallback
    {
      pattern: /href=\{([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)\}/g,
      replace: (match, variable) => {
        // Skip if already has || operator
        if (content.includes(`href={${variable} ||`)) return match
        return `href={${variable} || '/'}`
      }
    },
    // href={`...${var}`} without fallback
    {
      pattern: /href=\{`([^$]*?)\$\{([^}]+?)\}([^`]*?)`\}/g,
      replace: (match, before, variable, after) => {
        // Skip if already has || operator
        if (variable.includes('||')) return match
        return `href={\`${before}\${${variable} || ''}\${after}\`}`
      }
    },
    // href={item.href} pattern
    {
      pattern: /href=\{([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+)\}/g,
      replace: (match, path) => {
        // Skip if already has || operator
        if (content.includes(`href={${path} ||`)) return match
        // Common patterns that need fallback
        if (path.includes('.href') || path.includes('.url') || path.includes('.link')) {
          return `href={${path} || '#'}`
        }
        return match
      }
    }
  ]
  
  patterns.forEach(({ pattern, replace }) => {
    const newContent = content.replace(pattern, replace)
    if (newContent !== content) {
      content = newContent
      modified = true
    }
  })
  
  // Pattern 3: Fix Navigation specific patterns
  if (filePath.includes('Header') || filePath.includes('Navigation') || filePath.includes('Nav')) {
    // Fix subItem.href patterns
    content = content.replace(/href=\{subItem\.href\}/g, "href={subItem.href || '#'}")
    content = content.replace(/href=\{item\.href\}/g, "href={item.href || '#'}")
    
    if (content !== originalContent) {
      modified = true
    }
  }
  
  // Pattern 4: Fix Footer specific patterns
  if (filePath.includes('Footer')) {
    content = content.replace(/href=\{link\.link\}/g, "href={link.link || '#'}")
    content = content.replace(/href=\{link\.href\}/g, "href={link.href || '#'}")
    content = content.replace(/href=\{link\.url\}/g, "href={link.url || '#'}")
    
    if (content !== originalContent) {
      modified = true
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content)
    console.log('✅ Fixed:', path.relative(process.cwd(), filePath))
    filesModified.push(filePath)
    totalFixed++
    return true
  }
  
  return false
}

function walkDir(dir) {
  let filesFixed = 0
  
  try {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      
      try {
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          if (!EXCLUDE_DIRS.includes(file)) {
            filesFixed += walkDir(filePath)
          }
        } else if (FILE_EXTENSIONS.includes(path.extname(file))) {
          if (replaceInFile(filePath)) {
            filesFixed++
          }
        }
      } catch (err) {
        console.warn(`⚠️ Could not process ${filePath}:`, err.message)
      }
    })
  } catch (err) {
    console.warn(`⚠️ Could not read directory ${dir}:`, err.message)
  }
  
  return filesFixed
}

console.log('🔄 Starting Link replacement...')
console.log('📁 Working directory:', process.cwd())

// Walk through app and components directories
const dirsToProcess = ['app', 'components']

dirsToProcess.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir)
  if (fs.existsSync(fullPath)) {
    console.log(`\n📂 Processing ${dir}...`)
    walkDir(fullPath)
  }
})

console.log('\n' + '='.repeat(50))
console.log(`✅ Complete! Fixed ${totalFixed} files`)

if (filesModified.length > 0) {
  console.log('\n📝 Modified files:')
  filesModified.forEach(file => {
    console.log('  -', path.relative(process.cwd(), file))
  })
}

console.log('\n💡 Next steps:')
console.log('1. Run: npm run dev')
console.log('2. Check browser console for any remaining Link errors')
console.log('3. If errors persist, check the ErrorTracker output')