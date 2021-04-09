export const demo = () => {
  // build array from cookie...?
  const claims = [
    {
      companyName: 'Pants Co',
      firstName: 'Guy',
      lastName: 'McPants',
      claimId: '00000000-0000-0000-0000-000000000001',
      controlNumber: '1234567',
      isActive: false,
    },
    {
      companyName: '',
      firstName: 'Sam',
      lastName: 'Iam',
      claimId: '00000000-0000-0000-0000-000000000002',
      controlNumber: '1234568',
      isActive: true,
    },
  ]

  // snag the container
  let claimTabs = document.querySelector("claim-tab-container");

  // fill it with claims
  claimTabs.setClaims(claims);

  // simulate opening new claim tabs
  setTimeout(() => {
    claimTabs.addClaim({
      companyName: '',
      firstName: 'John',
      lastName: 'Doe',
      claimId: '00000000-0000-0000-0000-000000000003',
      controlNumber: '1234569',
      isActive: true,
    });
  }, 1000);
  setTimeout(() => {
    claimTabs.addClaim({
      companyName: '',
      firstName: 'Jane',
      lastName: 'Doe',
      claimId: '00000000-0000-0000-0000-000000000004',
      controlNumber: '1234570',
      isActive: true,
    });
  }, 2000);
  setTimeout(() => {
    claimTabs.addClaim({
      companyName: '',
      firstName: 'Fred',
      lastName: 'Flintstone',
      claimId: '00000000-0000-0000-0000-000000000005',
      controlNumber: '1234571',
      isActive: true,
    });
  }, 3000);
  setTimeout(() => {
    claimTabs.addClaim({
      companyName: 'Stuff Mart, Inc',
      firstName: '',
      lastName: '',
      claimId: '00000000-0000-0000-0000-000000000006',
      controlNumber: '1234572',
      isActive: true,
    });
  }, 4000);
  setTimeout(() => {
    claimTabs.addClaim({
      companyName: '',
      firstName: 'Suzy',
      lastName: 'Smartypants',
      claimId: '00000000-0000-0000-0000-000000000007',
      controlNumber: '1234573',
      isActive: true,
    });
  }, 5000);
  setTimeout(() => {
    claimTabs.addClaim({
      companyName: 'Things and Stuff',
      firstName: '',
      lastName: '',
      claimId: '00000000-0000-0000-0000-000000000008',
      controlNumber: '1234574',
      isActive: true,
    });
  }, 6000);
}
