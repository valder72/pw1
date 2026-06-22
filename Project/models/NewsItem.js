export class NewsItem {
  constructor(id, title, content, img) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.img = img;
  }

  get shortContent() {
    return this.content.length > 100
      ? this.content.slice(0, 100) + "…"
      : this.content;
  }
}
