import { marqueeItems } from "../content";

/** One repeat of the track; duplicated so the translate can loop seamlessly. */
function Track() {
  return (
    <div className="ribbon-track" aria-hidden="true">
      {marqueeItems.map((item) => (
        <span className="ribbon-item" key={item}>
          {item}
          <i className="ribbon-star">✳</i>
        </span>
      ))}
    </div>
  );
}

export function Ribbon() {
  return (
    <div className="ribbon-zone" aria-hidden="true">
      <div className="ribbon-band ribbon-a">
        <div className="ribbon-inner">
          <Track />
          <Track />
        </div>
      </div>
      <div className="ribbon-band ribbon-b">
        <div className="ribbon-inner">
          <Track />
          <Track />
        </div>
      </div>
    </div>
  );
}
