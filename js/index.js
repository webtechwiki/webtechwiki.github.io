
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

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    const searchInput = document.getElementById('searchInput');
    
    // Ctrl+K 或 Cmd+K 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // ESC 键清除搜索
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchSites();
        searchInput.blur();
    }
});

// 添加分类计数功能
function updateCategoryCounts() {
    const categories = document.querySelectorAll('.category');
    const totalLinks = Array.from(categories).reduce((total, category) => {
        return total + category.querySelectorAll('.link-item').length;
    }, 0);
    
    // 更新统计数字
    const statNumber = document.querySelector('.stat-number');
    if (statNumber) {
        statNumber.textContent = totalLinks + '+';
    }
}

// 页面加载完成后更新计数和初始化扩展按钮
document.addEventListener('DOMContentLoaded', function() {
    updateCategoryCounts();
    initExpandButtons();
});

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

// 初始化扩展按钮
function initExpandButtons() {
    const categories = document.querySelectorAll('.category');
    
    categories.forEach(category => {
        const links = category.querySelector('.links');
        const linkItems = links.querySelectorAll('.link-item');
        
        // 如果链接数量超过阈值，添加扩展按钮
        if (linkItems.length > 8) {
            const expandBtn = document.createElement('button');
            expandBtn.className = 'expand-btn';
            expandBtn.textContent = `展开全部 (${linkItems.length})`;
            expandBtn.onclick = function() {
                toggleExpand(category, expandBtn);
            };
            
            const footer = document.createElement('div');
            footer.className = 'category-footer';
            footer.appendChild(expandBtn);
            
            category.appendChild(footer);
        }
    });
}

// 切换扩展/折叠状态
function toggleExpand(category, button) {
    const links = category.querySelector('.links');
    const isExpanded = links.classList.contains('expanded');
    
    if (isExpanded) {
        links.classList.remove('expanded');
        button.textContent = `展开全部 (${links.querySelectorAll('.link-item').length})`;
        button.classList.remove('collapse');
        
        // 平滑滚动到分类顶部
        category.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        links.classList.add('expanded');
        button.textContent = '收起';
        button.classList.add('collapse');
    }
}

// 增强搜索功能，支持扩展状态
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
        
        // 搜索时自动展开分类
        if (hasVisibleLinks && query !== '') {
            const linksContainer = category.querySelector('.links');
            if (linksContainer && !linksContainer.classList.contains('expanded')) {
                linksContainer.classList.add('expanded');
                const expandBtn = category.querySelector('.expand-btn');
                if (expandBtn) {
                    expandBtn.textContent = '收起';
                    expandBtn.classList.add('collapse');
                }
            }
        }
    });
}
