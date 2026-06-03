// ====== 設定 ======
const DURATION_SEC = 10 * 60; // 10分

// 問題データ（45問）
// answer は 0..3 のインデックス
const quizData = [
  {
    q: '【アプリ】業務で使う3つの基幹アプリの正しい組み合わせは？',
    c: ['Notion・Comiru・Slack', 'Notion・LINE・Zoom', 'Comiru・Excel・Slack', 'Notion・Comiru・LINE'],
    answer: 0
  },
  {
    q: '【アプリ役割】Notionの役割として正しいのは？',
    c: ['業務の母艦（タスク・マニュアル・生徒情報）', '保護者への授業報告', '社内のリアルタイム連絡', '保護者へのお知らせ配信'],
    answer: 0
  },
  {
    q: '【アプリ役割】保護者への授業報告・お知らせに使うアプリは？',
    c: ['Notion', 'Comiru', 'Slack', 'メール'],
    answer: 1
  },
  {
    q: '【アプリ役割】社内の質問・相談・緊急連絡に使うアプリは？',
    c: ['Comiru', 'Notion', 'Slack', '電話のみ'],
    answer: 2
  },
  {
    q: '【使い分け】「保護者向け＝○○ / 社内＝△△」正しい組合せは？',
    c: ['Comiru / Slack', 'Slack / Comiru', 'Notion / Comiru', 'LINE / Slack'],
    answer: 0
  },
  {
    q: '【理念】教室の理念として正しいのは？',
    c: ['入塾前の成績に関わらず可能性を信じて応援する', '成績上位者を優先する', '平均点超えが最低ライン', '志望校は偏差値で決める'],
    answer: 0
  },
  {
    q: '【目標】教室全体の目標に含まれないものは？',
    c: ['全員成績アップ', '全員合格', '楽しく働き甲斐のある職場', '講師の売上最大化'],
    answer: 3
  },
  {
    q: '【時間割】1コマの授業時間は？',
    c: ['60分', '70分', '80分', '90分'],
    answer: 2
  },
  {
    q: '【時間割】1コマごとの休憩時間は？',
    c: ['5分', '10分', '15分', '20分'],
    answer: 1
  },
  {
    q: '【時間割】平日（月〜金）の開講コマは？',
    c: ['1限〜5限', '3限〜5限（17:00以降）', '2限〜4限', '土日と同じ1限〜5限'],
    answer: 1
  },
  {
    q: '【時間割】土日・祝の授業開始時刻は？',
    c: ['14:00以降（1限〜5限）', '17:00以降', '12:00以降', '10:00以降'],
    answer: 0
  },
  {
    q: '【時間割】最大コマ数の制度は？',
    c: ['全3コマ制', '全4コマ制', '全5コマ制', '制限なし'],
    answer: 2
  },
  {
    q: '【Slack】校舎全体への周知・重要なお知らせを流すチャネルは？',
    c: ['sm-30-春日部-1-全体', 'sm-30-春日部-2-タスク管理', 'sm-30-春日部-3-遅刻連絡and業務質問', 'sm-01-自己紹介'],
    answer: 0
  },
  {
    q: '【タスク管理チャネル】ルールとして誤っているものは？',
    c: ['1タスク1メッセージで投稿', 'やり取りは同じスレッド内で継続', '担当者・確認者に@メンションを付ける', 'タスクのやり取りは個別DM・LINEで行う'],
    answer: 3
  },
  {
    q: '【完了報告】タスク完了時の正しい対応は？',
    c: ['リアクション＋「完了しました！」とスレッド返信', '何もしない', '新しいチャネルに投稿', '個別LINEで報告'],
    answer: 0
  },
  {
    q: '【遅刻連絡and業務質問】業務質問・遅刻連絡の原則は？',
    c: ['DMで個別連絡する', '必ずチャネルへ投稿する（DM個別連絡は禁止）', '電話のみ', 'メールで送る'],
    answer: 1
  },
  {
    q: '【DM例外】DMでの個別連絡が認められる例外は？',
    c: ['日々の業務質問', '生徒の成績・家庭事情など機微な内容', '遅刻の連絡', 'タスクの進捗共有'],
    answer: 1
  },
  {
    q: '【お知らせ公開】お知らせ公開に関する講師の権限は？',
    c: ['講師が直接公開できる', '講師は下書きまで。公開は担当者へ連絡して依頼する', '全自動で公開される', '講師は一切作成できない'],
    answer: 1
  },
  {
    q: '【Notion】Notionの4エリアに含まれないものは？',
    c: ['生徒情報', 'タスク管理', 'マニュアル', '給与明細'],
    answer: 3
  },
  {
    q: '【生徒情報】Notionの生徒情報ページに表示されるのは？',
    c: ['全校舎の全生徒', '自分が担当している生徒のみ', '講師全員の情報', '保護者の勤務先'],
    answer: 1
  },
  {
    q: '【リアクション文化】リアクションが必須のチャネルは？',
    c: ['タスク管理のみ', '全体チャネル・遅刻連絡and業務質問', '自己紹介のみ', 'どこでも任意'],
    answer: 1
  },
  {
    q: '【返信文化】メッセージを受け取ったときの基本姿勢は？',
    c: ['すぐ動けないなら反応しない', 'まず一言リアクションか返信（「承知しました！」のスピード感）', '3日以内に返信すればよい', '既読をつけるだけでOK'],
    answer: 1
  },
  {
    q: '【授業前準備】生徒到着前にやることとして誤っているのは？',
    c: ['Comiruで前回の報告書を確認', 'Notionで生徒情報ページを確認', '今日の目標を1行で書き出す', '保護者へ電話で授業報告をする'],
    answer: 3
  },
  {
    q: '【授業構造】1対1授業の3段階の正しい順序は？',
    c: ['導入→インプット→アウトプット', 'インプット→導入→アウトプット', 'アウトプット→導入→インプット', '導入→アウトプット→インプット'],
    answer: 0
  },
  {
    q: '【授業の鉄則】授業中に意識すべき鉄則は？',
    c: ['先生が一方的に話し続ける', '先生が話しすぎず、生徒に説明させる時間を多めにとる', '生徒は聞くだけにする', '解説は省いて演習だけにする'],
    answer: 1
  },
  {
    q: '【授業マナー】教材の扱いでOKなのは？',
    c: ['生徒のノートに直接書く', '生徒の教科書に書き込む', '別紙・ホワイトボードを使う', '口頭説明のみで進める'],
    answer: 2
  },
  {
    q: '【授業マナー】授業中のNGな話題はどれ？',
    c: ['学習の話', '生徒本人の話', '他生徒・他家庭の話', '今日の目標の話'],
    answer: 2
  },
  {
    q: '【報告書】指導報告書の公開締切は？',
    c: ['当日20:00', '当日21:00', '当日21:50', '翌日9:00'],
    answer: 2
  },
  {
    q: '【報告書】コメント欄の文字数の目安は？',
    c: ['100字以上', '120字以上', '150字以上', '170字以上'],
    answer: 3
  },
  {
    q: '【報告書】コメント欄に書く基本4項目に含まれないのは？',
    c: ['その日やったこと', '生徒の様子', '今後の課題・次回の指導方針', '保護者の感想'],
    answer: 3
  },
  {
    q: '【連続授業】80分×2コマの報告書の正しい扱いは？',
    c: ['2コマ分を1件に合算して投稿', '1コマごとに作成（2コマ目に1コマ目内容も記載し「ご確認ください」と明記）', '1件だけメモ程度で済ませる', '必要そうなときだけ2件にする'],
    answer: 1
  },
  {
    q: '【報告書】よくある変換ミスの「正しい」表記は？',
    c: ['大門 / 移行', '大問 / 移項', '大問 / 移行', '大門 / 移項'],
    answer: 1
  },
  {
    q: '【日程お知らせ】授業日程お知らせの作成頻度の原則は？',
    c: ['毎月1回', '基本3か月に1回（3か月分まとめて1本）', '毎週1回', '年1回'],
    answer: 1
  },
  {
    q: '【日程変更期間】翌月分の変更をComiruのみで受け付けられる期間は？',
    c: ['当月1〜5日', '当月10〜15日', '当月20〜25日', '末日まで'],
    answer: 2
  },
  {
    q: '【日程変更】期間外・当月・直前の変更で必須となるのは？',
    c: ['Comiruのみでよい', '電話（→Comiruに記録）', 'メール連絡', 'チャネル投稿のみ'],
    answer: 1
  },
  {
    q: '【変更理由】変更理由としてOKなのは？',
    c: ['私情により', '他の生徒のコマと重なったため', '大学の必修授業のため', '都合が悪くなったため'],
    answer: 2
  },
  {
    q: '【禁止事項】日程変更で禁止されているのは？',
    c: ['保護者確認前のカレンダー更新', '24時間前の連絡', '変更理由の明記', '早めの周知'],
    answer: 0
  },
  {
    q: '【変更手順】講師都合の日程変更で正しい順序は？',
    c: ['カレンダー更新→保護者連絡→了承', '生徒に事情説明・了承→保護者連絡→保護者了承→カレンダー更新→Comiru報告', '生徒了承→保護者連絡→カレンダー更新（報告なし）', '生徒了承→カレンダー更新→あとで報告'],
    answer: 1
  },
  {
    q: '【追加コマ】追加コマの大原則は？',
    c: ['生徒と相談して自己判断で設定する', 'Notion依頼があったときだけ対応する', 'その場で自分が担当を引き受ける', '保護者の口頭で確定する'],
    answer: 1
  },
  {
    q: '【追加コマ】生徒・保護者から直接「追加希望」と言われたら？',
    c: ['その場で日程を確定する', '「確認して改めてご連絡します」と持ち帰る', '自分で担当を引き受ける', '新しいお知らせを作成する'],
    answer: 1
  },
  {
    q: '【追加コマ】追加コマの日程相談を行う場所は？',
    c: ['毎回新しいお知らせを作成する', '該当する3か月お知らせのコメント欄', '個別DM', '電話のみ'],
    answer: 1
  },
  {
    q: '【振替】前日21時までに病欠の連絡があった場合は？',
    c: ['振替可', '振替不可', '欠席扱い', '代講に変更'],
    answer: 0
  },
  {
    q: '【振替】当日90分前以降、または無断欠席の場合の原則は？',
    c: ['振替可', '振替不可（欠席扱い）', '代講手配', '次月に繰越'],
    answer: 1
  },
  {
    q: '【当日欠席の原則】病気以外の当日欠席に関する正しい説明は？',
    c: ['必ず振替可', '原則振替不可。ただし当日90分前以降の連絡は、できる限り振替を先生にお願いしたい（先生が休みたいときに休みづらくならないため）', '常に講師裁量', '連絡タイミングに関わらず振替可'],
    answer: 1
  },
  {
    q: '【荒天】台風・大雪など事前に認知できる事象への対応は？',
    c: ['振替不可（直前NG）', 'こちらから先に振替を提案する', '全員一律休講にする', '欠席処理にする'],
    answer: 1
  },
  {
    q: '【講師体調不良】当日体調不良で休む場合の正しい初動は？',
    c: ['自己判断で休んで後日報告', '生徒にだけ連絡する', 'まず塾長に電話→保護者にも電話→Slack「1-全体」に状況共有', 'Slackに投稿だけして終わり'],
    answer: 2
  },
];
// ====== DOM ======
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('startBtn');
const quizScreen  = document.getElementById('quiz-screen');
const timerEl = document.querySelector('.timer');
const timebar = document.getElementById('timebar');
const form = document.getElementById('quizForm');
const questionsEl = document.getElementById('questions');
const resultEl = document.getElementById('result');

