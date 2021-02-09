import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const readmeDir = path.join(process.cwd());

const getAboutData = async () => {
    const fullPath = path.join(readmeDir, `README.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    return processedContent.toString();
};

export default getAboutData;
