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
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {t("home.eyebrow")}
        </p>

        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900">
          {t("home.title")}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          {t("home.subtitle")}
        </p>

        <div className="mt-6">
          <Link
            to="/levels/beginner"
            className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {t("home.startButton")}
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {t("home.chooseLevel")}
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {levels.map((level) => (
            <Link
              key={level.path}
              to={level.path}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {t(level.titleKey)}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {t(level.descriptionKey)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}