import {STYLES} from "./constants.js";

class ClaimTabContainer extends HTMLElement {
  constructor() {
    super();
    
    this.claims = [];
    
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.template(this);

    if(!this.querySelector("claim-tab[is-active='true']") && this.querySelectorAll("claim-tab").length > 0) {
      this.querySelectorAll("claim-tab")[0].isActive = true;
    }

    this.listen();
  }

  template({ claims }) {
    let output = /*html*/`
      <style>
        :host {
          background: #eee;
          position: fixed;
          top: 20px;
          left: 100px;
          right: 100px;
          display: flex;
          box-sizing: border-box;
          padding: 2px;
        }
      </style>
    `;
    output += claims.reduce((out, claim, i) => out += (i < this.getMaxClaimTabs()) ? /*html*/`
      <claim-tab
        company-name="${claim.companyName}"
        first-name="${claim.firstName}"
        last-name="${claim.lastName}"
        claim-id="${claim.claimId}"
        control-number="${claim.controlNumber}"
        is-active="${claim.isActive}"
      ></claim-tab>
    ` : '','');
    
    return output;
  }
  
  getContainerWidth() {
    let styles = getComputedStyle(this);
    return parseInt(styles.width);
  }
  
  getMaxClaimTabs() {
    return Math.floor(this.getContainerWidth() / (STYLES.TAB_MIN_WIDTH + STYLES.TAB_MARGIN));
  }

  setClaims(arr) {
    this.claims = arr;
    this.render();
  }

  addClaim(obj) {
    obj.isActive = true;
    this.claims.forEach((c) => { c.isActive = false; });
    this.claims.unshift(obj);
    this.render();
  }
  
  removeClaimTab(tab) {
    this.claims = this.claims.filter((c) => c.claimId != tab.claimId);
    this.render();
  }
  
  selectClaimTab(tab) {
    if(tab.isActive === "true") return;
    this.claims.forEach((c) => {
      c.isActive = (c.claimId === tab.claimId)
        ? true
        : false;
      this.render();
    });
  }

  listen() {
    this.shadowRoot.querySelectorAll("claim-tab").forEach((tab) => {
      tab.shadowRoot.querySelector("a.claim-link").addEventListener("click", (e) => {
        e.preventDefault();
        this.selectClaimTab(tab);
      });

      tab.shadowRoot.querySelector("a.close-claim").addEventListener("click", (e) => {
        e.preventDefault();
        this.removeClaimTab(tab);
      });
    });
  }
}

customElements.define('claim-tab-container', ClaimTabContainer);
