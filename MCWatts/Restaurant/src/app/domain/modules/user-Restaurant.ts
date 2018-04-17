export class Restuarant {
  constructor(name, style, address, des, picture, link, news) {
    this.name = name;

    this.location = address;
    this.des = des;
    this.picture = picture;
    this.link = link;
    this.news = news;
  }

  name?: string;

  location?: string;
  des?: string;
  picture?: string;
  link?: string;
  news?: string;
}
