class Swiper {
  constructor(obj, param = {duration: 300}) {
    this.obj = document.querySelector(obj);
    this.wrapper = this.obj.querySelector('.swiper-wrapper');
    this.param = param;
    this.count = 0;
    this.length = this.obj.children.length;
    this.width = this.obj.offsetWidth;

    this.init();
  }

  init() {
    if (this.obj.querySelector('.swiper-btn')) this.btn();
    if (this.obj.querySelector('.swiper-nav')) this.nav();
  }

  move(count) {
    // 设定左侧的距离，让 wrapper 通过 transform 滑动过去
    // this.count * this.width 为距离值，左滑取负值
    let distance = -(count * this.width);
    this.wrapper.style.transitionDuration = this.param.duration + 'ms';
    this.wrapper.style.transform = 'translateX(' + distance + 'px)';
    setTimeout(() => {
      this.wrapper.style.transitionDuration = '';
    }, this.param.duration)
  }

  prev() {
    if (this.count > 0) {
      this.count--;
      this.move(this.count);
    } else {
      this.PNswitch(this.wrapper.children[this.length], -(this.length + 1), -1, this.length, (-this.length * this.width));
    }
  }

  next() {
    if (this.count < this.length) {
      this.count++;
      this.move(this.count);
    } else {
      this.PNswitch(this.wrapper.children[0], (this.length + 1), this.count + 1, 0, 0);
    }
  }

  PNswitch(node, lengthNum, moveCount, count, distance) {
    node.style.left = lengthNum * this.width + 'px';
    this.move(moveCount);
    this.count = count;
    setTimeout(() => {
      node.style.left = '';
      this.wrapper.style.transform = 'translateX(' + distance + 'px)';
    }, this.param.duration)
  }

  btn() {
    this.obj.addEventListener('click', (e) => {
      if (e.target.classList.contains('swiper-prev')) {
        this.prev();
      } else if (e.target.classList.contains('swiper-next')) {
        this.next();
      } else if (e.target.classList.contains('swiper-nav-btn')) {
        let nav = this.obj.querySelector('.swiper-nav');
        this.count = Array.from(nav.children).indexOf(e.target);
        this.move(this.count);
      }
      this.setNavCurrent();
    })
  }

  nav() {
    let nav = this.obj.querySelector('.swiper-nav');
    for (let i = 0; i <= this.length; i++) {
      let a = document.createElement('a');
      a.className = 'swiper-nav-btn';
      nav.appendChild(a);
    }
    this.setNavCurrent();
  }

  setNavCurrent() {
    let nav = this.obj.querySelector('.swiper-nav');
    let current = nav.querySelector('.current');
    if (current) current.classList.remove('current');
    nav.children[this.count].classList.add('current');
  }
}