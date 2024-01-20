import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import cache from '@adonisjs/cache/services/main'

import { adonisLogo } from './adonis_logo.js'

export class OgImageGenerator {
  #buildMarkup(name: string, description: string) {
    return html`
      <div
        style="
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background-color: #212121;
          font-size: 50;
          padding: 50px 80px;
          letter-spacing: -2;
          font-weight: 800;
          text-align: left;
        "
      >
        <!-- Radial gradient at right -->
        <div
          style="
            background: radial-gradient(circle, rgba(88,82,213,0.2) 0%, rgba(28,28,28,0) 45%);
            width: 3000;
            height: 1200;
            top: -200;
            right: -100;
            position: absolute;
            display: flex;
          "
        />

        <!-- Radial gradient at left -->
        <div
          style="
            background: radial-gradient(circle, rgba(120,82,213,0.5) 0%, rgba(28,28,28,0) 45%);
            width: 3000;
            height: 1200;
            top: -600;
            left: -100;
            position: absolute;
            display: flex;
          "
        />

        <!-- Adonis logo at top right -->
        <img
          style="
            position: absolute;
            right: -30;
            top: -20;
            transform: rotate(-25deg);
          "
          src="${adonisLogo}"
          width="400"
        />

        <!-- Adonis logo at bottom left -->
        <img
          style="
          position: absolute;
          left: -90;
          bottom: -20;
          transform: rotate(20deg);
      "
          src="${adonisLogo}"
          width="400"
        />

        <!-- Package name -->
        <div
          style="
            margin-top: 0;
            color: white;
            font-size: 60;
            font-family: 'PolySans', sans-serif;
          "
        >
          ${name}
        </div>

        <!-- Package description -->
        <div
          style="
            marginTop: 20;
            color: #A0A0A0;
            fontWeight: 100;
            font-size: 30;
            text-align: center;
            line-height: 1.4;
            letter-spacing: -1.2;
            max-width: 60%;
            font-family: 'Graphik', sans-serif;
          "
        >
          ${description}
        </div>
      </div>
    `
  }

  async #generateSvg(name: string, description: string) {
    const markup = this.#buildMarkup(name, description)

    const fontsPath = app.makePath('resources/assets/fonts')

    const fontPath1 = `${fontsPath}/Graphik-Regular.ttf`
    const fontPath2 = `${fontsPath}/PolySans-Median.ttf`
    const svg = await satori(markup, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Graphik', data: await readFile(fontPath1), weight: 700, style: 'normal' },
        { name: 'PolySans', data: await readFile(fontPath2), weight: 400, style: 'normal' },
      ],
    })

    return svg
  }

  /**
   * Generate a new OpenGraph image for the given package name and description
   *
   * - First, convert HTML to SVG markup using Satori
   * - Then, convert SVG to PNG using Resvg
   * - Finally, cache the result so that we don't have to generate it again and again
   */
  async generate(name: string, description: string) {
    const base64Og = await cache.use('ogImage').getOrSet(`og-image:${name}`, async () => {
      console.log('Generating new OG image for %s', name)
      const svg = await this.#generateSvg(name, description)
      return new Resvg(svg).render().asPng().toString('base64')
    })

    return Buffer.from(base64Og, 'base64')
  }
}
