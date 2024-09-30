export class Slug {
  constructor(public value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalize it as a slug
   * Example: "An example title" => "an-example-title"
   * @param text {string}
   */

  static createFromText(text: string) {
    const slutText = text
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "");

    return new Slug(slutText);
  }
}
