function processText() {
    const input = document.getElementById('inputText').value;
    const output = input.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    document.getElementById('outputResult').textContent = output;
}

function copyResult() {
    const output = document.getElementById('outputResult');
    navigator.clipboard.writeText(output.textContent)
        .then(() => alert('复制成功!'))
        .catch(err => console.error('复制失败:', err));
}