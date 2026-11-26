// 타임랩스: 09:00 / 12:00 / 15:30 / 18:00 / 20:00 (?time=13:20 으로 테스트 가능)
// 말풍선은 현재 시각 위치에 현재 시각(HH:MM)으로 표시됩니다.
(function () {
    var stages = [540, 720, 930, 1080, 1200];
    var q = location.search.match(/time=(\d{1,2}):(\d{2})/);

    var pad = function (n) {
        return (n < 10 ? '0' : '') + n;
    };

    var render = function (el, now) {
        var ball = el.querySelector('.tl-ball');
        var labels = el.querySelectorAll('.tl-label');
        var dots = el.querySelectorAll('.tl-dot');

        if (now < stages[0] || now > stages[4]) {
            // 비활성
            el.classList.remove('active');
            return;
        }

        var idx = 0;
        for (var i = 0; i < stages.length; i++) if (now >= stages[i]) idx = i;
        var frac = idx < 4 ? (now - stages[idx]) / (stages[idx + 1] - stages[idx]) : 0;
        var x = (idx + frac) / 4; // 0 ~ 1

        el.classList.add('active');
        el.style.setProperty('--p', x * 100 + '%');
        el.style.setProperty('--x', x);
        ball.textContent = pad(Math.floor(now / 60)) + ':' + pad(now % 60);

        // 말풍선이 눈금 점 위에 있을 때만 해당 점에 후광
        var span = (el.offsetWidth - 29) / 4;
        dots.forEach(function (dot, n) {
            var near = Math.abs(x * 4 - n) * span <= 5.5;
            dot.classList.toggle('on', n <= idx || near);
            dot.classList.toggle('now', near);
        });

        hideCovered(el);
    };

    // 말풍선에 조금이라도 가려지는 눈금 글자는 숨기고, 안 가려지면 다시 보임
    var hideCovered = function (el) {
        if (!el.classList.contains('active')) return;
        var b = el.querySelector('.tl-ball').getBoundingClientRect();
        el.querySelectorAll('.tl-label').forEach(function (l) {
            var r = l.getBoundingClientRect();
            var covered = r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top;
            l.classList.toggle('now', covered);
        });
    };

    var getNow = function () {
        var d = new Date();
        return q ? +q[1] * 60 + +q[2] : d.getHours() * 60 + d.getMinutes();
    };

    document.querySelectorAll('.timelapse').forEach(function (el) {
        render(el, getNow());
        window.addEventListener('resize', function () {
            hideCovered(el);
        });
        window.addEventListener('load', function () {
            hideCovered(el);
        });
        if (!q) {
            setInterval(function () {
                render(el, getNow());
            }, 60000);
        }
    });
})();
