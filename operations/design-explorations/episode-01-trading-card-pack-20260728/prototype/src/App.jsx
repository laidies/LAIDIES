import { useEffect, useState } from "react";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const cards = [
  {
    title: "Generative AI",
    image: "assets/cards/generative-ai-episode-art-v2.png",
    definition:
      "AI that produces content from your request and the material you give it—an email, image, summary, slide, song, video or piece of code.",
    picture:
      "Carrie Bradshaw with a brief. Give her the subject, audience, receipts and format; she can write the column. She cannot make the receipts true.",
    remember: "It can make the draft. It cannot make it true.",
    source: "Concepts 101",
    learnMore:
      "/library.html#concepts-101::1.%20Generative%20AI%20%E2%80%94%20makes",
    learnLabel: "OPEN IN CONCEPTS 101",
  },
  {
    title: "Model",
    image: "assets/cards/model-episode-art-v3.png",
    definition:
      "The trained component that turns an input into an output. It may produce words or images, interpret material, make a prediction or choose a next action.",
    picture:
      "A model can sit inside an app, API or coding tool. The product around it may add instructions, memory, search, files and other models.",
    remember: "A model is part of the experience—not the whole thing.",
    source: "Concepts 101",
    learnMore: "/library.html#concepts-101::Model%20%2F%20LLM",
    learnLabel: "OPEN IN CONCEPTS 101",
  },
  {
    title: "Hallucination",
    image: "assets/cards/hallucination-episode-art-v2.png",
    definition:
      "False or unsupported content delivered as part of an answer. It can be one invented citation or wrong date inside otherwise useful work.",
    picture:
      "The Burn Book: every entry was invented, every entry arrived with Regina George confidence—and the tone supplied no warning label.",
    remember: "Polished is a style. Evidence is a standard.",
    source: "Concepts 101 + Episode 03",
    learnMore:
      "/library.html#concepts-101::Why%20hallucinations%20happen",
    learnLabel: "OPEN IN CONCEPTS 101",
  },
  {
    title: "Participation Gap",
    image: "assets/cards/ai-adoption-gap-episode-art-v2.png",
    definition:
      "A difference in how often groups use a technology. Women currently use generative AI less often on average. That is a participation gap—not an ability gap.",
    picture:
      "People using AI help decide what gets built, rewarded and normalized. Fewer women using it means fewer women shaping those choices.",
    remember: "Women should not wait while AI is being shaped.",
    source: "HBS Working Paper 25-023 · May 2026",
    learnMore:
      "https://www.hbs.edu/ris/Publication%20Files/25-023_be8fb517-3dd5-40aa-97f9-4e42e1c8e6ff.pdf",
    learnLabel: "READ THE RECEIPT",
  },
];

const stickers = [
  { name: "Holo star", image: "assets/puffies/puffy-star-holo.png" },
  { name: "Lightning bolt", image: "assets/puffies/puffy-lightning-bolt-holo.png" },
  { name: "Holo heart", image: "assets/puffies/puffy-heart-holo.png" },
  { name: "Big ideas", image: "assets/puffies/puffy-word-big-ideas.png" },
  { name: "As if", image: "assets/puffies/puffy-word-as-if.png" },
];

const stickerPositions = [
  { left: "3%", top: "8%", rotate: "-11deg" },
  { left: "72%", top: "10%", rotate: "9deg" },
  { left: "4%", top: "70%", rotate: "7deg" },
  { left: "69%", top: "69%", rotate: "-8deg" },
  { left: "38%", top: "3%", rotate: "4deg" },
];

function Wordmark() {
  return (
    <img
      className="wordmark"
      src={asset("assets/brand/laidies-wordmark-final-b-light.svg")}
      alt="LAiDIES"
    />
  );
}

