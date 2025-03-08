// utility script to prepare docs markdown for publishing
import * as fs from 'fs'
import * as path from 'path'

function processMarkdownFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directory}:`, err);
            return;
        }
        let indexTitle = directory.split("/")[2]
        let indexFileContent

        if (indexTitle) {
            indexFileContent = `---\ntitle: "${String(indexTitle[0]).toUpperCase() + String(indexTitle).slice(1)}"\n---\n`
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);
            
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error getting stats for file ${filePath}:`, err);
                    return;
                }
                
                if (stats.isDirectory()) {
                    processMarkdownFiles(filePath); // Recurse into subdirectory
                } else if (path.extname(file) === '.md' && file !== "README.md") {
                    removeFirstLine(filePath);
                    let fileLink = "- [" + file.replace(".md", "") + "](/" + filePath.replace(".md", "").toLowerCase() + ")\n"
                    indexFileContent += fileLink
                    fs.writeFile(path.join(directory, "_index.md"), indexFileContent, (err) => {
                        if (err) {
                          console.error('An error occurred:', err);
                        } else {
                          console.log('File created successfully!');
                        }
                    });
                }
            });
        });
    });
}

function removeFirstLine(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return;
        }
        
        const lines = data.split('\n');
        if (lines.length > 1) {
            let newData;

            lines.slice(1).forEach((l) => {
                while (l.search(/([^/]+)\.md.{1}/) !== -1) {
                    l = l.replace(/([^/]+)\.md.{1}/, (match) => {
                        return match.toLowerCase().replace(".md", "")
                    })
                }
                newData += l + "\n"
            });

            fs.writeFile(filePath, newData, 'utf8', err => {
                if (err) {
                    console.error(`Error writing file ${filePath}:`, err);
                } else {
                    console.log(`Processed: ${filePath}`);
                }
            });
        }
    });
}

processMarkdownFiles("docs/api/")