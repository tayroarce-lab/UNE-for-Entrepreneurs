const fs = require('fs');

let index = fs.readFileSync('src/index.css', 'utf8');

const extractBlock = (startMarker, endMarker) => {
    const start = index.indexOf(startMarker);
    const end = endMarker ? index.indexOf(endMarker, start) : index.length;
    if (start === -1) return '';
    const block = index.substring(start, end);
    index = index.substring(0, start) + (endMarker ? index.substring(end) : '');
    return block;
};

const navbar1 = extractBlock('/* ============================================================\r\n   NAVBAR', '/* ============================================================\r\n   HERO SECTION');
if (!navbar1) {
    console.log("Fallback search for Navbar block (LF instead of CRLF)");
}
const nav1 = navbar1 || extractBlock('/* ============================================================\n   NAVBAR', '/* ============================================================\n   HERO SECTION');
const home = extractBlock('/* ============================================================\n   HERO SECTION', '/* ============================================================\n   FOOTER') || extractBlock('/* ============================================================\r\n   HERO SECTION', '/* ============================================================\r\n   FOOTER');
const footer = extractBlock('/* ============================================================\n   FOOTER', '/* ============================================================\n   LOGIN PAGE') || extractBlock('/* ============================================================\r\n   FOOTER', '/* ============================================================\r\n   LOGIN PAGE');
const auth = extractBlock('/* ============================================================\n   LOGIN PAGE', '/* ============================================================\n   NAVBAR PROFILE') || extractBlock('/* ============================================================\r\n   LOGIN PAGE', '/* ============================================================\r\n   NAVBAR PROFILE');
const nav2 = extractBlock('/* ============================================================\n   NAVBAR PROFILE', '/* ============================================================\n   RESPONSIVE') || extractBlock('/* ============================================================\r\n   NAVBAR PROFILE', '/* ============================================================\r\n   RESPONSIVE');

fs.writeFileSync('src/styles/Navbar.css', nav1 + '\n' + nav2);
fs.writeFileSync('src/styles/Home.css', home);
fs.writeFileSync('src/styles/Footer.css', footer);
fs.writeFileSync('src/styles/Auth.css', auth);

const imports = `@import './styles/Navbar.css';\n@import './styles/Home.css';\n@import './styles/Footer.css';\n@import './styles/Auth.css';\n`;

// Insert after the very first @import in index.css
const firstImportEnd = index.indexOf(';');
if (firstImportEnd !== -1) {
    index = index.substring(0, firstImportEnd + 1) + '\n\n' + imports + index.substring(firstImportEnd + 1);
} else {
    index = imports + '\n' + index;
}

fs.writeFileSync('src/index.css', index);
console.log('Modularization done.');
