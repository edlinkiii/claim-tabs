import {STYLES} from "./constants.js";

class ClaimTabContainer extends HTMLElement {
  constructor() {
    super();
    
    this.claims = [];
    
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();

    this.listen();
  }

  render() {
    this.shadowRoot.innerHTML = this.template(this);

    if(!this.querySelector("claim-tab[is-active='true']") && this.querySelectorAll("claim-tab").length > 0) {
      this.querySelectorAll("claim-tab")[0].isActive = true;
    }
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
        claim-tab {
          float: left;
          padding: ${STYLES.TAB_PADDING}px;
          height: ${STYLES.TAB_HEIGHT}px;
          background-color: #123b62;
          border-radius: 5px;
          min-width: ${STYLES.TAB_MIN_WIDTH}px;
          max-width: ${STYLES.TAB_MAX_WIDTH}px;
          margin: ${STYLES.TAB_MARGIN}px;
          display: block;
          box-sizing: border-box;
        }
        claim-tab a.claim-link {
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
        claim-tab a.close-claim {
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
    this.shadowRoot.addEventListener("click", (e) => {
      e.preventDefault();
      if(e.target.nodeName === "A") {
        if(e.target.classList.contains("claim-link")) {
          this.selectClaimTab(e.target.parentNode);
        }
        else if(e.target.classList.contains("close-claim")) {
          this.removeClaimTab(e.target.parentNode);
        }
      }
    });
  }
}

customElements.define('claim-tab-container', ClaimTabContainer);
