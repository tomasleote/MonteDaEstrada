const https = require('https');
https.get('https://www.montedopapaleguas.pt/redondezas', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
        const idx = data.indexOf('Parceiros');
        if (idx !== -1) {
            const parceirosHtml = data.slice(idx, idx + 10000);
            const regex = /href="([^"]+)"[^>]*>.*?<img[^>]+src="([^"]+)"/g;
            let match;
            while ((match = regex.exec(parceirosHtml)) !== null) {
                console.log(`URL: ${match[1]}`);
            }
        } else {
            console.log("Parceiros not found");
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
