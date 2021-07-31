export const colorMapping = {
  1: 'red', // #00b88d;
  2: 'green', // #304b7d;
  3: 'blue', // #ef5675;
  4: 'yellow' // #ffa601;
};

// background: #f8f8f8;
// line-item border-bottom: 1px solid rgb(221, 221, 221);

export const roleStatuses = () => [
  { key: 0, value: 'draft', label: 'Draft' },
  { key: 10, value: 'submitted', label: 'Pending approval' },
  { key: 20, value: 'active', label: 'Active' },
  { key: 30, value: 'archived', label: 'Archived' }
];


export const columns = ['Candidate Name', 'Status', '# Apps', 'Last Action']