import HlJs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import slugify from '@sindresorhus/slugify'
import MarkdownItAnchor from 'markdown-it-anchor'

/**
 * MarkdownRenderer is simply responsible for rendering markdown
 * to HTML
 */
export class MarkdownRenderer {
  #renderer: MarkdownIt

  constructor() {
    this.#renderer = new MarkdownIt({
      html: true,
      highlight(str, lang) {
        if (lang && HlJs.getLanguage(lang)) {
          try {
            return HlJs.highlight(lang, str).value
          } catch (__) {}
        }

        return ''
      },
    })

    this.#renderer.use(MarkdownItAnchor, { slugify: (str) => slugify(str) })
  }

  render(markdown: string): string {
    return this.#renderer.render(markdown)
  }
}