function CardBack({ card, index }) {
  return (
    <div
      className={`card-back ${card.title.length > 18 ? "has-long-title" : ""} ${
        card.title === "Participation Gap" ? "has-dense-copy" : ""
      }`}
    >
      <img src={asset("assets/cards/card-back-frame-v3.png")} alt="" />
      <div className="back-copy">
        <div className="back-heading">
          <p>
            EPISODE 01 · CARD {index + 1} OF {cards.length}
          </p>
          <h2>{card.title}</h2>
        </div>
        <div className="back-section">
          <span>IN PLAIN ENGLISH</span>
          <p>{card.definition}</p>
        </div>
        <div className="back-section back-picture">
          <span>PICTURE IT</span>
          <p>{card.picture}</p>
        </div>
        <div className="remember">
          <span>KEEP THIS</span>
          <strong>{card.remember}</strong>
        </div>
    </div>
  </div>
);
}

function CollectionCard({
  card,
  index,
  isFlipped,
  isCurrent,
  placed,
  onFlip,
  onRemoveSticker,
}) {
  return (
    <article
      className={`collection-card ${isFlipped ? "is-flipped" : ""} ${isCurrent ? "is-current" : ""}`}
    >
      <div className="collection-card-label">
        <span>CARD {index + 1} OF {cards.length}</span>
        <strong>{isFlipped ? "USEFUL SIDE" : "ART SIDE"}</strong>
      </div>

      <div className="flip-shell">
        <div className="card-flipper">
          <button
            className="card-face card-front"
            type="button"
            onClick={onFlip}
            aria-label={`Flip ${card.title} card to the back`}
          >
            <img src={asset(card.image)} alt={`${card.title} card front`} />
          </button>
          <div className="card-face card-reverse">
            <CardBack card={card} index={index} />
          </div>
        </div>

        <div className="sticker-layer" aria-label={`Puffies placed on ${card.title}`}>
          {placed.map((item) => (
            <button
              key={item.id}
              className="placed-sticker"
              type="button"
              style={{ left: item.left, top: item.top, rotate: item.rotate }}
              onClick={() => onRemoveSticker(item.id)}
              aria-label={`Remove ${item.name} sticker`}
            >
              <img src={asset(item.image)} alt="" />
            </button>
          ))}
        </div>
      </div>

      <button className="card-action" type="button" onClick={onFlip}>
        {isFlipped ? "SHOW THE FRONT" : "FLIP THIS CARD"}
      </button>
      {isFlipped && (
        <a
          className="card-learn-link"
          href={card.learnMore}
          target="_blank"
          rel="noreferrer"
        >
          {card.learnLabel} <b aria-hidden="true">→</b>
        </a>
      )}
    </article>
  );
}

function PackHeader() {
  return (
    <header className="pack-header">
      <a href="/?review=episode-01-pack">BACK TO EPISODE 01 PACK</a>
      <Wordmark />
      <button type="button" onClick={() => window.print()}>
        PRINT CARDS
      </button>
    </header>
  );
}

function OpeningExperience({ onFinish }) {
  const [opening, setOpening] = useState(false);

  const tearOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onFinish, 1450);
  };

  return (
    <section className={`opening-experience ${opening ? "is-opening" : ""}`}>
      <div className="opening-copy">
        <p>EPISODE 01 · TRADING CARD PACK</p>
        <h1>Ready to see what’s inside?</h1>
        <span>Tear open the foil pack. Then flip through four Episode 01 concepts worth keeping.</span>
      </div>

      <div className="foil-stage" aria-live="polite">
        <img
          src={asset(
            opening
              ? "assets/pack-opening/episode-01-foil-pack-open-v1.png"
              : "assets/pack-opening/episode-01-foil-pack-sealed-v1.png",
          )}
          alt={
            opening
              ? "The Episode 01 foil wrapper torn open with trading cards fanned out"
              : "A sealed Episode 01 On Wednesdays We Do AI foil trading-card pack"
          }
        />
      </div>

      <button className="tear-button" type="button" onClick={tearOpen} disabled={opening}>
        {opening ? "PACK OPENED — DEALING THE CARDS…" : "TEAR OPEN THE PACK"}
      </button>
    </section>
  );
}