// ====== 生成 ======
function renderQuestions() {
  const frag = document.createDocumentFragment();
  quizData.forEach((item, i) => {
    const qWrap = document.createElement('div');
    qWrap.className = 'q';
    const h = document.createElement('h3');
    h.textContent = `Q${i+1}. ${item.q}`;
    qWrap.appendChild(h);
    const fs = document.createElement('fieldset');
    item.c.forEach((choice, idx) => {
      const id = `q${i}_c${idx}`;
      const label = document.createElement('label');
      label.className = 'choice';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${i}`;
      input.value = String(idx);
      input.id = id;
      const span = document.createElement('span');
      span.textContent = `${String.fromCharCode(65+idx)}. ${choice}`;
      label.htmlFor = id;
      label.appendChild(input);
      label.appendChild(span);
      fs.appendChild(label);
    });
    qWrap.appendChild(fs);
    frag.appendChild(qWrap);
  });
  questionsEl.appendChild(frag);
}

// ====== タイマー ======
let remaining = DURATION_SEC;
let timerId = null;

function format(sec){
  const m = String(Math.floor(sec/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return `${m}:${s}`;
}

function updateTimer(){
  timerEl.textContent = `残り ${format(remaining)}`;
  const ratio = Math.max(0, remaining) / DURATION_SEC;
  timebar.style.transform = `scaleX(${ratio})`;
}

function startTimer(){
  remaining = DURATION_SEC;
  updateTimer();
  timerId = setInterval(()=>{
    remaining--;
    updateTimer();
    if(remaining <= 0){
      clearInterval(timerId);
      autoSubmit();
    }
  }, 1000);
}

function stopTimer(){
  if(timerId) clearInterval(timerId);
  timerId = null;
}

// ====== 採点 ======
function grade(){
  const answers = new Map();
  quizData.forEach((_, i) => {
    const selected = form.querySelector(`input[name="q${i}"]:checked`);
    answers.set(i, selected ? Number(selected.value) : null);
  });
  let correct = 0; const wrongs = [];
  quizData.forEach((q, i) => {
    const a = answers.get(i);
    if(a === q.answer) correct++; else wrongs.push({i, a});
  });
  return {correct, wrongs};
}

function showResult({correct, wrongs}){
  const total = quizData.length;
  const percent = Math.round((correct/total)*100);
  const ok = `<span class="ok">${correct} / ${total}（${percent}%）</span>`;
  const summary = `<h2 class="mb-16">結果：${ok}</h2>`;

  let detail = '';
  if(wrongs.length === 0){
    detail = '<p class="mb-16">全問正解です。素晴らしい！</p>';
  } else {
    detail = '<div class="mb-16"><strong>間違えた問題の解説</strong></div>';
    wrongs.forEach(({i, a}) => {
      const q = quizData[i];
      const your = (a==null)? '未選択' : `${String.fromCharCode(65+a)}. ${q.c[a]}`;
      const ans = `${String.fromCharCode(65+q.answer)}. ${q.c[q.answer]}`;
      detail += `
        <div class="result wrong mb-16">
          <div class="mb-8"><strong>Q${i+1}</strong>：${q.q}</div>
          <div>あなたの回答：<span class="err">${your}</span></div>
          <div>正解：<span class="ok">${ans}</span></div>
        </div>
      `;
    });
  }

  resultEl.innerHTML = `
    <div class="result mb-16">
      ${summary}
      <p class="muted">※このページでは個人情報を収集していません。結果はこの端末上でのみ表示されます。</p>
    </div>
    ${detail}
    <div class="center">
      <button class="btn" onclick="location.reload()">もう一度受験</button>
    </div>
  `;
  resultEl.classList.remove('hidden');
  form.classList.add('hidden');
  document.querySelector('.bar').classList.add('hidden');
  document.querySelector('.toolbar').classList.add('hidden');
  window.scrollTo({top:0, behavior:'smooth'});
}

function autoSubmit(){
  if(!form.classList.contains('hidden')){
    const res = grade();
    stopTimer();
    showResult(res);
  }
}

// ====== Events ======
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  renderQuestions();
  startTimer();
  setTimeout(()=>{
    const first = form.querySelector('input[type="radio"]');
    if(first) first.focus();
  }, 50);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const res = grade();
  stopTimer();
  showResult(res);
});
