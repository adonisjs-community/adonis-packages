import HlJs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import slugify from '@sindresorhus/slugify'
import * as sanitizeHtml from 'sanitize-html'
import MarkdownItAnchor from 'markdown-it-anchor'

/**
 * MarkdownRenderer is simply responsible for rendering markdown
 * to HTML
 */
export class MarkdownRenderer {
  #renderer: MarkdownIt

  constructor() {
    this.#renderer = new MarkdownIt({ html: true, highlight: this.#highlight })
    this.#renderer.use(MarkdownItAnchor, { slugify: (str) => slugify(str) })
  }

  /**
   * Highlight the markdown using highlight.js
   */
  #highlight(str: string, lang: string) {
    if (!lang || !HlJs.getLanguage(lang)) return ''

    try {
      return HlJs.highlight(str, { language: lang }).value
    } catch (__) {
      return ''
    }
  }

  /**
   * Sanitize the final HTML to prevent XSS
   * We are allowing `img` tag since they are used a lot
   * in the READMEs
   */
  #sanitize(html: string) {
    return sanitizeHtml.default(html, {
      allowedTags: sanitizeHtml.default.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitizeHtml.default.defaults.allowedAttributes,
        '*': ['class', 'align'],
      },
      allowedClasses: { '*': ['*'] },
    })
  }

  /**
   * Render the markdown to HTML
   */
  render(markdown: string): string {
    const unsanitized = this.#renderer.render(markdown)
    return this.#sanitize(unsanitized)
  }
}
