#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const directories = [
    'SymbiosisResearch',
    'SwarmIntel'
];

const baseFiles = {
    'symbiont-agent.ts': '// Symbiont Agent Logic',
    'swarm-orchestrator.ts': '// Swarm Orchestrator Logic',
    'karpathy-mirror.ts': '// Karpathy Mirror Logic',
    'config.json': JSON.stringify({ /* configuration settings */ }, null, 4),
    'package.json': JSON.stringify({
        name: "swarmintel",
        version: "1.0.0",
        main: "index.js",
        scripts: {
            start: "node index.js"
        },
        dependencies: {
            // Add necessary dependencies
        }
    }, null, 4)
};

// Function to create directories and files
const createStructure = (basePath) => {
    directories.forEach(dir => {
        const dirPath = path.join(basePath, dir);
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
        
        Object.entries(baseFiles).forEach(([fileName, content]) => {
            const filePath = path.join(dirPath, fileName);
            fs.writeFileSync(filePath, content);
            console.log(`Created file: ${filePath}`);
        });
    });
};

// Function to initialize Git repository
const initializeGit = (basePath) => {
    exec('git init', { cwd: basePath }, (err) => {
        if (err) {
            console.error(`Error initializing Git repository: ${err.message}`);
            return;
        }
        console.log('Initialized a new Git repository.');

        exec('git add .', { cwd: basePath }, (err) => {
            if (err) {
                console.error(`Error adding files to Git: ${err.message}`);
                return;
            }
            console.log('Added files to Git.');

            exec('git commit -m "Initial commit with Symbiosis Research and SwarmIntel structure"', { cwd: basePath }, (err) => {
                if (err) {
                    console.error(`Error committing files to Git: ${err.message}`);
                    return;
                }
                console.log('Commited files to Git.');
            });
        });
    });
};

// Main execution
const main = () => {
    const basePath = process.cwd(); // Use the current working directory
    try {
        createStructure(basePath);
        initializeGit(basePath);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

main();
