#!/usr/bin/env node

/**
 * CRM IQ Style Validation Script
 * Checks HTML and CSS files for compliance with styling rules
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob'); // npm install glob

class StyleValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.rules = {
            // Patterns that should not exist
            forbidden: [
                {
                    pattern: /style="[^"]*color:[^"]*"/gi,
                    message: 'Inline color styles are not allowed. Use CSS classes instead.',
                    severity: 'error'
                },
                {
                    pattern: /rgba\(0,0,0,0\.6\)/gi,
                    message: 'Use var(--text-muted-color) or .text-muted class instead of hardcoded rgba(0,0,0,0.6)',
                    severity: 'error'
                },
                {
                    pattern: /btn btn-sm text-sm px-3 py-1\.5 bg-gray-100 hover:bg-gray-200 text-gray-700/gi,
                    message: 'Use .btn .btn-light instead of complex utility classes',
                    severity: 'warning'
                }
            ],
            // Patterns that suggest better alternatives
            suggestions: [
                {
                    pattern: /text-gray-[56]00/gi,
                    message: 'Consider using .text-muted for secondary text',
                    severity: 'warning'
                },
                {
                    pattern: /text-gray-900/gi,
                    message: 'text-gray-900 may be unnecessary - default color might suffice',
                    severity: 'info'
                }
            ]
        };
    }

    validateFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
            this.checkLine(line, index + 1, filePath);
        });
    }

    checkLine(line, lineNumber, filePath) {
        // Check forbidden patterns
        this.rules.forbidden.forEach(rule => {
            const matches = line.match(rule.pattern);
            if (matches) {
                this.addIssue(rule.severity, {
                    file: filePath,
                    line: lineNumber,
                    message: rule.message,
                    matched: matches[0]
                });
            }
        });

        // Check suggestion patterns
        this.rules.suggestions.forEach(rule => {
            const matches = line.match(rule.pattern);
            if (matches) {
                this.addIssue(rule.severity, {
                    file: filePath,
                    line: lineNumber,
                    message: rule.message,
                    matched: matches[0]
                });
            }
        });
    }

    addIssue(severity, issue) {
        const issueObj = {
            ...issue,
            severity
        };

        switch (severity) {
            case 'error':
                this.errors.push(issueObj);
                break;
            case 'warning':
                this.warnings.push(issueObj);
                break;
            default:
                this.warnings.push(issueObj);
        }
    }

    validateDirectory(directory) {
        console.log(`🔍 Validating styles in: ${directory}`);
        
        // Find HTML files
        const htmlFiles = glob.sync('**/*.html', { cwd: directory });
        htmlFiles.forEach(file => {
            const fullPath = path.join(directory, file);
            this.validateFile(fullPath);
        });

        // Find CSS files  
        const cssFiles = glob.sync('**/*.css', { cwd: directory });
        cssFiles.forEach(file => {
            const fullPath = path.join(directory, file);
            this.validateFile(fullPath);
        });
    }

    generateReport() {
        console.log('\n📊 Style Validation Report');
        console.log('='.repeat(50));

        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('✅ No style violations found!');
            return true;
        }

        // Report errors
        if (this.errors.length > 0) {
            console.log(`\n❌ Errors (${this.errors.length}):`);
            this.errors.forEach(error => {
                console.log(`  ${error.file}:${error.line}`);
                console.log(`    ${error.message}`);
                console.log(`    Found: "${error.matched}"`);
                console.log('');
            });
        }

        // Report warnings
        if (this.warnings.length > 0) {
            console.log(`\n⚠️  Warnings (${this.warnings.length}):`);
            this.warnings.forEach(warning => {
                console.log(`  ${warning.file}:${warning.line}`);
                console.log(`    ${warning.message}`);
                console.log(`    Found: "${warning.matched}"`);
                console.log('');
            });
        }

        // Summary
        console.log(`\n📈 Summary:`);
        console.log(`   Errors: ${this.errors.length}`);
        console.log(`   Warnings: ${this.warnings.length}`);
        
        return this.errors.length === 0;
    }

    // Generate auto-fix suggestions
    generateFixes() {
        console.log('\n🔧 Auto-fix suggestions:');
        console.log('='.repeat(30));

        const fixes = new Map();
        
        [...this.errors, ...this.warnings].forEach(issue => {
            const file = issue.file;
            if (!fixes.has(file)) {
                fixes.set(file, []);
            }
            
            let suggestion = '';
            if (issue.matched.includes('style="')) {
                suggestion = 'Replace with appropriate CSS class (e.g., class="text-muted")';
            } else if (issue.matched.includes('text-gray-')) {
                suggestion = 'Replace with class="text-muted"';
            } else if (issue.matched.includes('rgba(0,0,0,0.6)')) {
                suggestion = 'Replace with var(--text-muted-color)';
            }
            
            fixes.get(file).push({
                line: issue.line,
                from: issue.matched,
                to: suggestion
            });
        });

        fixes.forEach((fileIssues, file) => {
            console.log(`\n📄 ${file}:`);
            fileIssues.forEach(fix => {
                console.log(`  Line ${fix.line}: ${fix.from} → ${fix.to}`);
            });
        });
    }
}

// CLI Usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const directory = args[0] || '.';
    
    const validator = new StyleValidator();
    validator.validateDirectory(directory);
    const success = validator.generateReport();
    
    if (args.includes('--fix-suggestions')) {
        validator.generateFixes();
    }
    
    process.exit(success ? 0 : 1);
}

module.exports = StyleValidator;
