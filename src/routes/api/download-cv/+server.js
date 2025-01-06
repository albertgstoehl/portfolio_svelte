import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { error } from '@sveltejs/kit';

const limiter = new RateLimiter({
    IP: [10, 'h'], // Allow up to 10 requests per hour per IP
    IPUA: [5, 'm'], // Allow up to 5 requests per minute per IP and User-Agent
});

// GET /api/download-cv
export async function GET(event) {
    const apiUrl = process.env.CV_LATEX_REPO_URL;
    const repoToken = process.env.CV_LATEX_REPO_TOKEN;

    // Check rate limits
    if (await limiter.isLimited(event)){
        return new Response('Too Many Requests', {
            status: 429,
        });
    }

    try {
        // Fetch the latest release information via token
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${repoToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch release: ${response.statusText}`);
        }

        // Parse the release information and find the right asset via name
        const data = await response.json();
        const releaseAsset = data.assets.find(
            (asset) => asset.name === 'Gstoehl_Albert_CV_redacted.pdf'
        );

        if (!releaseAsset) {
            throw new Error('Asset not found.');
        }

        // Fetch the actual file
        const fileResponse = await fetch(releaseAsset.browser_download_url, {
            headers: {
                'Authorization': `token ${repoToken}`,
            },
        });

        if (!fileResponse.ok) {
            throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
        }

        console.log('Download successful');

        // Stream the file back to the client
        return new Response(fileResponse.body, {
            headers: {
                'Content-Type': fileResponse.headers.get('Content-Type'),
                'Content-Disposition': fileResponse.headers.get('Content-Disposition'),
                'Cache-Control': 'no-store', // Prevent caching
            },
        });
    } catch (error) {
        console.error('Error fetching file:', error);
        return new Response('Error downloading file. Please try again.', {
            status: 500,
        });
    }
}
