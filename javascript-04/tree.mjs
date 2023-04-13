
import { readdir, lstat } from 'node:fs/promises';
import { join } from 'node:path';

async function getTree(path) {
    const items = await readdir(path);

    let files = [];
    let dirs = [];

    for (let item of items) {
        const fullPath = join(path, item);
        const isDir = (await lstat(fullPath)).isDirectory();

        if (isDir) {
            const itemTree = await getTree(fullPath);

            dirs = [...dirs, fullPath, ...itemTree.dirs];
            files = [...files, ...itemTree.files];

            continue;
        }
        
        files = [...files, fullPath];
    }

    return { files, dirs };
}

const targetDir = process.argv[2];

console.log(`Scan ${targetDir} directory...`);

const result = await getTree(targetDir);

console.log('Done:', result);