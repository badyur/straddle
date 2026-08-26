import Image from "next/image";

/* =========================================================
   НАСТРОЙКИ САЙТА
   Если поменяется Telegram или адрес — меняем здесь
   ========================================================= */

const TELEGRAM_CHANNEL = "https://t.me/pokerclubnuts";

const TELEGRAM_CONTACT =
  "https://t.me/ThenutsclubB?text=" +
  encodeURIComponent(
    "Привет! Пришёл с сайта nuts-club.ru, хочу узнать про игру."
  );

const CLUB_ADDRESS = "ш. Энтузиастов, 32Б, Балашиха";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="relative min-h-[760px] overflow-hidden border-b border-white/10">

        {/* Фоновое золотое свечение */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(210,161,94,0.15),transparent_36%)]" />

        {/* Большая декоративная пика */}
        <div
          className="
            absolute
            right-[6%]
            top-[4%]
            text-[420px]
            leading-none
            text-[#d2a15e]/[0.04]
            select-none
            pointer-events-none
          "
        >
          ♠
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            min-h-[760px]
            max-w-7xl
            grid-cols-1
            items-center
            gap-10
            px-6
            py-14
            lg:grid-cols-[0.9fr_1.1fr]
            lg:px-10
            lg:py-16
          "
        >

          {/* =================================================
              HERO — ТЕКСТ
              ================================================= */}
          <div className="relative z-20">

            <div className="mb-8 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#d2a15e]">
              <span>♠</span>
              <span>The NUTS Club</span>
            </div>

            <h1
              className="
                max-w-[700px]
                text-[58px]
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.045em]
                sm:text-[76px]
                lg:text-[102px]
              "
            >
              Покер
              <br />

              <span className="text-[#d2a15e]">
                Балашиха
              </span>
            </h1>

            <p
              className="
                mt-8
                max-w-xl
                text-lg
                leading-relaxed
                text-white/70
                sm:text-xl
              "
            >
              Сообщество любителей спортивного покера в Балашихе.
              Играем, общаемся, разбираем раздачи и знакомимся
              с людьми, которым тоже нравится покер.
            </p>

            <p className="mt-4 font-semibold text-white">
              Без денежных ставок.
            </p>

            {/* Адрес */}
            <div className="mt-6 flex items-start gap-3 text-white/65">
              <span className="text-[#d2a15e]">
                ●
              </span>

              <div>
                <div className="text-sm uppercase tracking-[0.12em] text-white/40">
                  Балашиха
                </div>

                <div className="mt-1 text-white/80">
                  {CLUB_ADDRESS}
                </div>
              </div>
            </div>

            {/* Основные кнопки */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <a
                href={TELEGRAM_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#b70f11]
                  px-7
                  py-4
                  font-bold
                  transition
                  hover:-translate-y-0.5
                  hover:bg-[#d31619]
                "
              >
                Хочу на игру
              </a>

              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/20
                  px-7
                  py-4
                  font-semibold
                  text-white/85
                  transition
                  hover:border-[#d2a15e]
                  hover:text-[#d2a15e]
                "
              >
                Telegram клуба
              </a>

            </div>
          </div>


          {/* =================================================
              HERO — ФОТО ЮРЫ
              ================================================= */}
          <div
            className="
              relative
              h-[500px]
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-[#111]
              sm:h-[600px]
              lg:h-[680px]
            "
          >

            <Image
              src="/yura.jpg"
              alt="Спортивный покер в Балашихе — The NUTS Club"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-[50%_42%]"
            />

            {/* Затемнение слева */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#070708]/65
                via-transparent
                to-transparent
                lg:from-[#070708]/30
              "
            />

            {/* Затемнение снизу */}
            <div
              className="
                absolute
                inset-x-0
                bottom-0
                h-56
                bg-gradient-to-t
                from-black
                via-black/55
                to-transparent
              "
            />

            {/* Подпись */}
            <div className="absolute bottom-7 left-7 right-7">

              <div className="text-xs uppercase tracking-[0.25em] text-[#d2a15e]">
                The NUTS Club
              </div>

              <div className="mt-1 text-2xl font-bold">
                Здесь начинается раздача
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          КОРОТКО О ФОРМАТЕ
          ===================================================== */}
      <section className="border-b border-white/10">

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            divide-y
            divide-white/10
            px-6
            md:grid-cols-3
            md:divide-x
            md:divide-y-0
            lg:px-10
          "
        >

          <Feature
            symbol="♠"
            title="Регулярные игры"
            text="Собираемся за одним столом и играем турниры в спортивном формате."
          />

          <Feature
            symbol="♦"
            title="Покер ради покера"
            text="Главное — стратегия, соревнование, интересные раздачи и удовольствие от игры."
          />

          <Feature
            symbol="♣"
            title="Новые знакомства"
            text="Здесь собираются люди из Балашихи и рядом, которым нравится покерная атмосфера."
          />

        </div>
      </section>


      {/* =====================================================
          О СООБЩЕСТВЕ
          ===================================================== */}
      <section className="px-6 py-24 lg:px-10">

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-12
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >

          <div>

            <div className="text-sm uppercase tracking-[0.25em] text-[#d2a15e]">
              The NUTS Club
            </div>

            <h2
              className="
                mt-4
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                sm:text-5xl
              "
            >
              Спортивный покер
              <br />
              в Балашихе
            </h2>

          </div>


          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-white/65">

            <p>
              The NUTS Club — локальное сообщество людей,
              которым интересен спортивный покер.
              Здесь встречаются и опытные игроки,
              и те, кто только начинает разбираться в игре.
            </p>

            <p>
              За столом можно проверить свою стратегию,
              посмотреть на игру других участников,
              обсудить интересные раздачи и просто хорошо
              провести время в компании людей с общим интересом.
            </p>

            <p>
              Мы находимся в Балашихе по адресу{" "}
              <strong className="font-semibold text-white">
                {CLUB_ADDRESS}
              </strong>.
            </p>

            <p className="font-semibold text-white">
              Главное — уважение друг к другу и удовольствие от игры.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          КАК ПРОХОДЯТ ИГРЫ
          ===================================================== */}
      <section className="border-y border-white/10 bg-white/[0.018] px-6 py-24 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <div className="text-sm uppercase tracking-[0.25em] text-[#d2a15e]">
              Формат
            </div>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Как всё проходит
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-white/60">
              Никакого сложного вступления в клуб.
              Узнаёте дату ближайшей игры, связываетесь
              с организатором и приходите за стол.
            </p>

          </div>


          <div className="mt-14 grid gap-4 md:grid-cols-3">

            <Step
              number="01"
              title="Связываетесь с нами"
              text="Напишите в Telegram и узнайте дату и время ближайшей игры."
            />

            <Step
              number="02"
              title="Приходите на игру"
              text={`Встречаемся в Балашихе: ${CLUB_ADDRESS}.`}
            />

            <Step
              number="03"
              title="Садитесь за стол"
              text="Играете, знакомитесь с участниками и получаете тот самый покерный вайб."
            />

          </div>


          <div className="mt-10">

            <a
              href={TELEGRAM_CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-[#b70f11]
                px-7
                py-4
                font-bold
                transition
                hover:-translate-y-0.5
                hover:bg-[#d31619]
              "
            >
              Узнать о ближайшей игре
            </a>

          </div>

        </div>
      </section>


      {/* =====================================================
          ШУТОЧНЫЙ БЛОК
          ===================================================== */}
      <section className="px-6 py-24 lg:px-10">

        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[28px]
            border
            border-[#d2a15e]/30
            bg-[#0d0d0e]
            p-8
            sm:p-12
          "
        >

          <div className="text-5xl text-[#d2a15e]">
            ♠
          </div>

          <blockquote
            className="
              mt-7
              max-w-4xl
              text-3xl
              font-semibold
              leading-tight
              tracking-tight
              sm:text-5xl
            "
          >
            «Карты раздаём.
            <br />

            За решения игроков{" "}

            <span className="text-[#d2a15e]">
              ответственности не несём.
            </span>
            »
          </blockquote>

          <div className="mt-8 text-white/45">
            The NUTS Club, Балашиха
          </div>

        </div>
      </section>


      {/* =====================================================
          АДРЕС
          ===================================================== */}
      <section className="border-y border-white/10 px-6 py-20 lg:px-10">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            justify-between
            gap-10
            md:flex-row
            md:items-center
          "
        >

          <div>

            <div className="text-sm uppercase tracking-[0.25em] text-[#d2a15e]">
              Где играем
            </div>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Балашиха
            </h2>

            <p className="mt-3 text-xl text-white/65">
              {CLUB_ADDRESS}
            </p>

          </div>


          <a
            href={TELEGRAM_CONTACT}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[#d2a15e]/40
              px-7
              py-4
              font-semibold
              text-[#d2a15e]
              transition
              hover:bg-[#d2a15e]
              hover:text-black
            "
          >
            Связаться с организатором
          </a>

        </div>
      </section>


      {/* =====================================================
          FAQ
          ===================================================== */}
      <section className="px-6 py-24 lg:px-10">

        <div className="mx-auto max-w-4xl">

          <div className="text-sm uppercase tracking-[0.25em] text-[#d2a15e]">
            Частые вопросы
          </div>

          <h2 className="mt-4 text-4xl font-bold">
            Перед первой игрой
          </h2>


          <div className="mt-10 space-y-4">

            <FAQ
              question="Где проходят игры?"
              answer={`Игры проходят в Балашихе по адресу: ${CLUB_ADDRESS}. Дату и время ближайшей встречи лучше уточнить у организатора.`}
            />

            <FAQ
              question="Можно ли прийти новичку?"
              answer="Да. Необязательно быть опытным игроком. Если вы только знакомитесь с покером, предупредите об этом заранее."
            />

            <FAQ
              question="Играете на деньги?"
              answer="Формат сообщества ориентирован на спортивный покер, общение и соревновательную составляющую без денежных ставок между игроками."
            />

            <FAQ
              question="Нужно ли записываться заранее?"
              answer="Лучше написать организатору перед игрой, чтобы уточнить дату, время и наличие свободного места за столом."
            />

            <FAQ
              question="Как узнать о следующих играх?"
              answer="Анонсы можно смотреть в Telegram-канале The NUTS Club или уточнить всё напрямую у организатора."
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
          ===================================================== */}
      <section className="px-6 pb-24 lg:px-10">

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[28px]
            bg-[#b70f11]
            px-8
            py-12
            sm:px-12
            sm:py-14
          "
        >

          {/* декоративная пика */}
          <div
            className="
              absolute
              -bottom-24
              right-4
              text-[260px]
              leading-none
              text-black/[0.08]
              select-none
              pointer-events-none
            "
          >
            ♠
          </div>


          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-start
              justify-between
              gap-8
              md:flex-row
              md:items-center
            "
          >

            <div>

              <div className="text-3xl font-bold sm:text-4xl">
                Увидимся за столом?
              </div>

              <div className="mt-3 max-w-xl text-white/75">
                Напишите нам — расскажем о ближайшей игре
                и ответим на вопросы.
              </div>

            </div>


            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

              <a
                href={TELEGRAM_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  px-7
                  py-4
                  font-bold
                  text-black
                  transition
                  hover:-translate-y-0.5
                "
              >
                Написать организатору
              </a>

              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/30
                  px-7
                  py-4
                  font-semibold
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                Telegram клуба
              </a>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          FOOTER
          ===================================================== */}
      <footer className="border-t border-white/10 px-6 py-10 lg:px-10">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            justify-between
            gap-5
            text-sm
            text-white/35
            sm:flex-row
            sm:items-center
          "
        >

          <div>
            © The NUTS Club
          </div>

          <div>
            Покер в Балашихе · {CLUB_ADDRESS}
          </div>

        </div>

      </footer>

    </main>
  );
}


/* =========================================================
   ДОПОЛНИТЕЛЬНЫЕ КОМПОНЕНТЫ
   ========================================================= */

function Feature({
  symbol,
  title,
  text,
}: {
  symbol: string;
  title: string;
  text: string;
}) {
  return (
    <div className="px-0 py-10 md:px-8 lg:px-10">

      <div className="text-3xl text-[#d2a15e]">
        {symbol}
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 max-w-sm leading-relaxed text-white/55">
        {text}
      </p>

    </div>
  );
}


function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#0d0d0e]
        p-7
      "
    >

      <div className="text-sm font-bold tracking-[0.2em] text-[#d2a15e]">
        {number}
      </div>

      <h3 className="mt-7 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-relaxed text-white/55">
        {text}
      </p>

    </div>
  );
}


function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.025]
        p-6
      "
    >

      <h3 className="text-lg font-semibold">
        {question}
      </h3>

      <p className="mt-2 leading-relaxed text-white/55">
        {answer}
      </p>

    </div>
  );
}