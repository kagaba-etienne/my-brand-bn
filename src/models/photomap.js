const isAlpha = function (chr) {
    return (/[a-zA-Z]/).test(chr);
};
const photomap = function (firstLetter) {
    if(!firstLetter){
        return ''
    }
    const map = {
        a : '/assets/letters/a.svg',
        b : '/assets/letters/b.svg',
        c : '/assets/letters/c.svg',
        d : '/assets/letters/d.svg',
        e : '/assets/letters/e.svg',
        f : '/assets/letters/f.svg',
        g : '/assets/letters/g.svg',
        h : '/assets/letters/h.svg',
        i : '/assets/letters/i.svg',
        j : '/assets/letters/j.svg',
        k : '/assets/letters/k.svg',
        l : '/assets/letters/l.svg',
        m : '/assets/letters/m.svg',
        n : '/assets/letters/n.svg',
        o : '/assets/letters/o.svg',
        p : '/assets/letters/p.svg',
        q : '/assets/letters/q.svg',
        r : '/assets/letters/r.svg',
        s : '/assets/letters/s.svg',
        t : '/assets/letters/t.svg',
        u : '/assets/letters/u.svg',
        v : '/assets/letters/v.svg',
        w : '/assets/letters/w.svg',
        x : '/assets/letters/x.svg',
        y : '/assets/letters/y.svg',
        z : '/assets/letters/z.svg'
    };

    if (isAlpha(firstLetter)) {
        return map[`${firstLetter.toLowerCase()}`];
    } else {
        return map.a;
    }
}

module.exports = photomap;