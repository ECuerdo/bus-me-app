/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

walkDir('src/modules/admin', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace rounded-[2.5rem] border border-border bg-card
    content = content.replace(/rounded-\[2\.5rem\] border border-border(?:\/50)? bg-card shadow-sm/g, 'rounded-2xl border border-primary/5 bg-card shadow-md');
    
    // Replace rounded-[2rem] border border-border bg-card
    content = content.replace(/rounded-\[2rem\] bg-card border border-border(?:\/50)? shadow-sm/g, 'rounded-2xl bg-card border border-primary/5 shadow-md');
    
    content = content.replace(/rounded-\[2\.5rem\] bg-card border border-border(?:\/50)? shadow-sm/g, 'rounded-2xl bg-card border border-primary/5 shadow-md');
    content = content.replace(/rounded-\[2rem\] border border-border(?:\/50)? bg-card shadow-sm/g, 'rounded-2xl border border-primary/5 bg-card shadow-md');
    
    // Fallback for just rounded-[2.5rem]
    content = content.replace(/rounded-\[2\.5rem\]/g, 'rounded-2xl');
    
    // Fallback for border-border on pure wrappers
    content = content.replace(/border-border/g, 'border-primary/5 text-card-foreground');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated: ' + filePath);
    }
  }
});
