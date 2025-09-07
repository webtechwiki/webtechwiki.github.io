function searchSites () {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        const links = category.querySelectorAll('.link-item');
        let hasVisibleLinks = false;

        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(query)) {
                link.style.display = 'block';
                hasVisibleLinks = true;
            } else {
                link.style.display = query === '' ? 'block' : 'none';
                if (query === '') hasVisibleLinks = true;
            }
        });

        category.style.display = hasVisibleLinks ? 'block' : 'none';
    });
}

function filterCategory (category) {
    const categories = document.querySelectorAll('.category');
    const tabs = document.querySelectorAll('.filter-tab');

    // 更新选中状态
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // 显示/隐藏分类
    categories.forEach(cat => {
        if (category === 'all' || cat.dataset.category === category) {
            cat.style.display = 'block';
        } else {
            cat.style.display = 'none';
        }
    });
}

// 搜索框实时搜索
document.getElementById('searchInput').addEventListener('input', searchSites);

// 添加一些交互动画
document.addEventListener('DOMContentLoaded', function () {
    const categories = document.querySelectorAll('.category');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    categories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'all 0.6s ease';
        observer.observe(category);
    });
});