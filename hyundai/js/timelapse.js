// 타임랩스: 09:00 / 12:00 / 15:30 / 18:00 / 20:00 (?time=13:20 으로 테스트 가능)
// - .tl-now 요소가 있으면(main.html) 현재시간 화살표 + 시간 선택 + 초기화 버튼(.refresh) 동작
// - .tl-now 요소가 없으면(iframe01.html) 기존 단계 표시 방식
(function () {
    var stages = [540, 720, 930, 1080, 1200];
    var names = ['09:00', '12:00', '15:30', '18:00', '20:00'];
    var q = location.search.match(/time=(\d{1,2}):(\d{2})/);
    var d = new Date();
    var now = q ? +q[1] * 60 + +q[2] : d.getHours() * 60 + d.getMinutes();

    function pos(m) {
        var idx = 0;
        for (var i = 0; i < stages.length; i++) if (m >= stages[i]) idx = i;
        var frac = idx < 4 ? (m - stages[idx]) / (stages[idx + 1] - stages[idx]) : 0;
        return { idx: idx, frac: frac };
    }

    function paint(el, idx, a, withHalo) {
        el.style.setProperty('--p', a * 25 + '%');
        el.style.setProperty('--a', a);
        el.querySelectorAll('.tl-dot').forEach(function (dot, n) {
            dot.classList.toggle('on', n <= idx);
            dot.classList.toggle('now', withHalo && n === idx);
        });
        el.querySelectorAll('.tl-label').forEach(function (l) {
            l.classList.toggle('now', withHalo && +l.dataset.i === idx);
        });
    }

    // 기존 방식 (iframe01)
    function legacy(el) {
        var p = pos(now);
        el.classList.add('active', 'step' + p.idx);
        paint(el, p.idx, p.idx + p.frac, true);
        el.querySelector('.tl-ball').textContent = names[p.idx];
    }

    // 현재시간 화살표 + 시간 선택 방식 (main)
    function live(el) {
        // 24:01 ~ 08:59 : 전체 비활성 / 09:00 ~ 20:00 : 현재시간 기준 / 20:01 ~ 24:00 : 20:00 기준 전체 활성
        var mode = now < stages[0] ? 'off' : now <= stages[4] ? 'live' : 'closed';
        var ball = el.querySelector('.tl-ball');
        var dots = el.querySelectorAll('.tl-dot');
        var wrap = el.closest('section') || document;
        var sel = null;

        el.classList.add('live');

        function render() {
            el.classList.toggle('active', mode !== 'off');
            el.classList.toggle('sel', sel !== null);
            if (mode === 'off') return;
            if (sel !== null) {
                paint(el, sel, sel, true);
                ball.textContent = names[sel];
                el.classList.remove('now-exact', 'now-mid');
            } else if (mode === 'closed') {
                paint(el, 4, 4, false);
                el.classList.remove('now-exact', 'now-mid');
            } else {
                var p = pos(now);
                paint(el, p.idx, p.idx + p.frac, false);
                // 현재 시간이 시간 포인트와 같으면 점선 없음
                el.classList.toggle('now-exact', p.frac === 0);
                el.classList.toggle('now-mid', p.frac !== 0);
            }
            el.dispatchEvent(new CustomEvent('timelapse:change', { bubbles: true, detail: { time: sel === null ? (mode === 'closed' ? names[4] : 'now') : names[sel] } }));
        }

        if (mode !== 'off') {
            dots.forEach(function (dot, n) {
                dot.setAttribute('role', 'button');
                dot.setAttribute('tabindex', '0');
                dot.setAttribute('aria-label', names[n]);
                function pick() {
                    sel = n;
                    render();
                }
                dot.addEventListener('click', pick);
                dot.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        pick();
                    }
                });
            });
            var reset = wrap.querySelector('.refresh');
            if (reset)
                reset.addEventListener('click', function () {
                    sel = null;
                    render();
                });
        }
        render();
    }

    document.querySelectorAll('.timelapse').forEach(function (el) {
        if (el.querySelector('.tl-now')) return live(el);
        if (now >= stages[0] && now <= stages[4]) legacy(el);
    });
})();
