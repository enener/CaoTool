function convertJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const data = JSON.parse(jsonInput);
        const formattedText = formatData(data);
        document.getElementById('txtOutput').textContent = formattedText;
    } catch (error) {
        alert('JSON格式错误: ' + error.message);
    }
}

function formatData(data, indent = 0) {
    if (typeof data !== 'object' || data === null) return `${data}`;
    
    return Object.entries(data).map(([key, value]) => {
        const padding = ' '.repeat(indent * 4);
        if (typeof value === 'object' && value !== null) {
            return `${padding}${key}:\n${formatData(value, indent + 1)}`;
        }
        return `${padding}${key}: ${value}`;
    }).join('\n');
}

function copyResult() {
    const output = document.getElementById('txtOutput');
    navigator.clipboard.writeText(output.textContent)
        .then(() => alert('已复制到剪贴板'))
        .catch(err => alert('复制失败: ' + err));
}