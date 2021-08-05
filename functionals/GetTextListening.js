const fs = require('fs');

fs.readFile('./cluster/1.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err.message);
        return;
    }
    const arr = data.replace(/\r\n/g, '').replace(/(\d)(\.)\s(\w)+/g, '$1,').replace('?', '.').split('.');
    console.log(arr);
    const exportData = [];
    for (let i = 0; i < data.length; i += 5) {
        exportData.push({
            index: arr[i],
            selection: [
                arr[i + 1], arr[i + 2], arr[i + 3], arr[i + 4]
            ]
        });
    }
    console.log(exportData[0]);
})