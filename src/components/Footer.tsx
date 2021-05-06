import '../styles/footer.scss';
export function Footer() {
  return (
    <footer>
      <div>
        Feito com{' '}
        <span role="img" aria-label="coração" className="footer-emoji-heart">
          ❤
        </span>{' '}
        por{' '}
        <a href="http://diogomiranda.dev.br/" target="__blank">
          Diogo Miranda
        </a>
        <br />
        Direitos de imagem para{' '}
        <a href="https://rocketseat.com.br/" target="__blank">
          rocketseat.com.br
        </a>{' '}
      </div>
    </footer>
  );
}
