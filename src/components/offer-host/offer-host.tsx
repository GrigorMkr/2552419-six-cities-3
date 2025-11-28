type OfferHostProps = {
  name: string;
  avatarUrl: string;
  isPro?: boolean;
  description: string[];
}

function OfferHost({name, avatarUrl, isPro = false, description}: OfferHostProps): JSX.Element {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className={`offer__avatar-wrapper user__avatar-wrapper ${isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
          <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {name}
        </span>
        {isPro && (
          <span className="offer__user-status">
            Pro
          </span>
        )}
      </div>
      <div className="offer__description">
        {description.map((text) => (
          <p key={text} className="offer__text">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default OfferHost;

