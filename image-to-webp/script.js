let originalImage = null;
let webpBlob = null;
let originalFileName = '';

// 监听文件上传
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    originalFileName = file.name.split('.')[0];
    
    // 显示原始图片大小
    const originalSizeKB = (file.size / 1024).toFixed(2);
    document.getElementById('originalSize').textContent = `大小：${originalSizeKB} KB`;
    
    // 预览原始图片
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            originalImage = img;
            document.getElementById('originalPreview').src = event.target.result;
            document.getElementById('convertBtn').disabled = false;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// 监听质量滑块变化
document.getElementById('qualityRange').addEventListener('input', function(e) {
    const quality = e.target.value;
    document.getElementById('qualityValue').textContent = quality + '%';
    
    // 如果已经转换过，则实时更新
    if (originalImage && document.getElementById('webpPreview').src) {
        convertToWebP();
    }
});

// 转换为WebP
function convertToWebP() {
    if (!originalImage) return;
    
    const quality = parseInt(document.getElementById('qualityRange').value) / 100;
    
    // 创建一个canvas元素
    const canvas = document.createElement('canvas');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    
    // 在canvas上绘制图片
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0);
    
    // 转换为WebP格式
    canvas.toBlob(function(blob) {
        if (!blob) {
            alert('转换失败，您的浏览器可能不支持WebP格式');
            return;
        }
        
        webpBlob = blob;
        
        // 显示WebP图片大小
        const webpSizeKB = (blob.size / 1024).toFixed(2);
        document.getElementById('webpSize').textContent = `大小：${webpSizeKB} KB`;
        
        // 计算压缩比例
        const originalSize = parseFloat(document.getElementById('originalSize').textContent.replace('大小：', '').replace(' KB', ''));
        const compressionRatio = ((1 - (blob.size / 1024) / originalSize) * 100).toFixed(2);
        document.getElementById('webpSize').textContent = `大小：${webpSizeKB} KB (节省了 ${compressionRatio}%)`;
        
        // 预览WebP图片
        const webpUrl = URL.createObjectURL(blob);
        document.getElementById('webpPreview').src = webpUrl;
        document.getElementById('downloadBtn').disabled = false;
    }, 'image/webp', quality);
}

// 下载WebP图片
function downloadWebP() {
    if (!webpBlob) return;
    
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(webpBlob);
    downloadLink.download = `${originalFileName}.webp`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}