interface EncabezadoMesaProps {
  mesa: number | null;
}

export function EncabezadoMesa({ mesa }: EncabezadoMesaProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div>
          <span className="site-header__eyebrow">
            Cafetería Origen
          </span>

          <h1 className="site-header__title">
            {mesa !== null
              ? `Mesa ${mesa}`
              : "Mesa no identificada"}
          </h1>

          <p className="site-header__subtitle">
            Elegí tus productos y confirmá el pedido desde tu mesa.
          </p>
        </div>

        <div className="site-header__badge">
          {mesa !== null ? `Mesa ${mesa}` : "Sin mesa"}
        </div>
      </div>
    </header>
  );
}