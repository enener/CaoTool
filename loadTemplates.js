document.addEventListener('DOMContentLoaded', function() {
    // 加载页眉模板
    const basePath = window.location.pathname.split('/').slice(0, -2).join('/') + '/';
fetch(`${basePath}header.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
            // 激活导航栏的折叠功能
            new bootstrap.Collapse(document.getElementById('navbarNav'), {toggle: false});
        })
        .catch(error => console.error('页眉加载失败:', error));

    // 加载页脚模板
    fetch(`${basePath}footer.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(error => console.error('页脚加载失败:', error));
});