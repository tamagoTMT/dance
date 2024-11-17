document.addEventListener("DOMContentLoaded", function () {
  // URLのパラメータから出演者IDを取得
  const urlParams = new URLSearchParams(window.location.search);
  const performerId = urlParams.get("id");

  // コンテナ要素が存在するか確認
  const container = document.querySelector(".container");
  if (!container) {
    console.error("Container element not found");
    return;
  }

  // JSONデータを読み込む
  fetch("../json/performerData.json")
    .then((response) => response.json())
    .then((data) => {
      // 出演者の情報をフィルター
      const performers = data.performers.filter((performer) =>
        performerId.split(",").includes(performer.id)
      );
      if (performers.length > 0) {
        renderPerformers(performers, container);
      } else {
        console.error("Performer not found");
      }
    })
    .catch((error) => console.error("Error loading JSON:", error));
});

// 出演者の情報をレンダリングする関数
function renderPerformers(performers, container) {
  performers.forEach((performer, index) => {
    const performerDiv = document.createElement("div");
    performerDiv.className = "performer-item";

    const imgPath = `../photo/photo/performer/${performer.id}/${performer.id}.jpg`;
    const img = document.createElement("img");
    img.src = imgPath;
    img.alt = performer.name;
    img.className = "choreographer-photo";
    // // 最初に読み込めれる画像以外に遅延読み込みの設定を追加
    if (index !== 0) {
      img.loading = "lazy";
    }

    img.onerror = function () {
      this.onerror = null;
      this.src = "../photo/photo/performer/default/default.jpg";
    };

    performerDiv.innerHTML = `
            <h3>${performer.name}</h3>
            <div class="choreographer-photo-wrapper"></div>
            <p><strong>Instagram:</strong> <a href="https://www.instagram.com/${performer.instagram.replace(
              "@",
              ""
            )}" target="_blank">${performer.instagram}</a></p>
            <p><strong>あなたにとってダンスとは:</strong> ${
              performer.whatIsDance
            }</p>
            <p><strong>振付者の印象やメッセージ:</strong> ${
              performer.choreographerMessage
            }</p>
            <p><strong>ご来場のお客様へ一言:</strong> ${
              performer.messageToAudience
            }</p>
        `;

    performerDiv.querySelector(".choreographer-photo-wrapper").appendChild(img);

    container.appendChild(performerDiv);
  });
}
