import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import cache from '@adonisjs/cache/services/main'

export class OgImageGenerator {
  #buildMarkup(name: string, description: string) {
    return html`
      <div
        style="
          display: flex;
          height: 100%;
          width: 100%;
          align-items: flex-start;
          justify-content: space-between;
          flex-direction: column;
          background-color: #212121;
          font-size: 50;
          padding: 65px 100px;
          letter-spacing: -2;
          font-weight: 800;
          text-align: left;
        "
      >
        <div
          style="
            background: radial-gradient(circle, rgba(84,104,255,1) 0%, rgba(28,28,28,0) 45%);
            width: 3000;
            height: 1200;
            opacity: 0.3;
            top: -100;
            left: -200;
            position: absolute;
            display: flex;
          "
        />

        <!-- Radial gradient at left -->
        <div
          style="
            background: radial-gradient(circle, rgba(95,44,124,1) 0%, rgba(28,28,28,0) 45%);
            opacity: 0.3;
            width: 3000;
            height: 1200;
            top: -500;
            right: -400;
            position: absolute;
            display: flex;
          "
        />

        <svg
          width="115"
          height="36"
          viewBox="0 0 115 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 17.6942C0 31.9648 3.365 35.3884 17.3917 35.3884C31.4184 35.3884 34.7835 31.9648 34.7835 17.6942C34.7835 3.42352 31.4184 0 17.3917 0C3.365 0 0 3.42352 0 17.6942ZM7.01336 21.3699L12.4682 8.757C13.3892 6.63081 15.1602 5.47763 17.3917 5.47763C19.6233 5.47763 21.3943 6.63081 22.3152 8.757L27.7701 21.3699C28.018 21.9826 28.2306 22.7755 28.2306 23.4601C28.2306 26.5953 26.0699 28.7936 22.9883 28.7936C21.9386 28.7936 21.1049 28.521 20.2611 28.2452C19.3965 27.9626 18.5211 27.6765 17.3917 27.6765C16.2754 27.6765 15.3787 27.9652 14.4969 28.249C13.6441 28.5235 12.8053 28.7936 11.7952 28.7936C8.71357 28.7936 6.55289 26.5953 6.55289 23.4601C6.55289 22.7755 6.76542 21.9826 7.01336 21.3699ZM17.3917 10.9552L12.0077 23.352C13.6016 22.5952 15.4435 22.2349 17.3917 22.2349C19.269 22.2349 21.1817 22.5952 22.7048 23.352L17.3917 10.9552Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M100.187 8.70886C98.9789 8.70886 98.1069 9.57909 98.1069 10.7906C98.1069 12.002 98.9789 12.8723 100.187 12.8723C101.394 12.8723 102.266 12.002 102.266 10.7906C102.266 9.57909 101.394 8.70886 100.187 8.70886ZM62.1483 26.5913C58.9282 26.5913 56.5969 24.1689 56.5969 20.3802C56.5969 16.5233 58.9282 14.1009 62.1483 14.1009C63.641 14.1009 64.7479 14.6128 65.402 15.6195V9.25489H68.7564V26.3183H65.402V25.1068C64.7647 26.0964 63.6578 26.5913 62.1483 26.5913ZM60.0183 20.3802C60.0183 18.2644 61.142 16.8822 62.8528 16.8822C64.5802 16.8822 65.6872 18.2472 65.6872 20.3631C65.6872 22.4448 64.5802 23.7929 62.8528 23.7929C61.142 23.7929 60.0183 22.4448 60.0183 20.3802ZM74.0227 20.3461C74.0227 18.2472 75.1464 16.8993 76.8236 16.8993C78.5175 16.8993 79.6412 18.2472 79.6412 20.3461C79.6412 22.4448 78.5175 23.7929 76.8236 23.7929C75.1464 23.7929 74.0227 22.4448 74.0227 20.3461ZM110.988 23.0592C110.988 23.6905 110.518 24.0659 109.327 24.0659C107.985 24.0659 107.147 23.3492 107.147 22.479H103.792C103.876 24.8338 106.073 26.5913 109.26 26.5913C112.279 26.5913 114.208 25.2262 114.208 22.8032C114.208 20.9945 113.067 19.7318 110.803 19.2711L108.371 18.7762C107.634 18.6227 107.197 18.2472 107.197 17.7525C107.197 17.0187 107.935 16.6263 108.874 16.6263C110.216 16.6263 110.736 17.2576 110.736 18.0084H113.922C113.838 15.7901 112.128 14.1009 108.941 14.1009C105.973 14.1009 103.96 15.6195 103.96 17.9231C103.96 20.0048 105.285 20.9433 107.264 21.3698L109.679 21.8988C110.468 22.0695 110.988 22.4107 110.988 23.0592ZM101.88 26.3183H98.5261V14.3739H101.88V26.3183ZM88.2619 14.3739V15.6195C89.1172 14.6128 90.2577 14.1009 91.6665 14.1009C94.2996 14.1009 96.0103 15.8414 96.0103 18.5374V26.3183H92.6561V19.254C92.6561 17.8036 91.851 16.9334 90.4589 16.9334C89.0669 16.9334 88.2619 17.8036 88.2619 19.254V26.3183H84.9075V14.3739H88.2619ZM76.8236 14.1009C73.2512 14.1009 70.6013 16.7286 70.6013 20.3461C70.6013 23.9636 73.2512 26.5913 76.8236 26.5913C80.4127 26.5913 83.0626 23.9636 83.0626 20.3461C83.0626 16.7286 80.4127 14.1009 76.8236 14.1009ZM48.8484 16.8822C47.1377 16.8822 46.014 18.2644 46.014 20.3802C46.014 22.4448 47.1377 23.7929 48.8484 23.7929C50.5759 23.7929 51.6827 22.4448 51.6827 20.3631C51.6827 18.2472 50.5759 16.8822 48.8484 16.8822ZM42.5925 20.3802C42.5925 24.1689 44.9238 26.5913 48.1272 26.5913C49.6534 26.5913 50.7436 26.0964 51.3977 25.1068V26.3183H54.752V14.3739H51.3977V15.6195C50.7268 14.6128 49.6199 14.1009 48.1272 14.1009C44.9238 14.1009 42.5925 16.5233 42.5925 20.3802Z"
            fill="white"
          />
        </svg>

        <!-- Package name -->
        <div
          style="
          display: flex;
          flex-direction: column;
          "
        >
          <div
            style="
            margin-top: 0;
            color: white;
            text-align: left;
            font-size: 96;
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
            font-size: 38;
            text-align: left;
            line-height: 1.4;
            max-width: 90%;
            font-family: 'Graphik', sans-serif;
          "
          >
            ${description}
          </div>
        </div>

        <div
          style="
            color: #A0A0A0;
            font-size: 18;
            bottom: 20;
            font-family: 'Graphik', sans-serif;
            letter-spacing: 0;
          "
        >
          packages.adonisjs.com
        </div>
      </div>
    `
  }

  async #generateSvg(name: string, description: string) {
    const markup = this.#buildMarkup(name, description)

    const fontsPath = app.makePath('inertia/assets/fonts')

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
    const base64Og = await cache.use('ogImage').getOrSet({
      key: `og-image:${name}`,
      factory: async () => {
        const svg = await this.#generateSvg(name, description)
        return new Resvg(svg).render().asPng().toString('base64')
      },
    })

    return Buffer.from(base64Og, 'base64')
  }
}
