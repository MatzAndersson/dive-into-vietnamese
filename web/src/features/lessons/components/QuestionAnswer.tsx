import { useId, useState } from "react";
import { useTranslation } from "react-i18next";

export default function QuestionAnswer({ answer }: { answer: string }) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const answerId = useId();

  return (
    <div className="mt-2">
      <button
        type="button"
        aria-expanded={isVisible}
        aria-controls={answerId}
        onClick={() => setIsVisible((current) => !current)}
        className="cursor-pointer rounded border px-3 py-2 text-sm hover:bg-slate-50"
      >
        {t(isVisible ? "hideAnswer" : "showAnswer")}
      </button>
      <p
        id={answerId}
        hidden={!isVisible}
        className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-3 leading-7"
      >
        {answer}
      </p>
    </div>
  );
}
