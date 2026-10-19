import assert from "node:assert/strict";
import { test } from "node:test";
import { validateQuestionsJson } from "../src/features/lessons/lessonJsonValidation.ts";

test("Questions JSON remains optional", () => {
  assert.equal(validateQuestionsJson(undefined), undefined);
  assert.equal(validateQuestionsJson(""), undefined);
});

test("accepts question-only, answered, and mixed lists without altering content", () => {
  for (const items of [
    [],
    [{ question: "Bạn tên gì?" }],
    [{ question: "Bạn tên gì?", answer: "Tôi tên là An." }],
    [{ question: "First?" }, { question: "Second?", answer: "Answer" }],
  ]) {
    const json = JSON.stringify(items);
    assert.equal(validateQuestionsJson(json), json);
  }
});

test("rejects blank and non-string answers when supplied", () => {
  for (const answer of ["", "  \n ", null, 42, true, {}, [], ["Answer"]]) {
    assert.throws(
      () => validateQuestionsJson(JSON.stringify([{ question: "Question?", answer }])),
      /optional answer field must be a non-empty string/,
    );
  }
});

test("continues to reject missing, blank, and non-string questions", () => {
  for (const item of [null, [], "Question?", {}, { answer: "Answer" },
    { question: "" }, { question: " \n " }, { question: 42 },
    { question: null }, { question: false }, { question: {} }]) {
    assert.throws(() => validateQuestionsJson(JSON.stringify([item])));
  }
  assert.throws(() => validateQuestionsJson(JSON.stringify([
    { question: "Valid?", answer: "Yes" }, { question: "" },
  ])));
});

test("rejects malformed JSON and non-array roots", () => {
  for (const json of ["[", "null", "{}", '"question"', "42"]) {
    assert.throws(() => validateQuestionsJson(json));
  }
});
