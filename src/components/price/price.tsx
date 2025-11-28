type PriceProps = {
  value: number;
  className?: string;
  showText?: boolean;
  variant?: 'card' | 'offer';
}

function Price({value, className = '', showText = true, variant = 'card'}: PriceProps): JSX.Element {
  const priceClass = variant === 'offer' ? 'offer__price' : 'place-card__price';
  const valueClass = variant === 'offer' ? 'offer__price-value' : 'place-card__price-value';
  const textClass = variant === 'offer' ? 'offer__price-text' : 'place-card__price-text';

  return (
    <div className={`${priceClass} ${className}`}>
      <b className={valueClass}>&euro;{value}</b>
      {showText && (
        <span className={textClass}>
          {variant === 'offer' ? '\u00A0night' : '/\u00A0night'}
        </span>
      )}
    </div>
  );
}

export default Price;

