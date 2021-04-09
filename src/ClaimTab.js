class ClaimTab extends HTMLElement {
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
    this.innerHTML = this.template(this);
    this.style["opacity"] = (this.isActive === 'true') ? '1' : '0.5';
  }
  
  template({ isActive, claimId, controlNumber, displayName }) {
    return /*html*/`
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
