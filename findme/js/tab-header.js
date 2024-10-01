document.addEventListener('DOMContentLoaded', function () {
    // ページロード時に最上部にスクロール
    window.scrollTo(0, 0);

    const tabs = document.querySelectorAll('.tab4__link');
    const sections = document.querySelectorAll('.section');
    
    function activateTab(target) {
        tabs.forEach(tab => {
            tab.classList.remove('on');
            if (tab.getAttribute('data-target') === target) {
                tab.classList.add('on');
            }
        });
    }

    // 初期表示でTitleタブに下線を付ける
    activateTab('#title-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            activateTab(target);
        });
    });

    // スクロールイベントでタブのアクティブを変更
    window.addEventListener('scroll', function () {
        let current = '#title-section';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (pageYOffset >= sectionTop) {
                current = `#${section.getAttribute('id')}`;
            }
        });

        // Titleがアクティブな時はTitleタブを、Numberがアクティブな時はIndexタブをアクティブにする
        if (current.startsWith('#number')) {
            activateTab('#toc');
        } else {
            activateTab(current);
        }
    });
});
