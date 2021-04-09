import {STYLES} from "./constants.js";

class ClaimTab extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  static get observedAttributes() {
    return [
      'is-active', 
      'first-name', 
      'last-name', 
      'company-name', 
      'control-number', 
      'claim-id'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'first-name' || name === 'last-name' || name === 'company-name') {
      this.displayName = (this.companyName) 
        ? this.companyName 
        : `${this.lastName}, ${this.firstName}`;
    }
    
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = this.template(this);
  }
  
  template({ isActive, claimId, controlNumber, displayName }) {
    return /*html*/`
      <style>
        :host {
          float: left;
          padding: ${STYLES.TAB_PADDING}px;
          height: ${STYLES.TAB_HEIGHT}px;
          background-color: #123b62;
          border-radius: 5px;
          min-width: ${STYLES.TAB_MIN_WIDTH}px;
          max-width: ${STYLES.TAB_MAX_WIDTH}px;
          margin: ${STYLES.TAB_MARGIN}px;
          opacity: ${(isActive === 'true') ? '1' : '0.5'};
          display: block;
          box-sizing: border-box;
        }
        a.claim-link {
          color: white;
          line-height: 24px;
          padding-right: 2px;
          white-space: nowrap;
          overflow: hidden;
          display: block;
          text-decoration: none;
          font-size: 85%;
          font-family: 'Open Sans Regular', Arial, Helvetica, sans-serif;
        }
        a.close-claim {
          float: right;
          margin-top: -6px;
          margin-right: -6px;
          cursor: pointer;
          color: #fff;
          border: 1px solid #AEAEAE;
          border-radius: 30px;
          background: #7a3030;
          font-size: 12px;
          font-weight: bold;
          line-height: 0px;
          padding: 5px 2.5px 7px 2.5px;
          z-index: 888;
        }
      </style>
      <a class="close-claim" data-claim-id="${claimId}">&times;</a>
      <a class="claim-link" data-claim-id="${claimId}" href="/#overview/${claimId}">${controlNumber} (${displayName})</a>
     `;
  }

  set isActive(val) {
    (val)
      ? this.setAttribute('is-active', val)
      : this.removeAttribute('is-active');
  }
  get isActive() {
    return this.getAttribute('is-active');
  }
  
  set firstName(val) {
    (val)
      ? this.setAttribute('first-name', val)
      : this.removeAttribute('first-name');
  }
  get firstName() {
    return this.getAttribute('first-name');
  }
  
  set lastName(val) {
    (val)
      ? this.setAttribute('last-name', val)
      : this.removeAttribute('last-name');
  }
  get lastName() {
    return this.getAttribute('last-name');
  }
  
  set companyName(val) {
    (val)
      ? this.setAttribute('company-name', val)
      : this.removeAttribute('company-name');
  }
  get companyName() {
    return this.getAttribute('company-name');
  }
  
  set controlNumber(val) {
    (val)
      ? this.setAttribute('control-number', val)
      : this.removeAttribute('control-number');
  }
  get controlNumber() {
    return this.getAttribute('control-number');
  }
  
  set claimId(val) {
    (val)
      ? this.setAttribute('claim-id', val)
      : this.removeAttribute('claim-id');
  }
  get claimId() {
    return this.getAttribute('claim-id');
  }
}

customElements.define('claim-tab', ClaimTab);
