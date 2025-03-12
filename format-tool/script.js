function formatText() {
    const input = document.getElementById('inputText').value;
    
    // 替换非字母数字字符为短横线
    let formatted = input.replace(/[^a-zA-Z0-9]/g, '-');
    
    // 合并连续短横线
    formatted = formatted.replace(/-+/g, '-');
    
    // 去除末尾短横线
    formatted = formatted.replace(/-+$/g, '');
    
    document.getElementById('outputResult').textContent = formatted;
}

function copyResult() {
    try {
        const resultText = document.getElementById('outputResult').textContent;
        navigator.clipboard.writeText(resultText);
        alert('已成功复制到剪贴板！');
    } catch (error) {
        alert('复制失败，请手动选择文本进行复制');
    }
}