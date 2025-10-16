const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm opacity-70 md:flex-row">
        <span>
          © {new Date().getFullYear()} Rémi CAZIN - Tous droits réservés.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
