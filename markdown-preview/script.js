function initializePreview() {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    
    // 配置marked
    marked.setOptions({
        highlight: function(code, lang) {
            return hljs.highlightAuto(code).value;
        },
        breaks: true
    });

    // 实时预览
    editor.addEventListener('input', () => {
        preview.innerHTML = marked.parse(editor.value);
        editor.style.height = 'auto';
        editor.style.height = editor.scrollHeight + 'px';
    });

    // 文件加载
    document.getElementById('fileInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            editor.value = reader.result;
            preview.innerHTML = marked.parse(editor.value);
            editor.style.height = 'auto';
            editor.style.height = editor.scrollHeight + 'px';
        };
        reader.readAsText(file);
    });
}

function saveFile() {
    const text = document.getElementById('editor').value;
    const blob = new Blob([text], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `markdown-${new Date().toISOString().slice(0,10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
}

// 初始化
window.addEventListener('DOMContentLoaded', initializePreview);