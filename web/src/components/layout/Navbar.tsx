import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t, i18n } = useTranslation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-semibold text-blue-700"
      : "text-slate-700 hover:text-blue-700";

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="text-lg font-bold text-slate-900">
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
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => i18n.changeLanguage("en")}
            className={`cursor-pointer rounded border px-3 py-1 text-sm transition hover:opacity-90 ${
              i18n.language.startsWith("en")
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            EN
          </button>

          <button
            type="button"
            onClick={() => i18n.changeLanguage("vi")}
            className={`cursor-pointer rounded border px-3 py-1 text-sm transition hover:opacity-90 ${
              i18n.language.startsWith("vi")
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            VI
          </button>
        </div>
      </div>
    </header>
  );
}
