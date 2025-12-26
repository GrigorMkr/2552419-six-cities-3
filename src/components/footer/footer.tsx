import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/image-url';
import { AppRoute } from '../../constants';

const FOOTER_LOGO = {
  WIDTH: 64,
  HEIGHT: 33,
} as const;

const Footer: FC = () => (
  <footer className="footer container">
    <Link className="footer__logo-link" to={AppRoute.Main}>
      <img className="footer__logo" src={getImageUrl('img/logo.svg')} alt="6 cities logo" width={FOOTER_LOGO.WIDTH} height={FOOTER_LOGO.HEIGHT} />
    </Link>
  </footer>
);

export default Footer;

