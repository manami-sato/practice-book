{
  const body = document.querySelector("body");
  const height = window.innerHeight;
  const txtWrap = document.querySelector(".article__wrap--txt"); // 横幅を設定する大枠
  // const adHeight = 100;
  const adHeight = 0;
  const txtWrapHeight = () => {
    let infoHeight = document.querySelector(".article__wrap--ttl").offsetHeight;
    let inner = height - adHeight - infoHeight * 2;
    txtWrap.style.height = inner + `px`;
  };
  txtWrapHeight();

  const first = () => {
    page.innerHTML = "";
    page.innerHTML = count + 1;
    txt.style.right = txtTtlWidth + `px`;
    txtTtl.style.display = "block";
  };
  const contents = () => {
    page.innerHTML = "";
    page.innerHTML = count + 1;
    txt.style.right = -count * txtWrapWidth + txtTtlWidth + `px`;
  };

  // ページ送り回数
  let count = 0;

  //
  // txt横幅設定
  //
  const articleWidth = Math.floor(body.clientWidth * 0.8); // txtの希望横幅をbodyから直接取る
  const txt = document.querySelector(".article__wrap--txt pre"); // 文章本体
  const txtTtl = document.querySelector(".article__wrap--txt p"); // 文章中のタイトル
  const lineWidth = parseInt(getComputedStyle(txt).lineHeight); // txtにかけられているline-height取得
  const txtTtlWidth = lineWidth * 3; // 文章中タイトルの横幅（3行分）
  txtTtl.style.width = txtTtlWidth + `px`; // を設定
  lines = Math.round(articleWidth / lineWidth); // 希望横幅をline-heightで割って四捨五入して何行入るのが理想か
  txtWrapWidth = lines * lineWidth; // 入る行数*line-height（=大枠の幅）
  txtWrap.style.width = txtWrapWidth + `px`; // を設定
  const page = document.querySelector(".article__wrap--page"); // ページ数表示
  first();

  //
  // txt行数取得（ページ遷移用）
  //
  const txtHeight = txtWrap.clientHeight; // txtの縦幅
  const letterHeight = parseInt(getComputedStyle(txt).fontSize); // txtにかけられているfont-size取得
  const displayHeight = Math.floor(txtHeight / letterHeight); // 一行が何文字まで表示されるか
  const novel = txt.innerHTML.split("\n"); // 一改行ごとに分割
  let txtLines = 0; // 全体の行数の箱
  let txtNulls = 0; // 全体の空白行の箱
  for (let i = 0; i < novel.length; i++) {
    let txtLength = novel[i].length; // 一改行の文字数
    let txtLine = Math.ceil(txtLength / displayHeight); // 一改行に何行要しているか
    txtLines += txtLine; // 全体の行数として加算していく
    if (txtLine == 0) {
      txtNulls++;
    }
  }
  const txtWidthLines = (txtLines + txtNulls) * lineWidth + txtTtlWidth; // txt全体の横幅とタイトル分

  //
  // ページ数を表示
  //
  // const txtCount = txt.textContent.length; // 文字数
  const txtCountWrap = document.querySelector(".article__wrap--ttl--count");
  const txtCount = Math.ceil(txtWidthLines / txtWrapWidth);
  txtCountWrap.innerHTML = `（` + txtCount + `P）`;

  //
  // ページ遷移
  //
  const judge = body.clientWidth / 2; // ページ遷移用flag的なもの
  const back = document.querySelector(".article__back");
  const backBg = document.querySelector(".article__back--bg");
  txtWrap.addEventListener("touchend", (e) => {
    let touchPosition = e.changedTouches[0].pageX;
    if (judge > touchPosition) {
      count++;
      if (count * txtWrapWidth > txtWidthLines) {
        count--;
        back.setAttribute("id", "article__back--add");
        backBg.setAttribute("id", "article__back--bg--add");
        document
          .querySelector(".article__back--contents")
          .addEventListener("touchend", () => {
            history.back();
            back.removeAttribute("id");
            backBg.removeAttribute("id");
          });
        document
          .querySelector(".article__back--first")
          .addEventListener("touchend", () => {
            count = 0;
            first();
            back.removeAttribute("id");
            backBg.removeAttribute("id");
          });
        document
          .querySelector(".article__back--rmv")
          .addEventListener("touchend", () => {
            back.removeAttribute("id");
            backBg.removeAttribute("id");
          });
        backBg.addEventListener("touchend", () => {
          back.removeAttribute("id");
          backBg.removeAttribute("id");
        });
      }
      if (count == 1) {
        txtTtl.style.display = "none";
        contents();
      } else {
        contents();
      }
    } else {
      count--;
      if (count < 0) {
        count = 0;
      }
      if (count == 0) {
        first();
      } else {
        contents();
      }
    }
  });
}
