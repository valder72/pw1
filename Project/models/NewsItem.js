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

  toJSON() {
    return { id: this.id, title: this.title, content: this.content, img: this.img };
  }

  static fromJSON(obj) {
    return new NewsItem(obj.id, obj.title, obj.content, obj.img);
  }
}
