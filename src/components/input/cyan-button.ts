import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { cyanUIComponentStyles } from '../../styles/cyan-component-style'
import { classMap } from 'lit/directives/class-map.js'

@customElement('cyan-button')
export class CyanButton extends LitElement {

  static styles = css`
    ${cyanUIComponentStyles}
    :host button {
      color: var(--cyan-button-color);
      background-color: var(--cyan-button-background-color);
      border: none;
      height: 38px;
      margin: 5px;
      padding: 0 18px;
      border-radius: 19px;
      transition-property: box-shadow background;
      transition-duration: 0.3s;
      position: relative;
      // TODO: Ideally this would come from Atomics.sass
      font-family: 'Cabin', 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 36px;
      letter-spacing: 1.25px;
      display: inline-block;
    }
    :host button:hover {
      background-color: var(--cyan-button-background-color-hover);
    }
    :host button:active {
      background-color: var(--cyan-button-background-color-active);
    }
    :host button:disabled {
      background-color: var(--cyan-button-background-color-disabled);
    }
    :host([text]) button {
      color: var(--cyan-UI-text-color);
      background: none;
    }
    :host([text]) button:hover {
      background-color: var(--cyan-button-text-background-color-hover);
    }
    :host([text]) button:active {
      background-color: var(--cyan-button-text-background-color-active);
    }
    :host([text]) button:disabled {
      color: var(--cyan-UI-text-color-disabled);
      background-color: var(--cyan-button-text-background-color-disabled);
    }
  `
  @property({ type: String, reflect: true })
    label = ''

  @property({ type: String, reflect: true })
    noun = ''

  @property({ type: String, reflect: true })
    working = ''

  @property({ type: Boolean, reflect: true })
    secondary = false

  @property({ type: Boolean, reflect: true })
    text = false

  @property({ type: Boolean, reflect: true })
    disabled = false

  render () {
    const classes = classMap({
      'secondary': this.secondary && !this.text,
      'text': this.text,
      'working': this.working
    })
    return html`
      <button class="${classes}" ?disabled="${this.disabled}">
        ${ this.noun ? html`<cyan-icon small ?dark="${!this.text}" noun="${this.noun}" style="margin-left: -4px; margin-right: 2px; margin-top:-6px; display: inline-block"></cyan-icon>` : '' }
        ${ this.label }
        ${ this.working ? html`<cyan-save-interaction ?active="${this.working == 'true' }" style="display: inline-block; line-height: 26px; vertical-align: middle; margin-right: -8px; margin-top: -3px">` : '' }
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cyan-button': CyanButton
  }
}