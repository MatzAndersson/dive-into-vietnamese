import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t, i18n } = useTranslation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-semibold text-brand-orange"
      : "font-medium text-brand-dark transition hover:text-brand-orange";

  const getLanguageButtonClass = (language: string) =>
    `cursor-pointer rounded-lg border px-3 py-1 text-sm font-semibold transition ${
      i18n.language.startsWith(language)
        ? "border-brand-blue bg-brand-blue text-white"
        : "border-brand-blue/20 bg-white text-brand-blue hover:border-brand-orange hover:text-brand-orange"
    }`;

  return (
    <header className="border-b border-brand-blue/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink
          to="/"
          className="font-heading text-lg font-bold text-brand-blue transition hover:text-brand-orange"
        >
          Dive Into Vietnamese
        </NavLink>

        <nav className="flex gap-4 text-sm">
          <NavLink to="/" className={getLinkClass}>
            {t("nav.home")}
          </NavLink>

          <NavLink to="/levels/beginner" className={getLinkClass}>
            {t("nav.beginner")}
          </NavLink>

          <NavLink to="/levels/intermediate" className={getLinkClass}>
            {t("nav.intermediate")}
          </NavLink>

          <NavLink to="/levels/advanced" className={getLinkClass}>
            {t("nav.advanced")}
          </NavLink>

          <NavLink to="/login" className={getLinkClass}>
            {t("nav.signIn")}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => i18n.changeLanguage("en")}
            className={getLanguageButtonClass("en")}
          >
            EN
          </button>

          <button
            type="button"
            onClick={() => i18n.changeLanguage("vi")}
            className={getLanguageButtonClass("vi")}
          >
            VI
          </button>
        </div>
      </div>
    </header>
  );
}
