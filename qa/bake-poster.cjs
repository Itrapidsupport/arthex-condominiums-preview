// Bake the hero poster from the live 3D scene (transparent 4:3 PNG, same framing as the canvas).
// node qa/bake-poster.cjs <base-url>  -> public/hero/poster-{800,1600}.webp (via python/PIL)
const { chromium } = require('playwright')
const path = require('node:path')
;(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] })
  const p = await b.newPage({ viewport: { width: 1600, height: 1300 }, deviceScaleFactor: 2 })
  await p.goto(process.argv[2].replace(/\/?$/, '/') + '?bake', { waitUntil: 'networkidle' })
  await p.addStyleTag({ content: `html,body,#root,main,section{background:transparent!important}
    header,footer,.skip,main>section:not(:first-child){display:none!important}
    [data-hero3d]{position:fixed!important;left:0!important;top:0!important;width:1600px!important;height:1200px!important;margin:0!important;z-index:999}
    main>section:first-child>*:not(.wrap){display:none!important} .wrap>div:first-child{visibility:hidden}` })
  await p.waitForSelector('[data-hero3d] canvas', { timeout: 20000 })
  await p.waitForTimeout(5000)
  const el = await p.$('[data-hero3d]')
  const out = path.join(require('os').homedir(), '.hermes/cache/scratch/arthex-poster.png')
  await el.screenshot({ path: out, omitBackground: true })
  await b.close(); console.log(out)
})().catch((e) => { console.error(e); process.exit(1) })
