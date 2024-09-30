import { expect, test } from "vitest";
import { Slug } from "./slug";

test("should be able to create a new slug from text", () => {
  const slug = Slug.createFromText("An example title");

  expect(slug.value).toEqual("an-example-title");
});
