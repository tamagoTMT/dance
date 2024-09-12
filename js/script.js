document.addEventListener('DOMContentLoaded', function () {
    // ページロード時に最上部にスクロール
    window.scrollTo(0, 0);

    let performerData = [];

    // `performerData.json` を読み込む
    fetch('../json/performerData.json')
        .then(response => response.json())
        .then(data => {
            performerData = data.performers;
        })
        .catch(error => console.error('Error loading performerData JSON:', error));

    // `content.json` を読み込む
    fetch('../json/content.json')
        .then(response => response.json())
        .then(data => {
            renderContent(data);

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0
            };

            const observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                        ///ちんちん
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));

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

        if (current.startsWith('#number')) {
            activateTab('#toc');
        } else {
            activateTab(current);
        }
    });

    // Instagramリンクを生成する関数
    const renderInstagramLinks = (instagramIds) => {
        return instagramIds
            .filter(id => id)
            .map(id => {
                return `<a href="https://www.instagram.com/${id.replace('@', '')}" target="_blank">
                            <img src="../photo/icon/instagram___icon_w_trans.png" alt="Instagram" class="instagram-icon">
                        </a>`;
            })
            .join('');
    };

    const getPerformerNameById = (id) => {
        const performer = performerData.find(performer => performer.id === id);
        return performer ? performer.name : 'Unknown Performer';
    };

    const formatPerformerIds = (performers) => {
        return performers.map(performer => performer.id.padStart(3, '0')).join(',');
    };

    const renderNumberContent = (container, number, imgPath, index) => {
        const choreographerInstagramLinks = renderInstagramLinks(number.instagram || []);
        const performerIds = formatPerformerIds(number.performers);
    
        // Performersのリストを生成。配列または文字列に対応。
        let performersList = '';
        if (number.performers && Array.isArray(number.performers)) {
            performersList = number.performers.map(performer => {
                const name = getPerformerNameById(performer.id);
                return `<li><a href="performer.html?id=${performer.id}">${name}</a></li>`;
            }).join('');
        } else if (typeof number.performers === 'string') {
            performersList = `<li>${number.performers}</li>`; // 文字列の場合、リンクなしで表示
        }
    
        // Membersセクションのリンクを表示するかチェック
        const membersSection = performersList
            ? `<h4><a href="./performer.html?id=${performerIds}">Members</a></h4>`
            : ''; // 0件の場合はリンクもメンバーリストも表示しない
    
        container.innerHTML = `
            <div class="content">
                <h3 class="sample_text16" style="--number-color: ${number.color};">M${index + 1} Title: ${number.title}</h3>
                <p>Choreographer: ${number.choreographer} ${choreographerInstagramLinks}</p>
                <div class="choreographer-photo-wrapper">
                    <img src="${imgPath}" alt="${number.choreographer}" class="choreographer-photo">
                </div>
                <h4>経歴</h4>
                <p>${number.bioContent}</p>
                <h4>${number.commentTitle}</h4>
                <p>${number.comment}</p>
                ${membersSection}
                <ul>
                    ${performersList}
                </ul>
            </div>
        `;
        document.querySelector('#numbers').appendChild(container);
    };

    const renderContent = (data) => {
        // 表紙
        document.querySelector('#cover .content h1').textContent = data.cover.title;
        document.querySelector('#cover .content p').textContent = data.cover.welcomeMessage;

        // 運営コメントセクション
        const commentsSection = document.querySelector('#comments .content');
        commentsSection.innerHTML = `<h2>${data.comments.title}</h2>`;  // セクションタイトル

        // 複数の運営メンバーのコメントを表示
        data.comments.members.forEach(member => {
            commentsSection.innerHTML += `
                <div class="comment-wrapper">
                    ${member.image ? `<img src="../${member.image}" alt="${member.name}" class="comment-photo">` : ''}
                    <p><strong>${member.name}</strong>
                    ${member.instagram ? renderInstagramLinks([member.instagram]) : ''}
                    </p>
                    <p>${member.text}</p>
                </div>
            `;
        });

        // 目次
        const tocList = document.querySelector('#toc-list');
        data.numbers.forEach((number, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="#${number.id}">M${index + 1}. ${number.title}, ${number.choreographer}</a>`;
            tocList.appendChild(listItem);
        });

        // 各ナンバー紹介
        data.numbers.forEach((number, index) => {
            const numberDiv = document.createElement('div');
            numberDiv.className = 'number section number-item';
            numberDiv.id = number.id;

            const imgPath = `../${number.photo}`;
            renderNumberContent(numberDiv, number, imgPath, index);
        });
    };
});
