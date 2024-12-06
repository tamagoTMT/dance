document.addEventListener("DOMContentLoaded", function () {
  // JSONデータの読み込み
  fetch("../json/interviews.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("読み込まれたデータ:", data); // デバッグ用ログ出力
      renderTOC(data);
      renderInterviews(data);

      // Intersection Observerの設定
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // 各インタビューセクションを監視対象に追加
      document.querySelectorAll(".interview-item").forEach((section) => {
        observer.observe(section);
      });
    })
    .catch((error) => console.error("JSONの読み込みエラー:", error));
});

// 目次のレンダリング
function renderTOC(data) {
  const tocList = document.querySelector("#toc-list");
  data.forEach((interview) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a href="#interview-${interview.id}">${interview.name}</a>`;
    tocList.appendChild(listItem);
  });
}

// インタビュー記事のレンダリング
function renderInterviews(data) {
  const interviewsSection = document.querySelector("#interviews");
  data.forEach((interview) => {
    const interviewDiv = document.createElement("div");
    interviewDiv.className = "interview-item";
    interviewDiv.id = `interview-${interview.id}`;

    let interviewContent = "";
    let index = 1;
    while (interview[`interview${index}`]) {
      const interviewSegment = interview[`interview${index}`];
      interviewContent += ` ${interviewSegment.interviewer}</p>`;
      interviewContent += ` ${interviewSegment.respondent}</p>`;
      index++;
    }

    interviewDiv.innerHTML = `
            <div class="content">
                <h3>${interview.name}</h3>
                ${interviewContent}
            </div>
        `;
    interviewsSection.appendChild(interviewDiv);
  });
}