export function App() {
  const [opened, setOpened] = useState(false);
  const [current, setCurrent] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);
  const [trayOpen, setTrayOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(0);
  const [placements, setPlacements] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("laidies-ep01-card-pack-v2");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const savedIndex = Number.isInteger(data.current) ? data.current : 0;
        setCurrent(Math.min(Math.max(savedIndex, 0), cards.length - 1));
        setPlacements(data.placements || {});
      } catch {
        // A damaged local save must never stop the pack opening.
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      "laidies-ep01-card-pack-v2",
      JSON.stringify({ current, placements }),
    );
  }, [current, hydrated, placements]);

  const flipCard = (index) => {
    setCurrent(index);
    setFlippedCard((value) => (value === index ? null : index));
  };

  const placeSticker = () => {
    const key = `${current}-${flippedCard === current ? "back" : "front"}`;
    setPlacements((value) => {
      const existing = value[key] || [];
      if (existing.length >= stickerPositions.length) return value;
      return {
        ...value,
        [key]: [
          ...existing,
          {
            ...stickers[selectedSticker],
            ...stickerPositions[existing.length],
            id: `${Date.now()}-${existing.length}`,
          },
        ],
      };
    });
  };

  const removeSticker = (id, index, side) => {
    const key = `${index}-${side}`;
    setPlacements((value) => ({
      ...value,
      [key]: (value[key] || []).filter((item) => item.id !== id),
    }));
  };

  return (
    <main className="pack" data-episode="01">
      <PackHeader />

      {!opened ? (
        <OpeningExperience onFinish={() => setOpened(true)} />
      ) : (
        <>
          <section className="collection-intro">
            <div>
              <p>EPISODE 01 · ON WEDNESDAYS WE DO AI</p>
              <h1>The full pack.</h1>
            </div>
            <span>All four fronts are here. Select any card to turn it over and return to the episode or its supporting receipt.</span>
          </section>

          <section className="card-gallery" aria-label="Episode 01 trading-card collection">
            {cards.map((card, index) => {
              const side = flippedCard === index ? "back" : "front";
              return (
                <CollectionCard
                  key={card.title}
                  card={card}
                  index={index}
                  isFlipped={flippedCard === index}
                  isCurrent={current === index}
                  placed={placements[`${index}-${side}`] || []}
                  onFlip={() => flipCard(index)}
                  onRemoveSticker={(id) => removeSticker(id, index, side)}
                />
              );
            })}
          </section>

          <section className="collection-tools">
            <div className="puffy-heading">
              <div>
                <p>SELECTED CARD</p>
                <h2>{current + 1} · {cards[current].title}</h2>
              </div>
              <div className="utility-actions">
                <span>Changes save automatically in this preview.</span>
                <button type="button" onClick={() => setTrayOpen((value) => !value)}>
                  {trayOpen ? "CLOSE PUFFIES" : "ADD A PUFFY"}
                </button>
              </div>
            </div>
            {trayOpen && (
              <aside className="sticker-tray" aria-label="Puffy sticker drawer">
                <div>
                  <p>YOUR PUFFY DRAWER</p>
                  <span>Choose one and place it on this side. Tap a placed Puffy to remove it.</span>
                </div>
                <div className="sticker-options">
                  {stickers.map((sticker, index) => (
                    <button
                      key={sticker.name}
                      type="button"
                      className={selectedSticker === index ? "selected" : ""}
                      onClick={() => setSelectedSticker(index)}
                      aria-label={`Choose ${sticker.name}`}
                    >
                      <img src={asset(sticker.image)} alt="" />
                    </button>
                  ))}
                </div>
                <button type="button" onClick={placeSticker}>
                  PLACE {stickers[selectedSticker].name.toUpperCase()}
                </button>
              </aside>
            )}
          </section>

          <section className="print-backs" aria-hidden="true">
            {cards.map((card, index) => (
              <CardBack card={card} index={index} key={card.title} />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
