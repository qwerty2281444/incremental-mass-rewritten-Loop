const INF = {
    doReset() {
        player.inf.reached = false
        player.mass = E(0)

        // QoL

        resetMainUpgs(1,[3])
        resetMainUpgs(2,[5,6])
        resetMainUpgs(3,[2,6])
        resetMainUpgs(4)

        let e = [14,18,24,30,122,124,131,136,143,194]
        if (hasInfUpgrade(2)) e.push(202)
        if (hasInfUpgrade(3)) e.push(161)

        player.atom.elements = e
        player.atom.muonic_el = []
        for (let x = 1; x <= 16; x++) player.chal.comps[x] = E(0)
        player.supernova.tree = ["qu_qol1", "qu_qol2", "qu_qol3", "qu_qol4", "qu_qol5", "qu_qol6", "qu_qol7", "qu_qol8", "qu_qol9", "qu_qol8a", "unl1", "unl2", "unl3", "unl4",
        "qol1", "qol2", "qol3", "qol4", "qol5", "qol6", "qol7", "qol8", "qol9", 'qu_qol10', 'qu_qol11', 'qu_qol12', 'qu0']

        player.ranks.beyond = E(0)
        for (let x = 0; x < PRESTIGES.names.length; x++) player.prestiges[x] = E(0)

        // Reset

        player.ranks[RANKS.names[RANKS.names.length-1]] = E(0)
        RANKS.doReset[RANKS.names[RANKS.names.length-1]]()

        player.rp.points = E(0)
        player.tickspeed = E(0)
        player.accelerator = E(0)
        player.bh.mass = E(0)

        player.atom.atomic = E(0)
        player.bh.dm = E(0)
        player.bh.condenser = E(0)

        tmp.supernova.time = 0

        player.atom.points = E(0)
        player.atom.quarks = E(0)
        player.atom.particles = [E(0),E(0),E(0)]
        player.atom.powers = [E(0),E(0),E(0)]
        player.atom.atomic = E(0)
        player.atom.gamma_ray = E(0)

        player.md.active = false
        player.md.particles = E(0)
        player.md.mass = E(0)
        for (let x = 0; x < MASS_DILATION.upgs.ids.length; x++) player.md.upgs[x] = E(0)

        player.stars.unls = 0
        player.stars.generators = [E(0),E(0),E(0),E(0),E(0)]
        player.stars.points = E(0)
        player.stars.boost = E(0)

        player.supernova.chal.noTick = true
        player.supernova.chal.noBHC = true

        player.supernova.times = E(0)
        player.supernova.stars = E(0)

        player.supernova.bosons = {
            pos_w: E(0),
            neg_w: E(0),
            z_boson: E(0),
            photon: E(0),
            gluon: E(0),
            graviton: E(0),
            hb: E(0),
        }
        for (let x in BOSONS.upgs.ids) for (let y in BOSONS.upgs[BOSONS.upgs.ids[x]]) player.supernova.b_upgs[BOSONS.upgs.ids[x]][y] = E(0)

        player.supernova.fermions.points = [E(0),E(0)]

        for (let x = 0; x < 2; x++) for (let y = 0; y < 7; y++) player.supernova.fermions.tiers[x][y] = E(0)

        player.supernova.radiation.hz = hasUpgrade('br',6)?E(1e50):E(0)
        for (let x = 0; x < 7; x++) {
            player.supernova.radiation.ds[x] = E(0)
            for (let y = 0; y < 2; y++) player.supernova.radiation.bs[2*x+y] = E(0)
        }

        // Quantum

        let qu = player.qu
        let bmd = player.md.break
        let quSave = getQUSave()

        qu.times = E(10)
        qu.points = E(0)
        qu.bp = E(0)
        qu.chroma = [E(0),E(0),E(0)]
        qu.cosmic_str = E(0)

        qu.prim.theorems = E(0)
        qu.prim.particles = [E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0)]

        qu.en.amt = E(0)
        qu.en.eth = quSave.en.eth
        qu.en.hr = quSave.en.hr
        qu.en.rewards = quSave.en.rewards

        qu.rip.active = false
        qu.rip.amt = E(0)

        bmd.active = false
        bmd.energy = E(0)
        bmd.mass = E(0)
        for (let x = 0; x < 12; x++) if (x != 10) bmd.upgs[x] = E(0)

        // Dark Reset

        let dark = player.dark
        let darkSave = getDarkSave()

        dark.rays = E(0)
        dark.shadow = E(0)
        dark.abyssalBlot = E(0)

        dark.run.active = false
        dark.run.glyphs = [0,0,0,0,0,0]
        if (!hasInfUpgrade(3)) dark.run.upg = []

        dark.matters = darkSave.matters

        dark.c16 = darkSave.c16

        dark.exotic_atom = darkSave.exotic_atom

        player.bh.fvm = E(0)
        player.bh.unstable = E(0)

        // Other

        tmp.rank_tab = 0
        tmp.stab[4] = 0
        tmp.stab[7] = 0
        player.atom.elemTier[0] = 1
        player.atom.elemLayer = 0

        updateMuonSymbol()

        updateTemp()

        generatePreTheorems()

        tmp.pass = 2
    },
    req: Decimal.pow(10,Number.MAX_VALUE),
    limit() {
        let x = Decimal.pow(10,Decimal.pow(10,Decimal.pow(1.05,player.inf.theorem.pow(1.25)).mul(Math.log10(Number.MAX_VALUE))))

        return x
    },
    goInf(limit=false) {
        if (player.mass.gte(this.req)) {
            if (limit || player.inf.pt_choosed >= 0) CONFIRMS_FUNCTION.inf(limit)
            else createConfirm(`Are you sure you want to go infinity without selecting any theorem?`,'inf',()=>{CONFIRMS_FUNCTION.inf(limit)})
        }
    },
    level() {
        let s = player.mass.add(1).log10().add(1).log10().div(308).max(1).log(1.1).add(1)
        s = s.mul(player.dark.c16.bestBH.add(1).log10().div(3.5e6).max(1).log(1.1).add(1))

        return s.max(1).root(2).toNumber()
    },
    gain() {
        if (player.mass.lt(this.req)) return E(0)
        let x = player.mass.add(1).log10().add(1).log10().sub(307).root(2).div(2)
        x = Decimal.pow(10,x.sub(1))

        return x.max(1).floor()
    },

    upgs: [
        [
            {
                title: "Require-Free Tree",
                desc: "Upgrades in pre-corrupted tree can be bought without their requirement.",
                cost: E(1),
            },{
                title: "Infinity Mass",
                desc: "Normal mass gain is boosted by total infinity points.",
                cost: E(1),
                effect() {
                    let x = player.inf.total.add(1).pow(2)

                    return x.softcap(1e3,0.5,0)
                },
                effectDesc: x => "^"+x.format(0)+x.softcapHTML(1e3),
            },{
                title: "Legacy Mass Upgrade 4",
                desc: "Start with overpower unlocked, its starting cost is massively decreased (likewise, start with Binilbium-202 unlocked).",
                cost: E(1),
            },{
                title: "Dark Rest",
                desc: "Keep glyph upgrades on infinity (likewise, start with Unhexunium-161 unlocked).",
                cost: E(1),
            },
            /*
            {
                title: "Placeholder Title",
                desc: "Placeholder Description.",
                cost: E(1),
                effect() {
                    let x = E(1)

                    return x
                },
                effectDesc: x => "Placeholder",
            },
            */
        ],
    ],

    upg_row_req: [
        1,
    ],
}

