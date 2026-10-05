import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logout } from "../../features/auth/api";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: currentUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      setIsMobileMenuOpen(false);
      navigate("/login");
    },
  });

  const getDesktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-semibold text-brand-orange"
      : "font-medium text-brand-dark transition hover:text-brand-orange";

  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "rounded-lg bg-brand-orange/10 px-3 py-2 font-semibold text-brand-orange"
      : "rounded-lg px-3 py-2 font-medium text-brand-dark transition hover:bg-brand-blue/5 hover:text-brand-orange";

  const getLanguageButtonClass = (language: string) =>
    `cursor-pointer rounded-lg border px-3 py-1 text-sm font-semibold transition ${
      i18n.language.startsWith(language)
        ? "border-brand-blue bg-brand-blue text-white"
        : "border-brand-blue/20 bg-white text-brand-blue hover:border-brand-orange hover:text-brand-orange"
    }`;

  const isLoggedIn = currentUser?.isAuthenticated === true;
  const canManageLessons = currentUser?.canManageLessons === true;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-brand-blue/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className="font-heading text-lg font-bold text-brand-blue transition hover:text-brand-orange"
        >
          Dive Into Vietnamese
        </NavLink>

        <nav className="hidden items-center gap-4 whitespace-nowrap text-sm min-[945px]:flex">
          <NavLink to="/" className={getDesktopLinkClass}>
            {t("nav.home")}
          </NavLink>

          <NavLink to="/levels/beginner" className={getDesktopLinkClass}>
            {t("nav.beginner")}
          </NavLink>

          <NavLink to="/levels/intermediate" className={getDesktopLinkClass}>
            {t("nav.intermediate")}
          </NavLink>

          <NavLink to="/levels/advanced" className={getDesktopLinkClass}>
            {t("nav.advanced")}
          </NavLink>
        </nav>

        <div className="hidden items-center gap-4 whitespace-nowrap text-sm min-[945px]:flex">
          {canManageLessons && (
            <NavLink to="/admin/lessons" className={getDesktopLinkClass}>
              {t("nav.admin")}
            </NavLink>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{t("nav.signedIn")}</span>

              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="cursor-pointer font-medium text-brand-dark transition hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
              >
                {logoutMutation.isPending ? t("nav.loggingOut") : t("nav.logout")}
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={getDesktopLinkClass}>
              {t("nav.signIn")}
            </NavLink>
          )}
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

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="cursor-pointer rounded-lg border border-brand-blue/20 px-3 py-2 text-xl font-semibold leading-none text-brand-blue transition hover:border-brand-orange hover:text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/40 min-[945px]:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
        >
          <span aria-hidden="true">{isMobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-brand-blue/10 bg-white min-[945px]:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-sm">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}
            >
              {t("nav.home")}
            </NavLink>

            <NavLink
              to="/levels/beginner"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}
            >
              {t("nav.beginner")}
            </NavLink>

            <NavLink
              to="/levels/intermediate"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}
            >
              {t("nav.intermediate")}
            </NavLink>

            <NavLink
              to="/levels/advanced"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}
            >
              {t("nav.advanced")}
            </NavLink>

            {canManageLessons && (
              <NavLink
                to="/admin/lessons"
                onClick={closeMobileMenu}
                className={getMobileLinkClass}
              >
                {t("nav.admin")}
              </NavLink>
            )}

            {isLoggedIn ? (
              <div className="mt-2 flex flex-col gap-2 border-t border-brand-blue/10 pt-3">
                <span className="px-3 text-sm text-gray-600">{t("nav.signedIn")}</span>

                <button
                  type="button"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="cursor-pointer rounded-lg px-3 py-2 text-left font-medium text-brand-dark transition hover:bg-brand-blue/5 hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {logoutMutation.isPending ? t("nav.loggingOut") : t("nav.logout")}
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className={getMobileLinkClass}
              >
                {t("nav.signIn")}
              </NavLink>
            )}

            <div className="mt-3 flex items-center gap-2 border-t border-brand-blue/10 pt-4">
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
          </nav>
        </div>
      )}
    </header>
  );
}
