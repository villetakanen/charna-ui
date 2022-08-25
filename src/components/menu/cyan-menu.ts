import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { cyanUIComponentStyles } from '../../styles/cyan-component-style'
import { logDebug } from '../../utils/loghelpers'
import {classMap} from 'lit/directives/class-map.js';

@customElement('cyan-menu')
export class CyanMenu extends LitElement {
  
  static styles = css`
    ${cyanUIComponentStyles}
    :host {
      position: relative;
    }
    div.cyan-popup-menu-container {
      position: relative;
      margin: 0;
      padding: 2px;
      height: 44px;
      display: block;
    }
    ul.cyan_popup_menu {
      box-shadow: var(--cyan-rise-c-box-shadow);
      background-color: var(--cyan-rise-c-background-color);
      transition: all 0.3s ease;
      transform: scale(0);
      transform-origin: 50% 0;
      margin: 0;
      padding: 2px;
      width: min(220px, 100vw);
      border-radius: 8px;
      position: absolute;
      right: 0;
    }
    ul.cyan_popup_menu.open {
      transform: scale(1);
    }
  `

  @property({type: Boolean, reflect: true})
    open = false
  @property({type: String, reflect: true})
    noun = 'menu'

  handleClose (e: Event) {
    if (e.target !== this) {
      this.open = false
      this.dispatchEvent(new Event('close', {bubbles: true, composed: true}))
    }
  }

  handleFocus (e: Event) {
    logDebug('handleFocus', e)
    this.open = true
    this.dispatchEvent(new Event('open', {bubbles: true, composed: true}))
  }
  handleFocusOut (e: Event) {
    logDebug('handleFocusOut', e)
    this.open = false
    this.dispatchEvent(new Event('close', {bubbles: true, composed: true}))
  }

  render () {
    return html`
    <div 
      class="cyan-popup-menu-container"
      tabindex="0"
      @focus="${this.handleFocus}"
      @focusout="${this.handleFocusOut}"
      @blur="${this.handleFocusOut}"
      @close="${this.handleFocusOut}">
      <cyan-icon noun="${this.noun}"></cyan-icon>
      <ul class="${classMap({ cyan_popup_menu: true, open: this.open })}">
        <slot></slot>
      </ul>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cyan-menu': CyanMenu
  }
}