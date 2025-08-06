const fs = require('fs')
const path = require('path')

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
}

const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'build', 'dist', 'public']
const FILE_EXTENSIONS = ['.js', '.jsx', '.tsx', '.ts']

let totalFiles = 0
let filesWithIssues = 0
let totalIssues = 0
const issueDetails = []

// Patterns to check for potential null href issues
const problematicPatterns = [
  {
    pattern: /href=\{([^}]+)\}/g,
    name: 'Dynamic href',
    checkForSafety: (match) => {
      // Check if it has fallback
      return match.includes('||') || match.includes('??') || match.includes('SafeLink')
    }
  },
  {
    pattern: /<Link\s+href=\{([^}]+)\}/g,
    name: 'Link component href',
    checkForSafety: (match) => {
      return match.includes('||') || match.includes('??')
    }
  },
  {
    pattern: /href=\{`[^`]*\$\{([^}]+)\}[^`]*`\}/g,
    name: 'Template literal href',
    checkForSafety: (match) => {
      return match.includes('||') || match.includes('??')
    }
  }
]

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const issues = []
  
  // Skip if file uses SafeLink
  const usesSafeLink = content.includes('SafeLink')
  
  problematicPatterns.forEach(({ pattern, name, checkForSafety }) => {
    const matches = content.matchAll(pattern)
    
    for (const match of matches) {
      const fullMatch = match[0]
      const lineNumber = content.substring(0, match.index).split('\n').length
      
      // Skip if using SafeLink
      if (usesSafeLink && fullMatch.includes('SafeLink')) {
        continue
      }
      
      // Check if it has safety measures
      if (!checkForSafety(fullMatch)) {
        issues.push({
          type: name,
          match: fullMatch.substring(0, 100), // Truncate long matches
          line: lineNumber
        })
      }
    }
  })
  
  // Check for direct null/undefined assignments
  const directNullPattern = /href=\{(null|undefined)\}/g
  const nullMatches = content.matchAll(directNullPattern)
  
  for (const match of nullMatches) {
    const lineNumber = content.substring(0, match.index).split('\n').length
    issues.push({
      type: 'Direct null/undefined',
      match: match[0],
      line: lineNumber,
      critical: true
    })
  }
  
  return issues
}

function walkDir(dir) {
  try {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      
      try {
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          if (!EXCLUDE_DIRS.includes(file)) {
            walkDir(filePath)
          }
        } else if (FILE_EXTENSIONS.includes(path.extname(file))) {
          totalFiles++
          const issues = checkFile(filePath)
          
          if (issues.length > 0) {
            filesWithIssues++
            totalIssues += issues.length
            issueDetails.push({
              file: path.relative(process.cwd(), filePath),
              issues
            })
          }
        }
      } catch (err) {
        console.warn(`${colors.yellow}⚠️ Could not process ${filePath}: ${err.message}${colors.reset}`)
      }
    })
  } catch (err) {
    console.warn(`${colors.yellow}⚠️ Could not read directory ${dir}: ${err.message}${colors.reset}`)
  }
}

console.log(`${colors.cyan}🔍 Testing all Link components for potential href=null issues...${colors.reset}`)
console.log(`${colors.gray}Working directory: ${process.cwd()}${colors.reset}\n`)

// Walk through app and components directories
const dirsToProcess = ['app', 'components']

dirsToProcess.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir)
  if (fs.existsSync(fullPath)) {
    console.log(`${colors.blue}📂 Checking ${dir}...${colors.reset}`)
    walkDir(fullPath)
  }
})

console.log('\n' + '='.repeat(60))

// Generate report
if (totalIssues === 0) {
  console.log(`${colors.green}✅ SUCCESS! No potential Link href issues found!${colors.reset}`)
  console.log(`${colors.gray}Checked ${totalFiles} files${colors.reset}`)
} else {
  console.log(`${colors.red}⚠️ FOUND ${totalIssues} POTENTIAL ISSUES in ${filesWithIssues} files${colors.reset}`)
  console.log(`${colors.gray}Total files checked: ${totalFiles}${colors.reset}\n`)
  
  // Show detailed issues
  console.log(`${colors.yellow}📋 Detailed Issues:${colors.reset}`)
  
  issueDetails.forEach(({ file, issues }) => {
    console.log(`\n${colors.cyan}${file}:${colors.reset}`)
    issues.forEach(issue => {
      const icon = issue.critical ? '🔴' : '⚠️'
      console.log(`  ${icon} Line ${issue.line}: ${issue.type}`)
      console.log(`     ${colors.gray}${issue.match}${colors.reset}`)
    })
  })
  
  console.log(`\n${colors.yellow}💡 Recommendations:${colors.reset}`)
  console.log('1. All dynamic hrefs should have fallbacks: href={value || "/"}')
  console.log('2. Consider using SafeLink component instead of Link')
  console.log('3. Validate CMS data before using in links')
}

// Check if SafeLink is being used
const safeLinkPath = path.join(process.cwd(), 'components/common/SafeLink.tsx')
if (fs.existsSync(safeLinkPath)) {
  console.log(`\n${colors.green}✅ SafeLink component found${colors.reset}`)
} else {
  console.log(`\n${colors.red}❌ SafeLink component not found${colors.reset}`)
  console.log('Consider creating a SafeLink component for better error handling')
}

// Exit with error code if issues found
if (totalIssues > 0) {
  process.exit(1)
}