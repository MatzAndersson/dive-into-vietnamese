import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const levels = [
  {
    titleKey: "home.levels.beginner.title",
    descriptionKey: "home.levels.beginner.description",
    path: "/levels/beginner",
  },
  {
    titleKey: "home.levels.intermediate.title",
    descriptionKey: "home.levels.intermediate.description",
    path: "/levels/intermediate",
  },
  {
    titleKey: "home.levels.advanced.title",
    descriptionKey: "home.levels.advanced.description",
    path: "/levels/advanced",
  },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-brand-blue/20 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
          {t("home.eyebrow")}
        </p>

        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight text-brand-dark">
          {t("home.title")}
        </h1>

        <p className="mt-4 max-w-2xl font-body text-lg leading-8 text-brand-dark/75">
          {t("home.subtitle")}
        </p>

        <div className="mt-6">
          <Link
            to="/levels/beginner"
            className="inline-flex rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-yellow hover:text-brand-dark"
          >
            {t("home.startButton")}
          </Link>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-blue">
          {t("home.chooseLevel")}
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {levels.map((level) => (
            <Link
              key={level.path}
              to={level.path}
              className="rounded-2xl border border-brand-blue/15 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-md"
            >
              <h3 className="font-heading text-xl font-semibold text-brand-dark">
                {t(level.titleKey)}
              </h3>

              <p className="mt-2 font-body text-sm leading-6 text-brand-dark/70">
                {t(level.descriptionKey)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}