// 타임랩스: 09:00 / 12:00 / 15:30 / 18:00 / 20:00 (?time=13:20 으로 테스트 가능)
(function () {
    var stages = [540, 720, 930, 1080, 1200];
    var names = ['09:00', '12:00', '15:30', '18:00', '20:00'];
    var q = location.search.match(/time=(\d{1,2}):(\d{2})/);
    var d = new Date();
    var now = q ? +q[1] * 60 + +q[2] : d.getHours() * 60 + d.getMinutes();
    if (now < stages[0] || now > stages[4]) return; // 비활성

    document.querySelectorAll('.timelapse').forEach(function (el) {
        var idx = 0;
        for (var i = 0; i < stages.length; i++) if (now >= stages[i]) idx = i;
        var frac = idx < 4 ? (now - stages[idx]) / (stages[idx + 1] - stages[idx]) : 0;
        el.classList.add('active', 'step' + idx);
        el.style.setProperty('--p', (idx + frac) * 25 + '%');
        el.querySelectorAll('.tl-dot').forEach(function (dot, n) {
            dot.classList.toggle('on', n <= idx);
            dot.classList.toggle('now', n === idx);
        });
        el.querySelectorAll('.tl-label').forEach(function (l) {
            l.classList.toggle('now', +l.dataset.i === idx);
        });
        el.querySelector('.tl-ball').textContent = names[idx];
    });
})();
