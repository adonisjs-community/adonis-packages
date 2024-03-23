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
        'h1': ['id'],
        'h2': ['id'],
      },
      allowedClasses: { '*': ['*'] },
    })
  }

  /**
   * Rewrite markdown link tokens to include
   * baseUrl when there isn't one.
   */
  #rewrite(tokens: any[], baseUrl: string) {
    for (const token of tokens) {
      if (token.type === 'link_open') {
        for (const attr of token.attrs) {
          if (attr[0] === 'href') {
            const value: string = attr[1]
            try {
              new URL(value)
            } catch (_) {
              attr[1] = new URL(value, `${baseUrl}/`).href
            }
          }
        }
      }
      if (token.children !== null) {
        this.#rewrite(token.children, baseUrl)
      }
    }
  }

  /**
   * Render the markdown to HTML
   */
  render(markdown: string, baseUrl: string): string {
    this.#renderer.core.ruler.push('baseurl', (state) => {
      this.#rewrite(state.tokens, baseUrl)
    })
    const unsanitized = this.#renderer.render(markdown)
    return this.#sanitize(unsanitized)
  }
}
