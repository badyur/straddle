import Image from "next/image";

const TELEGRAM_CHANNEL = "https://t.me/pokerclubnuts";

const TELEGRAM_CONTACT =
  "https://t.me/ThenutsclubB?text=" +
  encodeURIComponent(
    "Привет! Пришёл с сайта nuts-club.ru, хочу узнать про игру."
  );

const CLUB_ADDRESS = "ш. Энтузиастов, 32Б, Балашиха";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="heroNoise" />

        <div className="heroPhoto">
          <Image
            src="/yura.jpg"
            alt="The NUTS Club — покер в Балашихе"
            fill
            priority
            sizes="100vw"
            className="heroImage"
          />
          <div className="heroShade" />
        </div>

        <div className="heroTop">
          <span>THE NUTS CLUB</span>
          <span>БАЛАШИХА · 2026</span>
        </div>

        <div className="heroContent">
          <p className="eyebrow">THE NUTS CLUB ПРЕДСТАВЛЯЕТ</p>

          <h1 className="heroTitle">
            <span>ЮРА</span>
            <span>В РУБАШКЕ</span>
          </h1>

          <p className="heroLead">
            Покер в Балашихе настолько серьёзный,
            <br />
            насколько позволяет эта фотография.
          </p>

          <div className="heroActions">
            <a
              href={TELEGRAM_CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="button buttonPrimary"
            >
              ХОЧУ НА ИГРУ →
            </a>

            <a
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="button buttonGhost"
            >
              TELEGRAM КЛУБА
            </a>
          </div>
        </div>

        <div className="heroBottom">
          <span>♠</span>
          <span>Снято без применения ИИ</span>
          <span>♥</span>
        </div>
      </section>

      {/* CINEMATIC STATEMENT */}
      <section className="statement">
        <div className="giantSuit" aria-hidden="true">
          ♠
        </div>

        <div className="statementInner">
          <p className="sectionLabel">THE NUTS CLUB / BALASHIKHA</p>

          <div className="statementLines">
            <p>ОДИН ГОРОД.</p>
            <p>НЕСКОЛЬКО СТОЛОВ.</p>
            <p className="gold">ОДНА РУБАШКА.</p>
          </div>

          <p className="statementFootnote"></p>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="sectionHeader">
          <p className="sectionLabel">01 / ОСНОВНЫЕ ПРЕИМУЩЕСТВА</p>
          <h2>Почему The NUTS Club?</h2>
        </div>

        <div className="reasons">
          <Reason number="01" suit="♠" text="Регулярные игры" />
          <Reason number="02" suit="♥" text="Новые знакомства" />
          <Reason number="03" suit="♦" text="Дружеская атмосфера" />
          <Reason
            number="04"
            suit="♣"
            text="Юра иногда приходит в рубашке"
            special
          />
        </div>
      </section>

      {/* REAL CLUB INFO */}
      <section className="clubInfo">
        <div className="clubInfoLeft">
          <p className="sectionLabel">02 / НЕМНОГО СЕРЬЁЗНОСТИ</p>

          <h2>
            ПОКЕР
            <br />
            В БАЛАШИХЕ
          </h2>
        </div>

        <div className="clubInfoRight">
          <p className="bigCopy">
            The NUTS Club — сообщество людей, которым нравится покер.
          </p>

          <p>
            Собираемся играть, общаться, разбирать раздачи и хорошо проводить
            время. Можно прийти одному, можно с друзьями. Опыт не является
            обязательным условием.
          </p>

          <div className="infoRule" />

          <div className="infoGrid">
            <div>
              <span className="infoLabel">ФОРМАТ</span>
              <strong>Без денежных ставок</strong>
            </div>

            <div>
              <span className="infoLabel">ГЕОГРАФИЯ</span>
              <strong>Балашиха</strong>
            </div>

            <div>
              <span className="infoLabel">АДРЕС</span>
              <strong>{CLUB_ADDRESS}</strong>
            </div>
          </div>

          <a
            href={TELEGRAM_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="textLink"
          >
            ПЕРЕЙТИ В TELEGRAM КЛУБА →
          </a>
        </div>
      </section>

      {/* YURA LEGEND */}
      <section className="quoteSection">
        <div className="quoteSuit" aria-hidden="true">
          ♠
        </div>

        <p className="sectionLabel">Стильный Юра</p>

        <h2 className="legendTitle">
          Юра
          <br />
          ЗА СТОЛОМ.
          <br />
          <span>ИНОГДА ДАЖЕ В РУБАШКЕ.</span>
        </h2>

        <p className="legendDescription">
          В The NUTS Club играют самые разные люди. Некоторые приходят за
          победой. Другие за общением. Юра однажды пришёл в рубашке, и теперь
          про это есть сайт.
        </p>

        <p className="legendCaption">ПОСЛЕДСТВИЯ ОДНОЙ ФОТОГРАФИИ</p>
      </section>

      {/* FINAL CTA */}
      <section className="finalCta">
        <div className="finalTop">
          <span>03 / ВАШ ХОД</span>
          <span>♠ ♥ ♦ ♣</span>
        </div>

        <h2>
          ХОЧЕШЬ
          <br />
          СЫГРАТЬ?
        </h2>

        <div className="finalCopy">
          <p>Необязательно иметь рубашку.</p>
          <p>Необязательно быть Юрой.</p>
          <p>Достаточно любить покер.</p>

          <p className="dogLine">Ты даже можешь быть собакой.*</p>
        </div>

        <a
          href={TELEGRAM_CONTACT}
          target="_blank"
          rel="noopener noreferrer"
          className="finalButton"
        >
          <span>УЗНАТЬ О БЛИЖАЙШЕЙ ИГРЕ</span>
          <span className="arrow">→</span>
        </a>

        <p className="dogDisclaimer">
          * Участие собак необходимо предварительно согласовать с
          организаторами.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <strong>THE NUTS CLUB</strong>
          <span>Покер в Балашихе</span>
        </div>

        <div className="footerCenter">♠</div>

        <div className="footerRight">
          <span>{CLUB_ADDRESS}</span>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}

function Reason({
  number,
  suit,
  text,
  special = false,
}: {
  number: string;
  suit: string;
  text: string;
  special?: boolean;
}) {
  return (
    <div className={`reason ${special ? "reasonSpecial" : ""}`}>
      <span className="reasonNumber">{number}</span>
      <span className="reasonSuit">{suit}</span>
      <span className="reasonText">{text}</span>
      <span className="reasonArrow">↗</span>
    </div>
  );
}