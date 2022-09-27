import Europa from 'europa'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { logDebug } from '../../utils/loghelpers'
import { CyanTextarea } from './cyan-textarea'

@customElement('cyan-markdown-area')
export class CyanMarkdownArea extends CyanTextarea {


  handlePaste (e: ClipboardEvent) {
    // We got this - no need to propagate
    e.preventDefault()
    e.stopPropagation()
    
    // Get the text representation of the clipboard
    const clipboardData = e.clipboardData
    if (!clipboardData) return

    // Do some magic here
    const text = clipboardData.getData('text/html')
    const europa = new Europa()
    const magic = europa.convert(text)

    // Insert the data to the textarea
    const textarea = this.shadowRoot?.querySelector('textarea')
    if (!textarea) return // Should not happen

    const before = textarea.value.substring(0, textarea.selectionStart)
    const after = textarea.value.substring(textarea.selectionEnd, textarea.value.length)

    textarea.value = before + magic + after

    logDebug('cyan-markdown-area','Pasted', magic)
    this.onChange(e)
  }

  /*ahandlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
  
    // We got a clipboard event, let's see what it contains
    const clipboardData = e.clipboardData
    if(!clipboardData) return
  
    const html = e.clipboardData.getData('text/html')
    if (html) {
      const europa = new Europa()
      const markdown = europa.convert(html)
      
      logDebug('Markdown', markdown)


      // Insert the markdown
      const el = this.shadowRoot?.querySelector('textarea')
      logDebug('Element', el?.name)
      if (el) {
        const selectionStart = el.selectionStart
        const selectionEnd = el.selectionEnd
        logDebug('Selection', selectionStart, selectionEnd)
        if (selectionStart && selectionEnd) {
          const before = el.value.substring(0, selectionStart)
          const after = el.value.substring(selectionEnd)
          el.value = before + '\n' + markdown + '\n' + after
        }
        else {
          el.value += markdown
        }
      }
      this.onChange(e)
    }
  }*/

  render () {
    const height = this.rows * 24 + 'px'
    return html`
    <style>
        :host textarea {
          height: ${height};
        }
      </style>
      <label class="cyan-textfield">
        <textarea
          @paste=${this.handlePaste}
          placeholder="${this.placeholder}" 
          @input="${this.onChange}"
          @change="${this.onChange}"
          @blur="${this.onBlur}">${this.value}</textarea>
        ${ this.label ? html`<span class="cyan-field-label">${this.hasAttribute('error') ? this.getAttribute('error') : this.label}</span>` : '' }
      </label>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cyan-markdown-area': CyanMarkdownArea
  }
}
