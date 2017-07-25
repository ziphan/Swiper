class Swiper {
  /**
   *
   * @param obj newSwiper时指定容器
   * @param param 设置部分参数
   *          duration 滑动速度，对应 transitionDuration，默认值 300
   *          stay autoplay时停留的时间，默认值 3000
   *          
   */
  constructor(obj, param = {duration: 300, stay: 3000}) {
    this.obj = document.querySelector(obj);
    this.wrapper = this.obj.querySelector('.swiper-wrapper');
    this.param = param;
    this.count = 0;
    this.length = this.obj.children.length;
    this.width = this.obj.offsetWidth;

    this.init();
  }

  init() {
    this.autoplay();
    this.btn();
    if (this.obj.querySelector('.swiper-nav')) this.nav();
  }

  /**
   * 滑动动作，点击按钮/autoplay 时执行
   * @param count 需要滑出到wrapper左侧的块数
   */
  move(count) {
    // 设定滑出左侧的距离，让 wrapper 通过 transform 滑动过去
    // this.count * this.width 为距离值，左滑取负值
    // 动态设置 transitionDuration 来确保 PNswitch 执行时没有动画效果
    let distance = -(count * this.width);
    this.wrapper.style.transitionDuration = this.param.duration + 'ms';
    this.wrapper.style.transform = 'translateX(' + distance + 'px)';
    setTimeout(() => {
      this.wrapper.style.transitionDuration = '';
    }, this.param.duration)
  }

  /**
   * 上一个
   */
  prev() {
    if (this.count > 0) {
      this.count--;
      this.move(this.count);
    } else {
      this.PNswitch(this.wrapper.children[this.length], -(this.length + 1), -1, this.length, (-this.length * this.width));
    }
  }

  /**
   * 下一个
   */
  next() {
    if (this.count < this.length) {
      this.count++;
      this.move(this.count);
    } else {
      this.PNswitch(this.wrapper.children[0], (this.length + 1), this.count + 1, 0, 0);
    }
  }

  /**
   *
   * @param node 下一次显示第几块
   *             第一块：this.wrapper.children[0]
   *             最后一块：this.wrapper.children[this.length]
   * @param lengthNum 下一次显示时，node 距离左侧的块数
   * @param moveCount 下一次显示时，wrapper 左侧滑出的块数
   * @param count 设置 count
   * @param distance 重置 node 的位置
   * @constructor
   */
  PNswitch(node, lengthNum, moveCount, count, distance) {
    node.style.left = lengthNum * this.width + 'px';
    this.move(moveCount);
    this.count = count;
    setTimeout(() => {
      node.style.left = '';
      this.wrapper.style.transform = 'translateX(' + distance + 'px)';
    }, this.param.duration)
  }

  /**
   * 点击监测
   * prev next nav-btn
   */
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

  /**
   * nav 初始化
   */
  nav() {
    let nav = this.obj.querySelector('.swiper-nav');
    for (let i = 0; i <= this.length; i++) {
      let a = document.createElement('a');
      a.className = 'swiper-nav-btn';
      nav.appendChild(a);
    }
    this.setNavCurrent();
  }

  /**
   * 设置当前的 nav-btn 样式
   */
  setNavCurrent() {
    let nav = this.obj.querySelector('.swiper-nav');
    let current = nav.querySelector('.current');
    if (current) current.classList.remove('current');
    nav.children[this.count].classList.add('current');
  }

  /**
   * 自动播放
   */
  autoplay() {
    setInterval(() => {
      this.next();
      this.setNavCurrent();
    }, this.param.stay)
  }
}