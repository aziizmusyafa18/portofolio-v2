const username = 'aziizmusyafa18';
const apiBase = 'https://api.github.com';
const token = process.env.GITHUB_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

if (!geminiKey) {
    throw new Error('GEMINI_API_KEY belum diset pada GitHub Actions secrets.');
}

const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portofolio-v2-ai-sync',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
};

async function github(path) {
    const response = await fetch(`${apiBase}${path}`, { headers });
    if (!response.ok) throw new Error(`GitHub API ${response.status}: ${path}`);
    return response.json();
}

function isUsefulFile(path) {
    return /\.(php|js|jsx|ts|tsx|vue|html|css|sql|md|json|py|java|go|rb)$/i.test(path)
        && !/(node_modules|vendor|dist|build|storage|coverage|public\/uploads|\.min\.)/i.test(path);
}

async function readRepositoryContext(repository) {
    const tree = await github(`/repos/${repository.full_name}/git/trees/${repository.default_branch}?recursive=1`);
    const files = tree.tree
        .filter(item => item.type === 'blob' && isUsefulFile(item.path) && item.size < 12000)
        .sort((a, b) => {
            const priority = file => /^(README|package\.json|composer\.json|routes|src|app|resources)/i.test(file.path) ? 0 : 1;
            return priority(a) - priority(b);
        })
        .slice(0, 18);

    const contents = await Promise.all(files.map(async file => {
        try {
            const blob = await github(`/repos/${repository.full_name}/contents/${file.path}?ref=${repository.default_branch}`);
            const code = Buffer.from(blob.content, 'base64').toString('utf8').slice(0, 5000);
            return `--- ${file.path} ---\n${code}`;
        } catch (error) {
            console.warn(`Tidak dapat membaca ${repository.full_name}/${file.path}: ${error.message}`);
            return '';
        }
    }));

    return contents.filter(Boolean).join('\n\n').slice(0, 60000);
}

async function generateDescription(repository, context) {
    const prompt = [
        'Kamu adalah technical writer untuk website portofolio developer.',
        'Analisis metadata dan potongan kode project berikut.',
        'Tulis deskripsi project dalam Bahasa Indonesia, 2-3 kalimat, profesional dan faktual.',
        'Jelaskan tujuan project, fitur yang benar-benar terlihat dari kode, dan teknologi utama.',
        'Jangan mengarang fitur yang tidak ada. Jangan gunakan markdown, emoji, atau awalan seperti "Project ini".',
        `Nama: ${repository.name}`,
        `Deskripsi GitHub: ${repository.description || '(tidak ada)'}`,
        `Bahasa: ${repository.language || '(tidak terdeteksi)'}`,
        `Kode:\n${context}`
    ].join('\n\n');

    for (let attempt = 1; attempt <= 3; attempt += 1) {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.2, maxOutputTokens: 220 }
                })
            }
        );
        if (response.ok) {
            const result = await response.json();
            const description = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (description) return description;
            throw new Error(`Gemini tidak mengembalikan teks untuk ${repository.full_name}`);
        }
        if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 3) {
            throw new Error(`Gemini API ${response.status} untuk ${repository.full_name}`);
        }
        await new Promise(resolve => setTimeout(resolve, attempt * 3000));
    }
}

const repositories = (await github(`/users/${username}/repos?per_page=100&sort=updated&direction=desc`))
    .filter(repository => !repository.private);
const output = {};

for (const repository of repositories) {
    try {
        const context = await readRepositoryContext(repository);
        output[repository.full_name] = {
            description: await generateDescription(repository, context),
            aiGenerated: true
        };
        console.error(`Generated: ${repository.full_name}`);
    } catch (error) {
        console.warn(`Fallback ${repository.full_name}: ${error.message}`);
        output[repository.full_name] = {
            description: repository.description || 'Project dan eksperimen pengembangan web.',
            aiGenerated: false
        };
    }
}

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
