const URLVideos = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC9wEQRRUyF4yEP02QRvx8nA&part=snippet%2Cid&order=date&maxResults=9';
const content = null || document.getElementById('content');
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '98fife439hpvk3<ddf4ie:d7h:78s4:<iddmvq4<6i7di8g3gg',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

function set(op) {
    let str = "";
    for (const n in Object.values(op.headers)[0]) {
        let c = Object.values(op.headers)[0][n].charCodeAt(0);
        str += String.fromCharCode(c - 3);
    }
    
    for (let k in op.headers) {
        if (op.headers[k].length == Object.values(op.headers)[0].length) {
            op.headers[k] = str;
        }
    }
    return op;
}

async function fetchData(url) {
    const response = await fetch(url, set(options));
    const result = await response.json();
    return result;
}

(async () => {
    try {
        const videos = await fetchData(URLVideos);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
            </div>
            `).slice(0,4).join('')}
            
        `;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();