const IU_LENGTH = (()=>{
    let n = 0
    for (let x in INF.upgs) n += INF.upgs[x].length
    return n
})()

function generatePreTheorems() {
    for (let i = 0; i < 4; i++) player.inf.pre_theorem[i] = createPreTheorem()
}

function hasInfUpgrade(i) { return player.inf.upg.includes(i) }

function buyInfUpgrade(r,c) {
    if (hasInfUpgrade(r*4+c)) return

    let u = INF.upgs[r][c]
    let cost = u.cost

    if (player.inf.points.gte(cost)) {
        player.inf.upg.push(r*4+c)
        player.inf.points = player.inf.points.sub(cost).max(0).round()
    }
}

function getInfSave() {
    let s = {
        theorem: E(0),
        total: E(0),
        points: E(0),
        reached: false,

        core: [],
        inv: [],
        pre_theorem: [],
        upg: [],
        pt_choosed: -1,
    }
    //for (let i = 0; i < 4; i++) s.pre_theorem.push(createPreTheorem())
    return s
}

function infUpgEffect(i,def=1) { return tmp.iu_eff[i] || def }

function updateInfTemp() {
    for (let r in INF.upgs) {
        r = parseInt(r)

        let ru = INF.upgs[r]

        for (let c in ru) {
            c = parseInt(c)

            let u = ru[c]

            if (u.effect) tmp.iu_eff[r*4+c] = u.effect()
        }
    }

    updateCoreTemp()

    tmp.IP_gain = INF.gain()
    tmp.inf_limit = INF.limit()
    tmp.inf_reached = player.mass.gte(tmp.inf_limit)
}

