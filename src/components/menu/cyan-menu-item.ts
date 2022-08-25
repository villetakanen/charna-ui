import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { cyanUIComponentStyles } from '../../styles/cyan-component-style'

@customElement('cyan-menu-item')
export class CyanMenuItem extends LitElement {
  
  static styles = css`
    ${cyanUIComponentStyles}
    :host li {
      list-style: none;
      line-height: 40px;
      margin: 0;
      padding: 4px 16px;
      border-radius: 6px;
    }
    :host li:hover {
      background-color: var(--cyan-menu-item-hover-background-color);
    }
    .prepend {
      margin-right: 16px;
    }
    a {
      text-decoration: none;
    }
    a, span.clickable {
      display: block;
      width: 100%;
      height: 100%;
      cursor: context-menu;
      text-align: left;
      color: var(--cyan-menu-item-text-color);
    }
  `

  @property({ type: String })
    noun = ''

  @property({ type: String })
    route = ''

  handleClick (e: Event) {
    console.log('handleClick', e)
    this.dispatchEvent(new CustomEvent('close', {bubbles: true, composed: true}))
  }

  render () {
    const content = this.noun ? html`<cyan-icon noun="${this.noun}" small class="prepend"></cyan-icon><slot></slot>` : html`<slot></slot>`
    return html`<li @click="${this.handleClick}">
      ${ this.route ? html`<a href="${this.route}">${content}</a>` : html`<span class="clickable">${content}</span>` }
  </li>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cyan-menu-item': CyanMenuItem
  }
}