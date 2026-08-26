import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">

      {/* ================= HERO ================= */}
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

          {/* ================= ТЕКСТ ================= */}
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
              <span className="text-[#d2a15e]">Балашиха</span>
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
              Сообщество для тех, кто любит покерный вайб,
              стратегию игры и новые знакомства.
            </p>

            <p className="mt-3 font-semibold text-white">
              Без азарта и ставок.
            </p>

            {/* Кнопки */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <a
                href="https://t.me/ThenutsclubB"
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
                Присоединиться
              </a>

              <a
                href="https://t.me/pokerclubnuts"
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

          {/* ================= ФОТО ЮРЫ ================= */}
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
              alt="Покер в Балашихе — The NUTS Club"
              fill
              priority
              className="object-cover object-[50%_42%]"
            />

            {/* Затемнение слева */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#070708]/70
                via-transparent
                to-transparent
                lg:from-[#070708]/35
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

            {/* Подпись на фотографии */}
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

      {/* ================= ПРЕИМУЩЕСТВА ================= */}
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
            text="Собираемся за столом, играем турниры и развиваем своё мастерство."
          />

          <Feature
            symbol="♦"
            title="Игра ради игры"
            text="Без денежных призов и ставок. В центре — стратегия, соревнование и удовольствие."
          />

          <Feature
            symbol="♣"
            title="Люди и атмосфера"
            text="Новые знакомства, живое общение и локальное покерное сообщество."
          />
        </div>
      </section>

      {/* ================= О КЛУБЕ ================= */}
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
              Покерный клуб
              <br />
              в Балашихе
            </h2>
          </div>

          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-white/65">
            <p>
              Мы собираем людей, которым интересен спортивный покер:
              от тех, кто только начинает разбираться в игре, до опытных игроков.
            </p>

            <p>
              Здесь можно играть, обсуждать раздачи, пробовать новые стратегии
              и просто проводить вечер в хорошей компании.
            </p>

            <p className="font-semibold text-white">
              Главное — уважение друг к другу и удовольствие от игры.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ШУТОЧНЫЙ БЛОК ================= */}
      <section className="px-6 pb-24 lg:px-10">
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

      {/* ================= FAQ ================= */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-10">
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
              answer="Игры проходят в Балашихе. Актуальное место и время публикуются в Telegram-канале клуба."
            />

            <FAQ
              question="Можно ли прийти новичку?"
              answer="Да. Если базовые правила пока незнакомы, лучше предупредить организаторов заранее — перед игрой помогут разобраться."
            />

            <FAQ
              question="Играете на деньги?"
              answer="Нет. Игры клуба не предусматривают денежного призового фонда или ставок между игроками."
            />

            <FAQ
              question="Как записаться?"
              answer="Напишите организаторам в Telegram или следите за анонсами ближайших игр в канале клуба."
            />

          </div>
        </div>
      </section>

      {/* ================= ФИНАЛЬНЫЙ CTA ================= */}
      <section className="px-6 pb-24 lg:px-10">
        <div
          className="
            mx-auto
            max-w-7xl
            rounded-[28px]
            bg-[#b70f11]
            px-8
            py-12
            sm:px-12
          "
        >
          <div
            className="
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

              <div className="mt-2 text-white/75">
                Следите за расписанием ближайших игр в Telegram.
              </div>
            </div>

            <a
              href="https://t.me/pokerclubnuts"
              target="_blank"
              rel="noopener noreferrer"
              className="
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
              Открыть Telegram
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}


/* ================= ДОПОЛНИТЕЛЬНЫЕ КОМПОНЕНТЫ ================= */

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