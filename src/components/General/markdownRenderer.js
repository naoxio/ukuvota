import markdownIt from 'markdown-it'
import markdownLinkAttributes from 'markdown-it-link-attributes'

const md = markdownIt('zero', {
  html: false,
  breaks: true,
  linkify: true,
  typopgrapher: true,
  quotes: '“”‘’'
})
  .use(markdownLinkAttributes, [
    {
      attrs: {
        target: '_blank',
        rel: 'noopener nofollow noreferrer'
      }
    }
  ])
  .enable([
    'heading',
    'emphasis',
    'strikethrough',
    'blockquote',
    'newline',
    'image',
    'link',
    'backticks',
    'linkify',
    'hr',
    'list',
    'fence',
    'code'
  ])

export default md
