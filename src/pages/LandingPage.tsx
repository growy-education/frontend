import { createContext, useState } from "react";
interface LPContextType {
  showLP: boolean;
  toggleLP: () => void;
}

export const LandingPageContext = createContext<LPContextType>({
  showLP: true,
  toggleLP: () => {},
});

export const LandingPageContextProvider = ({ children }) => {
  const [showLP, setShowLP] = useState(true);

  const toggleLP = () => {
    setShowLP(!showLP);
  };

  const contextValue = {
    showLP,
    toggleLP,
  };

  return (
    <LandingPageContext.Provider value={contextValue}>
      {showLP ? <LandingPage /> : children}
    </LandingPageContext.Provider>
  );
};

export const LandingPage = () => {
  return (
    <>
      <header id="header" className="header">
        <div className="site-ttl site-ttl-sp">
          <img className="site-logo" src="/img/logo-min.png" alt="title-logo" />
        </div>

        <input type="checkbox" id="header-nav-input" />
        <label htmlFor="header-nav-input" id="burger-button">
          <span></span>
        </label>

        <div id="header-nav">
          <ul>
            <div className="header-nav-flex-forbtn">
              <div className="header-nav-flex">
                <li className="nav-item nav-link">
                  <a href="./index.html">TOP</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#message">メッセージ</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#about">個別指導塾Growyとは</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#coaching">コーチング</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#teaching">ティーチング</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#teachers">講師紹介</a>
                </li>
              </div>
              <div className="header-nav-flex">
                <li className="nav-item nav-link">
                  <a href="#students">対象の生徒</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#voice">保護者様の声</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#price">料金</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#faq">FAQ</a>
                </li>
                <li className="nav-item nav-link">
                  <a href="#message-2">学長より</a>
                </li>
              </div>
            </div>

            <li className="nav-item nav-link btn-line-burger">
              <a href="https://line.me/R/ti/p/@208okwey">
                <img
                  src="/img/img-btn-line-sp-min.png"
                  alt="LINE登録はこちらフロートボタン"
                />
              </a>
            </li>

            <div className="burguer-btn-sns">
              <li className="nav-item nav-link sns youttube">
                <a href="https://www.youtube.com/channel/UC35PZPRvt3OBQ10dYj2k61w">
                  <img src="/img/youtube-icon.png" alt="Youtube" />
                </a>
              </li>
              <li className="nav-item nav-link sns twitter">
                <a href="https://twitter.com/honnedechuju">
                  <img src="/img/twitter-logo.png" alt="Twitter" />
                </a>
              </li>
              <li className="nav-item nav-link sns instagram">
                <a href="https://www.instagram.com/honnechuju/">
                  <img src="/img/instagram-icon.png" alt="Twitter" />
                </a>
              </li>
              <li className="nav-item nav-link sns instagram">
                <a href="https://honnedechuju.com/">BLOG</a>
              </li>
            </div>
          </ul>
        </div>
      </header>
      <main>
        <section id="kv" className="kv-wrapper">
          <div className="movie-wrapper">
            <div className="kv-movie">
              <video
                src="/img/growy-lp-sp.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/img/growy-kv-sp.jpg"
              ></video>
            </div>
          </div>

          <div className="btn-fix-wrapper">
            <p className="padding-bug">A</p>
            <figure className="btn btn-fix">
              <a href="https://line.me/R/ti/p/@208okwey">
                <img
                  src="/img/img-btn-line-float-min.png"
                  alt="LINE登録はこちらフロートボタン"
                />
              </a>
            </figure>
          </div>
        </section>

        <section id="message" className="top-message">
          <div className="message-wrapper bg-note">
            <div className="message-movie">
              <video src=""></video>
            </div>

            <details className="accordion-btn">
              <summary>
                <h1 className="accordion-ttl">　Growyからのメッセージ　 ▼</h1>
              </summary>

              <div className="message-text-container">
                <p className="message-text">
                  私たちGrowyは、もともと中学受験に奮闘する親御様に向けたメディア発信活動「ホンネで中学受験」を運営してきました。
                  <br />
                  「ホンネで中学受験」では、
                  <a href="https://twitter.com/honnedechuju">Twitter</a>や
                  <a href="https://honnedechuju.com/">ブログ</a>、
                  <a href="https://www.youtube.com/channel/UC35PZPRvt3OBQ10dYj2k61w">
                    YouTube
                  </a>
                  を通じて「子どもの成績が伸びない」と悩みながら奮闘している親御様方の悩みに応えてきました。
                  <br />
                  「ホンネで中学受験」は、ありがたいことにこれまでたくさんの感謝のコメントを頂くことができました。これは本当に誇らしいことです。
                  <br />
                  しかしその一方で、「ホンネで中学受験」だけでは十分にサポートできないご家庭の声も、私たちに届くようになりました。
                  <br />
                  <br />
                  <b>
                    「どうすれば良いかはわかったけれど、子どもに割く時間がどうしても足りないんです。」
                  </b>
                  <br />
                  <br />
                  <b>
                    「忙しいとは思いますが、うちの子どもの指導をお願いできませんか？」
                  </b>
                  <br />
                  <br />
                  これらの声が届くたびに、中学受験の情報が届いていても、困っているご家庭がたくさんあることに私たちは気づいたのです。
                  <br />
                  <br />
                  <b>
                    「私たちで、どうにかしてこのようなご家庭を助けることはできないだろうか？」
                  </b>
                  <br />
                  <br />
                  そのような想いで私たちは、<b>新時代の個別指導塾「Growy」</b>
                  を始めました。
                </p>
              </div>
            </details>
          </div>
        </section>

        <section className="onayami">
          <div className="onayami-1-wrapper">
            <p className="padding-bug">A</p>
            <div className="onayami-1-p">
              <p className="onayami-1-ttl">
                日々のお子様の受験サポートを通じて
                <br />
                こんなお悩みを感じたことはありませんか？
              </p>
            </div>
            <div className="onayami-1-list">
              <h3 className="onayami-1-text">
                ・子どもが親に教わるのを嫌がる
                <br />
                ・スケジュール管理が苦手で予定通り進まない
                <br />
                ・勉強を見る時間を十分に取れない
                <br />
                ・子どもがわからないとすぐに諦めてしまう
                <br />
                ・子どもがどこまで解っているのかわからない
                <br />
                ・今の塾には相談しづらい
                <br />
                ・学習管理以外の部分にもっと時間を使いたい
                <br />
                ・子どもが中学受験に本気にならない
              </h3>
            </div>
          </div>

          <div className="onayami-2-wrapper">
            <h2 className="onayami-2-h2">
              スケジュールの作成と管理
              <br />
              お子様に合った学習内容の準備
              <br />
              丸つけや間違えた問題の確認
              <br />
              学習の進行管理
              <br />
              志望校の調査
              <br />
              メンタルケア
              <br />
              など...
            </h2>
          </div>

          <div className="onayami-3-wrapper">
            <p className="padding-bug">A</p>
            <div className="onayami-3">
              <p>
                これらのサポートは
                <br />
                従来の塾や個別指導などの
                <br />
                <span className="under-line">中学受験業界には存在せず</span>
                <br />
                これまで<span className="red-bold">保護者様だけで</span>
                <br />
                行わなければいけませんでした。
              </p>
            </div>
          </div>

          <div className="onayami-4-wrapper bg-note">
            <div className="onayami-4">
              <p>
                私たち「ホンネ中学受験」の元にも
                <br />
                日々届く沢山の相談。
                <br />
                <br />
                数えきれないほど膨大な量の
                <br />
                <span className="juken-support">
                  「名前のない中学受験サポート」
                </span>
                を<br />
                保護者様がご家庭で行っている状況を
                <br />
                私たちは知っています。
                <br />
                <br />
                <span className="red-bold">
                  「困っているご家庭を助けたい。」
                </span>
                <br />
                そんな強い想いのもと
                <br />
                私達はあなたの悩みを解決し
                <br />
                お子様を<span className="under-line-2">最高の中学受験</span>
                へ導きます。
                <br />
                <br />
                プロと一緒に効率的かつ確実に
                <br />
                やり抜く成功体験をしてみませんか？
              </p>
            </div>
          </div>
        </section>

        {/* about-1 個別指導塾Growyとは */}
        <section id="about" className="about-growy">
          <div className="about-1">
            <div className="about-ttl about-1-ttl">
              <img
                src="/img/ttl-about-1-sp-min.jpg"
                alt="個別指導塾Growyとは"
              />
            </div>

            <div className="about-1-wrapper">
              <p className="padding-bug">A</p>
              <div className="about-1-content">
                <h1 className="about-text-sub-ttl">
                  ２つのサポートで
                  <br />
                  お子様のやり抜く力を伸ばす
                  <br />
                  <span className="under-line-3">新時代の個別指導塾</span>
                </h1>

                <div className="about-1-text">
                  <p className="about-text-p">
                    「最高の中学受験とするために、やり抜く成功体験をお届けする」というコンセプトで、
                    <span className="bold-coaching">コーチング</span>と
                    <span className="bold-teaching">ティーチング</span>
                    の両面からお子様を全力サポートいたします。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* about-2 他の家庭教師や塾にはないGrowyの特徴 */}
          <div className="about-2">
            <div className="about-ttl about-2-ttl">
              <img
                src="/img/ttl-about-2-sp-min.jpg"
                alt="他の家庭教師や塾にはないGrowyの特徴"
              />
            </div>

            <div className="about-2-wrapper bg-note">
              <p className="about-2-text-1">
                Growyの最大のポイントは、講師の役割が
                <span className="bold-coaching">コーチング</span>と
                <span className="bold-teaching">ティーチング</span>
                の２つに分けられていること。 中でも私たちは、
                <span className="text-bold">
                  これまで保護者様が１人でやらなければならない仕事
                </span>
                だった
                <span className="bold-coaching">コーチング</span>
                というサポートの役割を最重要視し、
                <span className="text-bold">保護者様と協力して</span>
                行っていきます。
                <span className="bold-coaching">コーチング</span>
                できめ細やかに把握した内容を
                <span className="bold-teaching">ティーチング</span>
                に落とし込むことで、より効率的で確実な成績アップに繋がります。
              </p>

              <div className="zukai">
                <figure className="zukai-img zukai-coaching-sp">
                  <img src="/img/zukai-coaching-min.png" alt="コーチング" />
                </figure>
                <figure className="arrows">
                  <img
                    className="arrows-move"
                    src="/img/arrows-min.png"
                    alt="矢印"
                  />
                </figure>
                <figure className="hogoshato">
                  <img src="/img/zukai-text-min.png" alt="保護者と〜" />
                </figure>
                <figure className="zukai-img zukai-teaching">
                  <img src="/img/zukai-teaching-min.png" alt="ティーチング" />
                </figure>
                <figure className="teachers">
                  <img src="/img/img-teachers-min.png" alt="講師陣" />
                </figure>
                <div className="about-2-text-2">
                  <p>
                    <img
                      className="logo logo-about-2 logo-about-2-sp"
                      src="/img/logo-min.png"
                      alt="ロゴ"
                    />
                    の講師陣は、小学4年生から6年生までの幅広い指導経験があり、中学受験全体を深く理解している
                    <span className="text-bold">プロフェッショナル</span>
                    です。
                    各ご家庭が持つ中学受験の目的やお子様の性格・能力に合わせた最適なスケジュールや学習内容を中学受験のプロがご用意します。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* about-3 コーチング */}
          <section id="coaching">
            <div className="about-3-ttl-wrapper">
              <div className="about-3-ttl">
                <figure className="point point-1">
                  <img src="/img/point1-min.png" alt="ポイント１" />
                </figure>
                <div>
                  <p className="coaching-ttl">コーチング</p>
                </div>
              </div>
            </div>

            <div className="coaching-wrapper">
              <figure className="coaching-top-img">
                <img
                  src="/img/coaching-top-img-min.png"
                  alt="経験豊富な講師が専属サポーターとして..."
                />
              </figure>

              <div className="about-3-content-wrapper">
                <div className="about-3-container">
                  <div className="contents">
                    <div className="coathing-1">
                      <img
                        className="number"
                        src="/img/number-coaching-1-min.png"
                        alt="1"
                      />
                      <p className="about-3-subttl coaching-subttl">
                        高品質なスケジュール管理
                      </p>
                      <div className="about-3-1-text about-3-text">
                        <p>
                          面談や成績を踏まえて、お子様の学習スケジュールを講師が
                          <span className="text-bold">毎週作成。</span>
                          <span className="under-line-1">
                            進捗の管理を
                            <span className="text-bold">毎日</span>行います
                          </span>
                          。
                        </p>
                      </div>

                      <img
                        className="schedule-list"
                        src="/img/img-schedule-list-min.jpg"
                        alt="スケジュール表"
                      />

                      <div className="check-list">
                        <div className="check-list-flex">
                          <figure className="img-check check check-green">
                            <img
                              src="/img/img-check-green-min.png"
                              alt="緑チェック"
                            />
                          </figure>
                          <div className="check-list-p">
                            <p>その日の学習内容と教材を具体的に指定します。</p>
                          </div>
                        </div>
                        <div className="check-list-flex">
                          <figure className="img-check check check-green">
                            <img
                              src="/img/img-check-green-min.png"
                              alt="緑チェック"
                            />
                          </figure>
                          <div className="check-list-p">
                            <p>
                              <span className="bold-text">
                                お子様の性格や学習状況に合わせて学習内容を取捨選択できる
                              </span>
                              ので、効率的に学習を進められるようになります。
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="img-coaching img-about-3-comment">
                        <img
                          className="img-coaching-1"
                          src="/img/coaching-comment-1-sp-min.png"
                          alt="コーチングコメント１"
                        />
                      </div>
                    </div>

                    <div className="coathing-2">
                      <img
                        className="number"
                        src="/img/number-coaching-2-min.png"
                        alt="2"
                      />
                      <p className="about-3-subttl coaching-subttl">
                        いつでも対応可能な
                        <br />
                        学習相談
                      </p>
                      <div className="about-3-2-text about-3-text">
                        <p>
                          中学受験の悩みをチャットやビデオ通話で
                          <span className="under-line-1">
                            <span className="text-bold">いつでも</span>
                            相談することができます
                          </span>
                          。
                        </p>
                      </div>

                      <img
                        className="img-chat img-200"
                        src="/img/img-coaching-2-min.png"
                        alt="チャットやビデオで相談"
                      />

                      <div className="img-coaching img-about-3-comment">
                        <img
                          className="img-coaching-2"
                          src="/img/coating-comment-2-sp-min.png"
                          alt="コーチングコメント2"
                        />
                      </div>
                    </div>

                    <div className="coathing-3">
                      <img
                        className="number"
                        src="/img/number-coaching-3-min.png"
                        alt="3"
                      />
                      <p className="about-3-subttl coaching-subttl">
                        毎週のオンライン面談
                      </p>
                      <div className="about-3-3-text about-3-text">
                        <p>
                          お子様の学習状況や日々のお悩みについて講師と話し合うことができます。
                        </p>
                      </div>

                      <img
                        className="img-meeting img-200"
                        src="/img/img-coaching-3-min.png"
                        alt="ミーティング"
                      />

                      <div className="img-coaching img-about-3-comment">
                        <img
                          className="img-coaching-3"
                          src="/img/coaching-comment-3-sp-min.png"
                          alt="コーチングコメント3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* about-3 ティーチング */}
          <section id="teaching">
            <div className="about-3-ttl-wrapper">
              <div className="about-3-ttl">
                <figure className="point point-2">
                  <img src="/img/point2-min.png" alt="ポイント2" />
                </figure>
                <div>
                  <p className="teaching-ttl">ティーチング</p>
                </div>
              </div>
            </div>

            <div className="teaching-wrapper">
              <figure className="teaching-top-img">
                <img
                  src="/img/teaching-top-img-min.png"
                  alt="優れた指導能力を持つティーチング講師が..."
                />
              </figure>
              <div className="about-3-content-wrapper">
                <div className="about-3-container">
                  <div className="contents">
                    <div className="teathing-1">
                      <img
                        className="number"
                        src="/img/number-teaching-1-min.png"
                        alt="1"
                      />
                      <p className="about-3-subttl teaching-subttl">
                        オンライン指導
                      </p>
                      <div className="about-3-4-text about-3-text">
                        <p>
                          科目ごとのプロフェッショナル講師から分かりやすい個別指導を受けられるサービスです。
                        </p>
                      </div>

                      <img
                        className="img-online-lesson"
                        src="/img/img-teaching-1-min.png"
                        alt="オンライン授業"
                      />

                      <div className="check-list">
                        <div className="check-list-flex">
                          <figure className="img-check check check-light-green">
                            <img
                              src="/img/img-check-light-green-min.png"
                              alt="黄緑チェック"
                            />
                          </figure>
                          <div className="check-list-p">
                            <p>
                              <span className="bold-coaching">
                                コーチング担当の講師
                              </span>
                              が「学習スケジュール」で指定した学習内容をより分かりやすく学ぶことができます。
                            </p>
                          </div>
                        </div>
                        <div className="check-list-flex">
                          <figure className="img-check check check-light-green">
                            <img
                              src="/img/img-check-light-green-min.png"
                              alt="黄緑チェック"
                            />
                          </figure>
                          <div className="check-list-p">
                            <p>
                              １コマ80分の短い時間で集中的に１つの科目を学びます。
                            </p>
                          </div>
                        </div>
                        <div className="check-list-flex">
                          <figure className="img-check check check-light-green">
                            <img
                              src="/img/img-check-light-green-min.png"
                              alt="黄緑チェック"
                            />
                          </figure>
                          <div className="check-list-p">
                            <p>
                              授業はGoogleMeetを使って
                              <span className="bold-teaching">
                                ティーチング担当の講師
                              </span>
                              の画面を共有しながら行われます。
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="img-teaching img-about-3-comment">
                        <img
                          className="img-teaching-1"
                          src="/img/teaching-comment-1-sp-min.png"
                          alt="ティーチングコメント１"
                        />
                      </div>
                      <h3 className="h3-teaching-1">
                        ※キャンセルのご連絡は前日までにお願いいたします。当日の場合はキャンセル料が発生する場合がございます。
                      </h3>
                    </div>

                    <div className="teathing-2">
                      <img
                        className="number"
                        src="/img/number-teaching-2-min.png"
                        alt="2"
                      />
                      <p className="about-3-subttl teaching-subttl">
                        質問回答サービス
                      </p>
                      <div className="about-3-3-text about-3-text">
                        <p>
                          分からない問題を24時間質問することができるサービスです。
                        </p>
                      </div>

                      <img
                        className="img-teaching-2"
                        src="/img/img-teaching-2-min.png"
                        alt="質問回答サービス図解"
                      />

                      <div className="teaching-2-text-content">
                        <div className="teaching-2-text-1">
                          <p>
                            算数や理科などの分からない問題につまずいた時は、問題の写真をフォームに送ると解説動画が届きます。
                          </p>
                          <p className="teaching-2-text-2">
                            ※回答動画はGrowyの各科目担当講師が作成します。
                          </p>
                        </div>
                      </div>

                      <div className="img-teaching img-about-3-comment">
                        <img
                          className="img-teaching-2"
                          src="/img/teaching-comment-2-sp-min.png"
                          alt="ティーチングコメント2"
                        />
                      </div>
                    </div>

                    <div className="teathing-3">
                      <img
                        className="number"
                        src="/img/number-teaching-3-min.png"
                        alt="3"
                      />
                      <p className="about-3-subttl teaching-subttl">
                        オンライン自習室
                      </p>
                      <div className="about-3-3-text about-3-text">
                        <p>
                          オンラインの自習室で集中した学習環境が得られるサービスです。
                        </p>
                      </div>

                      <img
                        className="img-teaching-3 img-200"
                        src="/img/img-teaching-3-min.png"
                        alt="オンライン自習室"
                      />

                      <div className="img-teaching img-about-3-comment">
                        <img
                          className="img-teaching-3"
                          src="/img/teaching-comment-3-sp-min.png"
                          alt="ティーチングコメント3"
                        />
                      </div>
                      <h3 className="h3-teaching-3">
                        ※自習中のご質問はお受けできません
                        <br />
                        ※運営の都合で開催できない日もございます
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* 講師紹介 */}
        <section id="teachers">
          <div className="teachers-ttl">
            <img src="/img/ttl-teachers-sp-min.png" alt="講師紹介" />
          </div>

          <div className="teachers-wrapper bg-note">
            <div className="teachers-view">
              <div className="teacher-container">
                <div className="teacher-flex">
                  <figure className="img-teacher">
                    <img src="/img/img-teacher-hamataku.jpg" alt="講師写真" />
                  </figure>
                  <div className="info-teacher">
                    <h2 className="teachers-name">濱野 拓哉</h2>
                    <h4 className="teachers-class">国語、社会</h4>
                    <h4 className="teachers-schools">
                      巣鴨高等学校卒業
                      <br />
                      明治大学経済学部在籍
                    </h4>
                  </div>
                </div>
                <div className="teachers-message">
                  <h3 className="teachers-message-text">
                    中学受験の勉強には様々な困難があります。そんな中で、少しでも僕との時間を楽しいと感じてもらえるように寄り添っていきます。中学受験をより実りのあるのものにしていきましょう。
                  </h3>
                </div>
              </div>

              <div className="teacher-container">
                <div className="teacher-flex">
                  <figure className="img-teacher">
                    <img src="/img/img-teacher-hirokuma.jpg" alt="講師写真" />
                  </figure>
                  <div className="info-teacher">
                    <h2 className="teachers-name">竹熊 宏輝</h2>
                    <h4 className="teachers-class">算数、理科</h4>
                    <h4 className="teachers-schools">
                      巣鴨高等学校卒業
                      <br />
                      東京大学応用化学科卒業
                    </h4>
                  </div>
                </div>
                <div className="teachers-message">
                  <h3 className="teachers-message-text">
                    小学生の頃、僕自身にとって塾は児童館に近い存在でした。
                    もちろん成績も良くはなく、特に国語の成績が酷かった記憶があります。
                    <br />
                    しかし小学5年生の頃から父親が休日に勉強を見てくれたため、少しずつ成績が上向いていきました。特に、テストの解き直しを毎週一緒に進めたことが、それ以降の勉強習慣の基礎となりました。
                    <br />
                    そして、子供にとって自分の頑張りを誰かが見てくれるというのは嬉しいものです。
                    <br />
                    Growyの指導では、生徒の皆さんがこのような小さな成功体験を積み重ねることで、「やり抜く力」を育めるように全力を尽くしていきます。
                  </h3>
                </div>
              </div>

              <div className="teacher-container">
                <div className="teacher-flex">
                  <figure className="img-teacher">
                    <img src="/img/img-teacher-yoshimon.jpg" alt="講師写真" />
                  </figure>
                  <div className="info-teacher">
                    <h2 className="teachers-name">吉本 龍一</h2>
                    <h4 className="teachers-class">算数、理科</h4>
                    <h4 className="teachers-schools">
                      巣鴨高等学校卒業
                      <br />
                      千葉大学理学部卒業
                      <br />
                      千葉大学大学院融合理工学部卒業
                    </h4>
                  </div>
                </div>
                <div className="teachers-message">
                  <h3 className="teachers-message-text">
                    私の周りには中学受験をする友達がほとんどいませんでした。そんな中、抵抗なく勉強することができていたのは、おそらく出会った講師がよかったからです。
                    私自身も生徒に「分かることの楽しさ」「勉強の楽しさ」を感じてもらえるように、サポートしていきます。
                  </h3>
                </div>
              </div>

              <div className="teacher-container">
                <div className="teacher-flex">
                  <figure className="img-teacher">
                    <img src="/img/img-teacher-keigo.jpg" alt="講師写真" />
                  </figure>
                  <div className="info-teacher">
                    <h2 className="teachers-name">倉石 圭悟</h2>
                    <h4 className="teachers-class">算数・理科</h4>
                    <h4 className="teachers-schools">
                      都立西高校
                      <br />
                      慶應義塾大学理工学部中退
                    </h4>
                  </div>
                </div>
                <div className="teachers-message">
                  <h3 className="teachers-message-text">
                    僕の今までの指導経験から、勉強は楽しくやった方が成績が伸びます。そして、成績が伸びるとますます楽しくなります。
                    <br />
                    この好循環に入るためには、「頑張ったら点数が上がった」という経験が必要です。
                    <br />
                    この経験を積み重ね「やり抜く力」を身につけるために、全力でサポートしていきます。
                  </h3>
                </div>
              </div>
            </div>

            {/* アコーディオンメニュー */}
            <details className="accordion-btn-2">
              <summary>
                <div className="accordion-ttl-2">
                  　その他の講師を見る　　　　▼
                </div>
              </summary>
              <div className="accordion-teachers">
                <div className="teacher-container">
                  <div className="teacher-flex">
                    <figure className="img-teacher">
                      <img src="/img/img-teacher-1-min.jpg" alt="講師写真" />
                    </figure>
                    <div className="info-teacher">
                      <h2 className="teachers-name">田中 太郎</h2>
                      <h4 className="teachers-class">国語</h4>
                      <h4 className="teachers-schools">
                        ●●中学卒業
                        <br />
                        ●●高等学校卒業
                        <br />
                        ●●大学●●学部卒業
                      </h4>
                    </div>
                  </div>
                  <div className="teachers-message">
                    <h3 className="teachers-message-text">
                      （数行のメッセージ）メッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッ
                    </h3>
                  </div>
                </div>

                <div className="teacher-container">
                  <div className="teacher-flex">
                    <figure className="img-teacher">
                      <img src="/img/img-teacher-1-min.jpg" alt="講師写真" />
                    </figure>
                    <div className="info-teacher">
                      <h2 className="teachers-name">佐藤 次郎</h2>
                      <h4 className="teachers-class">算数・理科</h4>
                      <h4 className="teachers-schools">
                        ●●中学卒業
                        <br />
                        ●●高等学校卒業
                        <br />
                        ●●大学●●学部卒業
                      </h4>
                    </div>
                  </div>
                  <div className="teachers-message">
                    <h3 className="teachers-message-text">
                      （数行のメッセージ）メッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッ
                    </h3>
                  </div>
                </div>

                <div className="teacher-container">
                  <div className="teacher-flex">
                    <figure className="img-teacher">
                      <img src="/img/img-teacher-1-min.jpg" alt="講師写真" />
                    </figure>
                    <div className="info-teacher">
                      <h2 className="teachers-name">山田 三郎</h2>
                      <h4 className="teachers-class">社会</h4>
                      <h4 className="teachers-schools">
                        ●●中学卒業
                        <br />
                        ●●高等学校卒業
                        <br />
                        ●●大学●●学部卒業
                      </h4>
                    </div>
                  </div>
                  <div className="teachers-message">
                    <h3 className="teachers-message-text">
                      （数行のメッセージ）メッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッ
                    </h3>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* 対象の生徒 */}
        <section id="students">
          <div className="students-ttl">
            <p>対象の生徒</p>
          </div>
          <div className="students-wrapper bg-note">
            <div className="students-sub-ttl">
              <p>学 年</p>
            </div>
            <h1>４～６年生</h1>

            <div className="students-sub-ttl">
              <p>教 科</p>
            </div>
            <h1>国語・算数・理科・社会</h1>
            <p className="p-students">※塾の制限は設けておりません。</p>
            <p className="padding-bug">A</p>
          </div>
        </section>

        {/* 保護者様の声 */}
        <section id="voice">
          <figure className="voice-ttl">
            <img src="/img/bg-voice-sp-1-min.png" alt="保護者様の声背景" />
          </figure>

          <div className="voice-wrapper">
            <div className="voice-container">
              <figure className="img-mother img-mother-left">
                <img src="/img/img-mother-1-min.png" alt="保護者1" />
              </figure>
              <div className="voice-text voice-text-right">
                <h3 className="ttl-voice-comment">
                  <b>5年生 男子 保護者</b>
                </h3>
                <h4 className="voice-comment">
                  オンラインでの個別指導は初めてだったので不安はありましたが、
                  まず通塾の時間がとられない点がとても良いです。そして画面共有で国語の文章が先生と共有できるので、子供がやりやすそうでした。
                  <br />
                  それだけでなく、こちらの要望を色々と聞いてくださる点がありがたかったです。
                </h4>
              </div>
            </div>

            <div className="voice-container">
              <div className="voice-text voice-text-left">
                <h3 className="ttl-voice-comment">
                  <b>6年生 女子 保護者</b>
                </h3>
                <h4 className="voice-comment">
                  コーチングは今やるべきことを教えて頂けるので無駄な悩みが減り、やるべきことがわかりました。
                  <br />
                  ティーチングの先生もとてもわかりやすく、子どもが楽しんで学べるようになりました。
                </h4>
              </div>
              <figure className="img-mother img-mother-right">
                <img src="/img/img-mother-2-min.png" alt="保護者2" />
              </figure>
            </div>

            <div className="voice-container">
              <figure className="img-mother img-mother-left">
                <img src="/img/img-mother-3-min.png" alt="保護者3" />
              </figure>
              <div className="voice-text voice-text-right">
                <h3 className="ttl-voice-comment">
                  <b>4年生 女子 保護者</b>
                </h3>
                <h4 className="voice-comment">
                  先生方の教え方がとても優しく、丁寧でした。
                  <br />
                  週間スケジュールなども、変更があるとすぐに修正してくれます。
                </h4>
              </div>
            </div>
          </div>
          <figure className="voice-ttl-2">
            <img src="/img/bg-voice-sp-2-min.png" alt="保護者様の声背景２" />
          </figure>
        </section>

        {/* 料金 */}
        <section id="price">
          <div className="price-wrapper bg-note">
            <p className="ttl-price">料 金</p>
            <p className="text-price">
              私たちGrowyでは、以下に全ての料金を明示いたします。
              塾業界ではホームページに料金を記載しない塾が多いですが、私たちは納得のいくサービスを提供するために掲示しています。
              <br />
              ここに記載のある料金以外は一切かかりません。
            </p>

            <div className="content-1-price">
              <p className="sub-ttl-price">入会料金</p>
            </div>
            <h2 className="content-2-price">10,000円</h2>

            <div className="content-1-price">
              <p className="sub-ttl-price">コーチング料金</p>
            </div>
            <h2 className="content-2-price">50,000円/月</h2>

            <div className="content-1-price">
              <p className="sub-ttl-price">ティーチング料金</p>
            </div>
            <h2 className="content-2-price">8,000円/コマ(80分)</h2>

            <div className="attention-container">
              <p className="attention-ttl">！注意事項！</p>

              <div className="atention-container-flex">
                <p className="asterisk">*</p>
                <p className="attention-text">
                  入会料金は、他のお客様からの紹介でご入会する際には無料となります。
                </p>
              </div>
              <div className="atention-container-flex">
                <p className="asterisk">*</p>

                <p className="attention-text">
                  コーチングのみ、またはティーチングのみも対応したします。
                </p>
              </div>
              <div className="atention-container-flex">
                <p className="asterisk">*</p>
                <p className="attention-text">
                  ティーチングは月4コマ以上を受講していただきます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ボタン */}
        <section className="btn-container">
          <figure>
            <a href="https://line.me/R/ti/p/@208okwey">
              <img
                className="btn-line"
                src="/img/img-btn-line-sp-min.png"
                alt="LINE登録はこちら"
              />
            </a>
          </figure>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="faq-ttl">
            <img src="/img/ttl-faq-sp-min.jpg" alt="よくあるご質問FAQ" />
          </div>

          <div className="faq-wrapper bg-note">
            <details className="accordion-faq-1">
              <summary>
                <h1>　サービス全般について　　　　▼</h1>
              </summary>
              <div className="faq-1-container">
                <details className="accordion-faq-2">
                  <summary>校舎はありませんか？</summary>
                  <p>現在は校舎を設けておりません。</p>
                </details>
                {/* 他の項目も同様に続く */}
              </div>
            </details>

            {/* 他の項目も同様に続く */}
          </div>
        </section>

        {/* 学長からのメッセージ */}
        <section id="message-2">
          <div className="message-2-ttl">
            <img
              src="/img/ttl-message-sp-min.jpg"
              alt="学長からあなたへのメッセージ"
            />
          </div>

          <div className="message-2-wrapper bg-note">
            <figure className="img-message-2">
              <img src="/img/img-teacher-yushin.jpg" alt="学長写真" />
            </figure>

            <div className="message-2-border">
              <h4 className="message-2-text-1">個別指導塾 Growy 学長</h4>
              <h2 className="message-2-text-2">ユウシン</h2>
              <div className="message-2-text-3">
                <h4 className="message-2-text-3-child">
                  「ホンネで中学受験」代表
                  <br />
                  現役中学受験塾講師・家庭教師
                </h4>
              </div>
            </div>
            <p className="message-2-text-4">
              みなさんは、中学受験を通して、お子さんのどのような未来を想像しますでしょうか。
              <br />
              充実した施設や学習環境で、すばらしい友人に囲まれ、部活に勉強にと楽しい中学高校生活をイメージする方も、大学受験での成功をイメージする方も、千差万別のイメージをお持ちのことと思います。
              <br />
              しかし、それは突き詰めていうと、お子さんが「幸せ」になれることを願ってのことではないでしょうか。
              <br />
              我々はお子さんの未来の「幸せ」を心の底から願っており、応援して、支えていきます。
              <br />
              そのために、「やり抜く力」と「学ぶ力」というのが非常に重要であると考えており、Growyでの学びを通して、未来を切り拓けるようになってもらいたいと思います。
              <br />
              ぜひ、一緒に最高の中学受験にしましょう！
            </p>
          </div>
        </section>

        {/* ボタン */}
        <section className="btn-container">
          <figure>
            <a href="https://line.me/R/ti/p/@208okwey">
              <img
                className="btn-line"
                src="/img/img-btn-line-sp-min.png"
                alt="LINE登録はこちら"
              />
            </a>
          </figure>
        </section>
      </main>
      <footer>
        <div className="footer-wrapper">
          <nav className="footer-nav-sp">
            <p className="p-footer">
              <a href="">特定商取引法に基づく表記</a>
            </p>
            <p className="p-footer">
              <a href="https://honnedechuju.com/%e5%80%8b%e5%88%a5%e6%8c%87%e5%b0%8e%e5%a1%begrowy-%e3%83%97%e3%83%a9%e3%82%a4%e3%83%90%e3%82%b7%e3%83%bc%e3%83%9d%e3%83%aa%e3%82%b7%e3%83%bc">
                プライバシーポリシー（個人情報保護方針）
              </a>
            </p>
            <p className="p-footer">© 2023 (株)Grabit.</p>
          </nav>
        </div>
      </footer>
    </>
  );
};
