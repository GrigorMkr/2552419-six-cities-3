type PremiumMarkProps = {
  className?: string;
  variant?: 'card' | 'offer';
}

function PremiumMark({className = '', variant = 'card'}: PremiumMarkProps): JSX.Element {
  const markClass = variant === 'offer' ? 'offer__mark' : 'place-card__mark';

  return (
    <div className={`${markClass} ${className}`}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;

