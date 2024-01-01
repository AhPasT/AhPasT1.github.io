var S = {
  init: function () {
    var action = window.location.href,
      i = action.indexOf('?a=');

    S.Drawing.init('.canvas');
    document.body.classList.add('body--ready');

    if (i !== -1) {
      S.UI.simulate(decodeURI(action).substring(i + 3));
    } else {
      S.UI.simulate('|#countdown 3|何|凝|雨|祝|你|生|日|快|乐|🎂|往|事|随|风|爱|很|随|意|永|远|健|康|美|丽|动|人|爱|你|❤️|PasT.|#rectangle|');
    }

    S.Drawing.loop(function () {
      S.Shape.render();
      if (S.ShapeBuilder && S.ShapeBuilder.imageLoaded) {
        S.ShapeBuilder.imageLoaded = false;
        S.Shape.shuffleIdle();
      }
    });

    // 添加音乐自动播放
    var audio = new Audio('https://drive.google.com/uc?export=download&id=1SLjpCwvxT1WjIps1YPcJHx530Lwgf84k');
    audio.loop = true;
    audio.play();
  }
};

S.Drawing = (function () {
  // ... （前面的代码保持不变）

  return {
    init: function (el) {
      // ... （前面的代码保持不变）

      window.addEventListener('resize', function (e) {
        S.Drawing.adjustCanvas();
      });
    },

    loop: function (fn) {
      renderFn = !renderFn ? fn : renderFn;
      this.clearFrame();
      renderFn();
      requestFrame.call(window, this.loop.bind(this));
    },

    // ... （后续的代码保持不变）

    getArea: function () {
      return { w: canvas.width, h: canvas.height };
    },

    // ... （后续的代码保持不变）
  }
}());

S.UI = (function () {
  // ... （前面的代码保持不变）

  return {
    simulate: function (action) {
      performAction(action);
    }
  }
}());

// ... （后续的代码保持不变）

S.Shape = (function () {
  // ... （前面的代码保持不变）

  return {
    shuffleIdle: function () {
      var a = S.Drawing.getArea();

      for (var d = 0; d < dots.length; d++) {
        if (!dots[d].s) {
          dots[d].move({
            x: Math.random() * a.w,
            y: Math.random() * a.h
          });
        }
      }
    },

    // ... （后续的代码保持不变）

    switchShape: function (n, fast) {
      var size,
        a = S.Drawing.getArea();

      // ... （前面的代码保持不变）

      for (var i = d; i < dots.length; i++) {
        if (dots[i].s) {
          dots[i].move(new S.Point({
            z: Math.random() * 20 + 10,
            a: Math.random(),
            h: 20
          }));

          dots[i].s = false;
          dots[i].e = 0.04;
          dots[i].move(new S.Point({
            x: Math.random() * a.w,
            y: Math.random() * a.h,
            a: 0.3,
            z: Math.random() * 4,
            h: 0
          }));
        }
      }
    },

    // ... （后续的代码保持不变）
  }
}());

S.init();