function infButton() {
    if (tmp.inf_time == 2) {
        tmp.inf_time += 1

        INF.goInf(true)

        document.body.style.animation = "inf_reset_2 2s 1"

        setTimeout(()=>{
            tmp.inf_time += 1
            tmp.el.inf_popup.setDisplay(false)

            setTimeout(()=>{
                tmp.inf_time = 0
                document.body.style.backgroundColor = 'hsl(0, 0%, 7%)'
            },1000)
        },1000)
    }
}

function calcInf(dt) {
    if (tmp.inf_reached && tmp.inf_time == 0) {
        tmp.inf_time += 1
        document.body.style.animation = "inf_reset_1 10s 1"

        setTimeout(()=>{
            tmp.inf_time += 1
            document.body.style.backgroundColor = 'orange'
            tmp.el.inf_popup.setDisplay(true)
        },8500)
    }

    if (!player.inf.reached && player.mass.gte(INF.req)) player.inf.reached=true
}

function setupInfHTML() {
    setupCoreHTML()
    setupInfUpgradesHTML()
}

function updateInfHTML() {
    if (tmp.stab[8] == 0) updateCoreHTML()
    else if (tmp.stab[8] == 1) {
        let h = ``
        for (let t in CORE) {
            let hh = ``, ct = CORE[t], ctmp = tmp.core_eff[t], s = tmp.core_score[t]
            for (let i = 0; i < 4; i++) {
                if (s[i] > 0) hh += "Meta-Score "+format(s[i],2)+" | "+ct.preEff[i]+` <b class='sky'>(${ct.effDesc[i](ctmp[i])})</b><br>`
            }
            if (hh != '') h += `<h2>${ct.title} <b>(${format(core_tmp[t].total_p*100,0)}%)</b></h2><br>`+hh+'<br>'
        }
        tmp.el.core_eff_div.setHTML(h||"Place any theorem in core to show effects!")
    }
    else if (tmp.stab[8] == 2) {
        tmp.el.ip_amt.setHTML(player.inf.points.format(0))

        for (let r in INF.upgs) {
            r = parseInt(r)

            let ru = INF.upgs[r], req = player.inf.theorem.gte(INF.upg_row_req[r])

            for (let c in ru) {
                c = parseInt(c)

                let id = r*4+c

                let el = tmp.el[`iu_${id}_div`]

                if (el) {
                    let u = ru[c], b = hasInfUpgrade(id)

                    el.setClasses({inf_upg: true, locked: !b && (player.inf.points.lt(u.cost) || !req), bought: b})

                    tmp.el[`iu_${id}_desc`].setHTML(b?u.effectDesc?"<br>Effect: "+u.effectDesc(infUpgEffect(id)):"":"<br>Cost: <b>"+u.cost.format(0)+"</b> Infinity Points")
                }
            }
        }
    }
}

function setupInfUpgradesHTML() {
    let html = ''

    for (let r in INF.upgs) {
        r = parseInt(r)

        let h = `<div class='table_center' id='iu_row${r}'>
        <div class='iu_req_div'><div>Require ${INF.upg_row_req[r]} Infinity Theorem</div></div>`

        let ru = INF.upgs[r]

        for (let c in ru) {
            c = parseInt(c)

            let u = ru[c], id = r*4+c

            h += `
            <button class='inf_upg' id='iu_${id}_div' onclick='buyInfUpgrade(${r},${c})'>
                <img src='images/upgrades/iu${id}.png'>
                <div>
                    <b>${u.title}</b><br>
                    ${u.desc}<br>
                    <span id='iu_${id}_desc'></span>
                </div>
            </button>
            `
        }

        html += h + `</div>`
    }

    new Element('inf_upg_table').setHTML(html)
}