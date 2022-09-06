export default class NotificationMessage {

  static active;
  element;
  timer;

  constructor(text = '', {
    duration = 2000,
    type = "success",
    } = {}) {
    this.text = text;
    this.correctDuration = (duration / 1000) + 's';
    this.type = type;
    this.duration = duration;

    this.create();
  }

  get wrapper() {
    return `
      <div class="notification ${this.type}" style="--value:${this.correctDuration}">
      <div class="timer"></div>
      <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
          ${this.text}
      </div>
      </div>
      </div>
    `;
  }

  create() {
    const notificationWrapper = document.createElement("div");
    notificationWrapper.innerHTML = this.wrapper;
    this.element = notificationWrapper.firstElementChild;
  }

  show(parent = document.body) {
    if (NotificationMessage.active) {
      NotificationMessage.active.remove();
    }
    parent.append(this.element);

    this.timer = setTimeout(() => {
      this.remove();
    }, this.duration);
    NotificationMessage.active = this;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.active = null;
  }
}
