import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logout } from "../../features/auth/api";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      navigate("/login");
    },
  });

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

  const isLoggedIn = currentUser?.isAuthenticated === true;
  const canManageLessons = currentUser?.canManageLessons === true;

  return (
    <header className="border-b border-brand-blue/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink
          to="/"
          className="font-heading text-lg font-bold text-brand-blue transition hover:text-brand-orange"
        >
          Dive Into Vietnamese
        </NavLink>

        <nav className="flex items-center gap-4 text-sm">
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

          {canManageLessons && (
            <NavLink to="/admin/lessons" className={getLinkClass}>
              Admin
            </NavLink>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Signed in
                {currentUser.email ? ` as ${currentUser.email}` : ""}
              </span>

              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="cursor-pointer font-medium text-brand-dark transition hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={getLinkClass}>
              {t("nav.signIn")}
            </NavLink>
          )}
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