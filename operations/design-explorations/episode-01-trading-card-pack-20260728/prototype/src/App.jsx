import { useEffect, useRef, useState } from "react";
import deck from "../../../../episode-editorial-review-2026-09-06/episode-01/flashcards.json";
import { useCardBinder } from "./useCardBinder.js";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const art = ['generative-ai-episode-art-v2.png','model-episode-art-v3.png','hallucination-episode-art-v2.png','ai-adoption-gap-episode-art-v2.png'];
const cards = deck.cards.map((card,index)=>({...card,title:card.front,image:`assets/cards/${art[index]}`,definition:card.back,picture:card.example,remember:card.recallPrompt}));

function Wordmark() {
  return <a className="brand-wordmark" data-brand-wordmark="current-live-jost" href="/blend-snap.html#episode-01-pack" aria-label="LAiDIES Study Packs">L<span className="brand-ai">A</span><span className="brand-i-wrap"><span className="brand-ai">ı</span><span className="brand-i-dot" aria-hidden="true" /></span>DIES</a>;
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
          <span>TEST YOUR RECALL</span>
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
  onFlip,
}) {
  const actionRef=useRef(null);
  useEffect(()=>{if(isFlipped)actionRef.current?.focus({preventScroll:true});},[isFlipped]);
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
            aria-hidden={isFlipped}
            tabIndex={isFlipped ? -1 : 0}
            type="button"
            onClick={onFlip}
            aria-label={`Flip ${card.title} card to the back`}
          >
            <img src={asset(card.image)} alt={`${card.title} card front`} />
          </button>
          <div className="card-face card-reverse" aria-hidden={!isFlipped}>
            <CardBack card={card} index={index} />
          </div>
        </div>

      </div>

      <p className="recall-question">{card.recallPrompt}</p>
      <button ref={actionRef} className="card-action" type="button" onClick={onFlip}>
        {isFlipped ? "SHOW THE FRONT" : "FLIP THIS CARD"}
      </button>
    </article>
  );
}

function PackHeader({canPrint=true}) {
  return (
    <header className="pack-header">
      <a href="/blend-snap.html#episode-01-pack">BACK TO EPISODE 01 PACK</a>
      <Wordmark />
      {canPrint && <button type="button" onClick={() => window.print()}>
        PRINT CARDS
      </button>}
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
  const requested = new URLSearchParams(location.search).get('version');
  if (requested !== null && requested !== deck.version) return <main className="pack"><PackHeader canPrint={false} /><section className="collection-intro"><div><h1>This saved edition cannot be opened here.</h1><p>Your saved cards have not been changed.</p><a href="/laidies-card.html#episodeBinderVessel">Return to my Episode Binder</a></div></section></main>;
  return <CardPack />;
}

function CardPack() {
  const [opened, setOpened] = useState(new URLSearchParams(location.search).get("version") === deck.version);
  const [current, setCurrent] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);
  const binder = useCardBinder(cards, deck.version);
  const flipCard = (index) => {
    setCurrent(index);
    setFlippedCard((value) => (value === index ? null : index));
  };

  return (
    <main className="pack" data-episode="01" data-clarity-mask="True">
      <PackHeader />
      <section className="card-binder-actions" aria-label="Save trading cards">
        <p role="status">{binder.message}</p>
        <button type="button" onClick={binder.save} disabled={binder.busy}>{binder.retry ? 'RETRY CARD SAVE' : 'SAVE ALL FOUR TO MY BINDER'}</button>
        <button type="button" onClick={binder.refresh} disabled={binder.busy}>CHECK SAVED CARDS</button>
        {binder.guest && <a href="/laidies-card.html" target="_blank" rel="noreferrer">SIGN IN AT MY CLOSET</a>}
        <a href="/laidies-card.html#episodeBinderVessel">OPEN MY EPISODE BINDER</a>
      </section>

      {!opened ? (
        <OpeningExperience onFinish={() => setOpened(true)} />
      ) : (
        <>
          <section className="collection-intro">
            <div>
              <p>EPISODE 01 · ON WEDNESDAYS WE DO AI</p>
              <h1>The full pack.</h1>
            </div>
            <span>Read the question beneath a card and try an answer before you flip it. Then check the explanation.</span>
          </section>

          <section className="card-gallery" aria-label="Episode 01 trading-card collection">
            {cards.map((card, index) => {
              return (
                <CollectionCard
                  key={card.title}
                  card={card}
                  index={index}
                  isFlipped={flippedCard === index}
                  isCurrent={current === index}
                  onFlip={() => flipCard(index)}

                />
              );
            })}
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
