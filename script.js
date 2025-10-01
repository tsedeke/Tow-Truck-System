const dashboardStatusMetricsEl = document.querySelector('#status-metrics');
const dashboardDispatchRowsEl = document.querySelector('#dashboard-dispatch-rows');
const impoundListEl = document.querySelector('#impound-list');
const statusFilterEl = document.querySelector('#status-filter');
const refreshBoardButton = document.querySelector('#refresh-board');
const goToDispatchButton = document.querySelector('#go-to-dispatch');

const navLinks = document.querySelectorAll('.nav-link[data-view-target]');
const views = document.querySelectorAll('.view[data-view]');

const dispatchFilterForm = document.querySelector('#dispatch-filter-form');
const dispatchDriverFilterEl = document.querySelector('#filter-driver');
const dispatchZoneFilterEl = document.querySelector('#filter-zone');
const callSummaryEl = document.querySelector('#call-summary');
const callCountBadges = document.querySelectorAll('[data-call-count]');
const callTableBodies = {
  active: document.querySelector('[data-call-body="active"]'),
  canceled: document.querySelector('[data-call-body="canceled"]'),
  queued: document.querySelector('[data-call-body="queued"]')
};
const liveCallCountEl = document.querySelector('#live-call-count');

const dispatchTabs = document.querySelectorAll('.dispatch-tab');
const dispatchPanels = document.querySelectorAll('.dispatch-panel');

const messagingRosterEl = document.querySelector('#messaging-roster');
const messageLogEl = document.querySelector('#message-log');
const messageFormEl = document.querySelector('#message-form');
const messageInputEl = document.querySelector('#message-input');
const markThreadReadButton = document.querySelector('#mark-thread-read');
const messageSubmitButton = messageFormEl?.querySelector('button[type="submit"]');
const activeThreadNameEl = document.querySelector('#active-thread-name');
const activeThreadStatusEl = document.querySelector('#active-thread-status');

const surveyFilterForm = document.querySelector('#survey-filter-form');
const surveyListEl = document.querySelector('#survey-list');

const statusLabels = {
  waiting: 'Waiting',
  dispatched: 'Dispatched',
  enroute: 'En Route',
  onscene: 'On Scene',
  towing: 'Towing',
  completed: 'Completed',
  canceled: 'Canceled'
};

const dashboardDispatchMetrics = [
  { key: 'waiting', label: statusLabels.waiting, count: 8, subtext: 'Open calls awaiting dispatch' },
  { key: 'dispatched', label: statusLabels.dispatched, count: 5, subtext: 'Drivers acknowledged' },
  { key: 'enroute', label: statusLabels.enroute, count: 3, subtext: 'Drivers headed to scene' },
  { key: 'onscene', label: statusLabels.onscene, count: 2, subtext: 'Vehicles secured' },
  { key: 'towing', label: statusLabels.towing, count: 4, subtext: 'In transit to destination' },
  { key: 'completed', label: statusLabels.completed, count: 16, subtext: 'Finished in last 24h' },
  { key: 'canceled', label: statusLabels.canceled, count: 1, subtext: 'Canceled in last 24h' }
];

const dashboardDispatchTickets = [
  {
    id: 'TB-1045',
    customer: 'Samantha Lee',
    vehicle: '2019 Toyota Camry',
    location: 'I-94 Exit 23',
    driver: 'Ralph Simmons',
    status: 'waiting',
    eta: '10 min'
  },
  {
    id: 'TB-1042',
    customer: 'City Parking Enforcement',
    vehicle: '2015 Ford F-150',
    location: 'Downtown Lot C',
    driver: 'Marta Diaz',
    status: 'dispatched',
    eta: 'Driver En Route'
  },
  {
    id: 'TB-1039',
    customer: 'Erik Nelson',
    vehicle: '2022 Tesla Model 3',
    location: 'Grand Ave & 5th',
    driver: 'Jordan Blake',
    status: 'enroute',
    eta: '5 min'
  },
  {
    id: 'TB-1035',
    customer: 'Metro Police',
    vehicle: '2010 Honda Civic',
    location: 'Precinct 7',
    driver: 'Ralph Simmons',
    status: 'onscene',
    eta: 'Securing'
  },
  {
    id: 'TB-1033',
    customer: 'AAA Motor Club',
    vehicle: '2016 Jeep Wrangler',
    location: 'County Rd 12',
    driver: 'Amelia Cross',
    status: 'towing',
    eta: '30 min'
  },
  {
    id: 'TB-1028',
    customer: 'Allied Insurance',
    vehicle: '2018 BMW X5',
    location: 'Service Center',
    driver: 'Luka Petrović',
    status: 'completed',
    eta: 'Delivered'
  },
  {
    id: 'TB-1026',
    customer: 'Private Property Impound',
    vehicle: '2008 Chevy Malibu',
    location: 'Lot 42A',
    driver: 'Marta Diaz',
    status: 'canceled',
    eta: 'N/A'
  }
];

const impoundVehicles = [
  {
    title: 'INV-8841 · Ford Transit',
    owner: 'City Maintenance',
    holdReason: 'Expired permits',
    releaseDate: 'Pending'
  },
  {
    title: 'INV-8823 · Dodge Charger',
    owner: 'Leonard Jackson',
    holdReason: 'Police hold',
    releaseDate: 'Review 10/01'
  },
  {
    title: 'INV-8810 · Toyota Prius',
    owner: 'EcoRide Rentals',
    holdReason: 'Awaiting payment',
    releaseDate: 'Due 09/30'
  }
];

const reportingMetrics = {
  revenue: '$48,230',
  responseTime: '22m 14s',
  activeContracts: '34'
};

const callProgressMeta = {
  new: {
    label: 'New Calls',
    description: 'Logged in the last hour',
    accent: 'accent-new'
  },
  waiting: {
    label: 'Waiting',
    description: 'Driver acknowledged and en route',
    accent: 'accent-waiting'
  },
  destination: {
    label: 'Destination Arrived',
    description: 'Vehicle at drop-off location',
    accent: 'accent-destination'
  },
  completed: {
    label: 'Completed',
    description: 'Delivered to destination',
    accent: 'accent-completed'
  },
  canceled: {
    label: 'Canceled',
    description: 'Canceled by customer or dispatcher',
    accent: 'accent-canceled'
  },
  queued: {
    label: 'Queued',
    description: 'Awaiting scheduling window',
    accent: 'accent-queued'
  }
};

const dispatchCalls = [
  {
    id: 'TB-2078',
    customer: 'City of Detroit PD',
    vehicle: '2018 Ford Explorer · Unit 42',
    location: 'Mack Ave & Alter Rd',
    driver: 'Ralph Simmons',
    dispatcher: 'Tsedeke Girma',
    zone: 'East',
    status: 'active',
    progress: 'waiting',
    openedAt: '2024-09-30T07:45:00',
    updatedAt: '2024-09-30T08:24:00',
    eta: '12 min',
    incidentType: 'Police Tow',
    notes: 'Driver confirmed arrival in 12 minutes.'
  },
  {
    id: 'TB-2081',
    customer: 'Allied Insurance',
    vehicle: '2022 Tesla Model Y',
    location: 'Grand Circus Park Garage',
    driver: 'Amelia Cross',
    dispatcher: 'Tsedeke Girma',
    zone: 'Central',
    status: 'active',
    progress: 'new',
    openedAt: '2024-09-30T08:10:00',
    updatedAt: '2024-09-30T08:18:00',
    eta: 'Assign driver',
    incidentType: 'Accident',
    notes: 'Need flatbed, waiting on driver confirmation.'
  },
  {
    id: 'TB-2072',
    customer: 'AAA Motor Club',
    vehicle: '2017 Honda Accord',
    location: 'I-75 Exit 32',
    driver: 'Jordan Blake',
    dispatcher: 'Morgan Wu',
    zone: 'South',
    status: 'active',
    progress: 'destination',
    openedAt: '2024-09-30T06:58:00',
    updatedAt: '2024-09-30T08:12:00',
    eta: 'Arrived',
    incidentType: 'Breakdown',
    notes: 'Drop-off at Lakeside Service complete.'
  },
  {
    id: 'TB-2066',
    customer: 'City Parking Enforcement',
    vehicle: '2009 Ford Econoline',
    location: 'Downtown Lot C',
    driver: 'Marta Diaz',
    dispatcher: 'Morgan Wu',
    zone: 'Central',
    status: 'canceled',
    progress: 'canceled',
    openedAt: '2024-09-29T22:10:00',
    updatedAt: '2024-09-30T07:20:00',
    eta: 'N/A',
    incidentType: 'Impound',
    notes: 'Canceled by enforcement due to duplicate entry.',
    reason: 'Duplicate request from partner portal.'
  },
  {
    id: 'TB-2075',
    customer: 'Private Property Impound',
    vehicle: '2011 Chevy Silverado',
    location: 'Lot 42A',
    driver: 'Luka Petrović',
    dispatcher: 'Morgan Wu',
    zone: 'West',
    status: 'queued',
    progress: 'queued',
    openedAt: '2024-09-30T06:15:00',
    updatedAt: '2024-09-30T06:45:00',
    eta: 'Scheduled 09:30 AM',
    incidentType: 'Private Property',
    notes: 'Hold until tenant notification complete.',
    requestedAt: '2024-09-30T06:12:00',
    scheduledFor: '2024-09-30T09:30:00'
  },
  {
    id: 'TB-2069',
    customer: 'City of Detroit DPW',
    vehicle: '2016 Freightliner Dump Truck',
    location: 'Jefferson & Mt. Elliott',
    driver: 'Ralph Simmons',
    dispatcher: 'Tsedeke Girma',
    zone: 'East',
    status: 'active',
    progress: 'waiting',
    openedAt: '2024-09-30T07:05:00',
    updatedAt: '2024-09-30T08:02:00',
    eta: '18 min',
    incidentType: 'Equipment Failure',
    notes: 'Awaiting police clearance for tow route.'
  },
  {
    id: 'TB-2059',
    customer: 'Metro Police',
    vehicle: '2014 Dodge Charger',
    location: 'Precinct 7',
    driver: 'Jordan Blake',
    dispatcher: 'Morgan Wu',
    zone: 'North',
    status: 'active',
    progress: 'completed',
    openedAt: '2024-09-29T23:58:00',
    updatedAt: '2024-09-30T07:55:00',
    eta: 'Completed',
    incidentType: 'Evidence Hold',
    notes: 'Vehicle secured in impound yard #3.'
  },
  {
    id: 'TB-2082',
    customer: 'Quick Tow Partners',
    vehicle: '2015 Ford F-150',
    location: 'Livernois & W 7 Mile',
    driver: 'Pending Assignment',
    dispatcher: 'Tsedeke Girma',
    zone: 'West',
    status: 'queued',
    progress: 'queued',
    openedAt: '2024-09-30T08:20:00',
    updatedAt: '2024-09-30T08:20:00',
    eta: 'Needs assignment',
    incidentType: 'Partner Transfer',
    notes: 'Awaiting confirmation from partner network.',
    requestedAt: '2024-09-30T08:18:00',
    scheduledFor: '2024-09-30T09:00:00'
  },
  {
    id: 'TB-2068',
    customer: 'Evergreen Insurance',
    vehicle: '2020 Subaru Outback',
    location: 'I-96 Service Dr',
    driver: 'Amelia Cross',
    dispatcher: 'Morgan Wu',
    zone: 'North',
    status: 'active',
    progress: 'waiting',
    openedAt: '2024-09-30T07:18:00',
    updatedAt: '2024-09-30T08:11:00',
    eta: '15 min',
    incidentType: 'Breakdown',
    notes: 'Flat tire. Customer riding with driver.'
  },
  {
    id: 'TB-2051',
    customer: 'Customer Walk-in',
    vehicle: '2008 Toyota Corolla',
    location: 'Yard Intake',
    driver: 'Warehouse Team',
    dispatcher: 'Morgan Wu',
    zone: 'Central',
    status: 'canceled',
    progress: 'canceled',
    openedAt: '2024-09-29T18:10:00',
    updatedAt: '2024-09-29T19:30:00',
    eta: 'N/A',
    incidentType: 'Release',
    notes: 'Customer picked up before dispatch.',
    reason: 'Walk-in release prior to dispatch.'
  }
];

const driverProfiles = [
  {
    id: 'driver-ralph-simmons',
    name: 'Ralph Simmons',
    unit: 'Unit 12 · Heavy Duty',
    zone: 'East',
    status: 'On Scene',
    lastActive: '08:26 AM',
    messages: [
      { id: 'm1', from: 'driver', body: 'Arrived at Mack & Alter. Setting up safety cones.', timestamp: '08:21 AM', read: false },
      { id: 'm2', from: 'dispatcher', body: 'Copy. Let me know when vehicle is secured.', timestamp: '08:22 AM', read: true }
    ]
  },
  {
    id: 'driver-amelia-cross',
    name: 'Amelia Cross',
    unit: 'Unit 7 · Flatbed',
    zone: 'Central',
    status: 'En Route',
    lastActive: '08:18 AM',
    messages: [
      { id: 'm3', from: 'dispatcher', body: 'Need your status on Tesla Model Y.', timestamp: '08:15 AM', read: true },
      { id: 'm4', from: 'driver', body: 'Waiting on clearance to enter garage.', timestamp: '08:17 AM', read: false }
    ]
  },
  {
    id: 'driver-jordan-blake',
    name: 'Jordan Blake',
    unit: 'Unit 4 · Wrecker',
    zone: 'South',
    status: 'Drop-off',
    lastActive: '08:12 AM',
    messages: [
      { id: 'm5', from: 'driver', body: 'Arrived at Lakeside Service. Completing paperwork.', timestamp: '08:11 AM', read: false }
    ]
  },
  {
    id: 'driver-marta-diaz',
    name: 'Marta Diaz',
    unit: 'Unit 9 · Wheel Lift',
    zone: 'Central',
    status: 'Standby',
    lastActive: '08:07 AM',
    messages: [
      { id: 'm6', from: 'dispatcher', body: 'Hold position until further notice.', timestamp: '07:55 AM', read: true }
    ]
  }
];

const surveyTemplates = [
  {
    id: 'survey-cust-01',
    title: 'Customer Tow Satisfaction',
    category: 'customer',
    status: 'active',
    lastSent: '2024-09-29',
    responses: 42,
    completionRate: 0.78
  },
  {
    id: 'survey-driver-01',
    title: 'Driver Daily Checklist',
    category: 'driver',
    status: 'scheduled',
    lastSent: '2024-09-28',
    responses: 24,
    completionRate: 0.92
  },
  {
    id: 'survey-vendor-01',
    title: 'Body Shop Partner Feedback',
    category: 'vendor',
    status: 'paused',
    lastSent: '2024-09-15',
    responses: 12,
    completionRate: 0.54
  },
  {
    id: 'survey-cust-02',
    title: 'Roadside Assistance Follow-up',
    category: 'customer',
    status: 'active',
    lastSent: '2024-09-30',
    responses: 65,
    completionRate: 0.83
  },
  {
    id: 'survey-driver-02',
    title: 'Driver Equipment Audit',
    category: 'driver',
    status: 'paused',
    lastSent: '2024-09-10',
    responses: 18,
    completionRate: 0.61
  }
];

let currentDispatchFilters = {
  customer: '',
  vehicle: '',
  driver: '',
  zone: '',
  startDate: null,
  endDate: null
};

let activeDispatchTab = 'view-calls';
let activeDriverId = null;
let surveyFilters = {
  category: 'all',
  status: 'all',
  search: ''
};

function generateMessageId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function setActiveView(target) {
  const targetView = Array.from(views).find((view) => view.dataset.view === target);
  if (!targetView) {
    return;
  }

  views.forEach((view) => {
    view.hidden = view !== targetView;
  });

  navLinks.forEach((link) => {
    const isActive = link.dataset.viewTarget === target;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

function renderDashboardMetrics() {
  if (!dashboardStatusMetricsEl) return;

  const fragment = document.createDocumentFragment();
  dashboardDispatchMetrics.forEach(({ label, count, subtext }) => {
    const card = document.createElement('article');
    card.className = 'metric-card';
    card.innerHTML = `
      <div class="metric-title">${label}</div>
      <div class="metric-value">${count}</div>
      <div class="metric-subtext">${subtext}</div>
    `;
    fragment.appendChild(card);
  });
  dashboardStatusMetricsEl.appendChild(fragment);
}

function renderDashboardDispatchRows(filter = 'all') {
  if (!dashboardDispatchRowsEl) return;

  dashboardDispatchRowsEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  dashboardDispatchTickets
    .filter((ticket) => filter === 'all' || ticket.status === filter)
    .forEach((ticket) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ticket.id}</td>
        <td>${ticket.customer}</td>
        <td>${ticket.vehicle}</td>
        <td>${ticket.location}</td>
        <td>${ticket.driver}</td>
        <td><span class="status-chip status-${ticket.status}">${statusLabels[ticket.status] ?? ticket.status}</span></td>
        <td>${ticket.eta}</td>
      `;
      fragment.appendChild(row);
    });

  if (!fragment.children.length) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="7" class="empty">No tickets match the selected status.</td>';
    fragment.appendChild(emptyRow);
  }

  dashboardDispatchRowsEl.appendChild(fragment);
}

function renderImpounds() {
  if (!impoundListEl) return;

  const fragment = document.createDocumentFragment();
  impoundVehicles.forEach(({ title, owner, holdReason, releaseDate }) => {
    const item = document.createElement('li');
    item.className = 'impound-item';
    item.innerHTML = `
      <h3>${title}</h3>
      <span>Owner: ${owner}</span>
      <span>Hold Reason: ${holdReason}</span>
      <span>Release: ${releaseDate}</span>
    `;
    fragment.appendChild(item);
  });
  impoundListEl.appendChild(fragment);
}

function renderReports() {
  const revenueEl = document.querySelector('#report-revenue');
  const responseEl = document.querySelector('#report-response');
  const contractsEl = document.querySelector('#report-contracts');

  if (revenueEl) revenueEl.textContent = reportingMetrics.revenue;
  if (responseEl) responseEl.textContent = reportingMetrics.responseTime;
  if (contractsEl) contractsEl.textContent = reportingMetrics.activeContracts;
}

function populateDispatchFilters() {
  if (!dispatchDriverFilterEl || !dispatchZoneFilterEl) return;

  const personnel = new Set();
  const zones = new Set();

  dispatchCalls.forEach((call) => {
    if (call.driver) personnel.add(call.driver);
    if (call.dispatcher) personnel.add(call.dispatcher);
    if (call.zone) zones.add(call.zone);
  });

  const sortedPersonnel = Array.from(personnel).sort((a, b) => a.localeCompare(b));
  const sortedZones = Array.from(zones).sort((a, b) => a.localeCompare(b));

  sortedPersonnel.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    dispatchDriverFilterEl.appendChild(option);
  });

  sortedZones.forEach((zone) => {
    const option = document.createElement('option');
    option.value = zone;
    option.textContent = zone;
    dispatchZoneFilterEl.appendChild(option);
  });
}

function normalizeText(value) {
  return value ? value.toString().trim().toLowerCase() : '';
}

function getFiltersFromForm() {
  if (!dispatchFilterForm) return { ...currentDispatchFilters };

  const formData = new FormData(dispatchFilterForm);
  const customer = normalizeText(formData.get('customer'));
  const vehicle = normalizeText(formData.get('vehicle'));
  const driver = normalizeText(formData.get('driver'));
  const zone = normalizeText(formData.get('zone'));

  const startRaw = formData.get('startDate');
  const endRaw = formData.get('endDate');

  const startDate = startRaw ? new Date(startRaw) : null;
  const endDate = endRaw ? new Date(endRaw) : null;

  if (endDate) {
    endDate.setHours(23, 59, 59, 999);
  }

  return {
    customer,
    vehicle,
    driver,
    zone,
    startDate: startDate && !Number.isNaN(startDate.valueOf()) ? startDate : null,
    endDate: endDate && !Number.isNaN(endDate.valueOf()) ? endDate : null
  };
}

function callMatchesFilters(call, filters) {
  const customerText = normalizeText(call.customer);
  const vehicleText = normalizeText(call.vehicle);
  const driverText = normalizeText(call.driver);
  const dispatcherText = normalizeText(call.dispatcher);
  const zoneText = normalizeText(call.zone);

  const matchesCustomer = !filters.customer || customerText.includes(filters.customer);
  const matchesVehicle = !filters.vehicle || vehicleText.includes(filters.vehicle);
  const matchesDriver =
    !filters.driver || driverText === filters.driver || dispatcherText === filters.driver;
  const matchesZone = !filters.zone || zoneText === filters.zone;

  const openedAt = new Date(call.openedAt);
  if (filters.startDate && openedAt < filters.startDate) {
    return false;
  }
  if (filters.endDate && openedAt > filters.endDate) {
    return false;
  }

  return matchesCustomer && matchesVehicle && matchesDriver && matchesZone;
}

function formatDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  const datePart = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const timePart = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${datePart} · ${timePart}`;
}

function formatTimeOnly(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function renderCallRows(status, calls) {
  const body = callTableBodies[status];
  if (!body) return;

  body.innerHTML = '';
  const fragment = document.createDocumentFragment();

  if (!calls.length) {
    const emptyRow = document.createElement('tr');
    const columnCount = body.closest('table')?.querySelectorAll('thead th').length ?? 1;
    emptyRow.innerHTML = `<td colspan="${columnCount}" class="empty">No ${status} calls match the filters.</td>`;
    fragment.appendChild(emptyRow);
    body.appendChild(fragment);
    return;
  }

  calls.forEach((call) => {
    const row = document.createElement('tr');

    if (status === 'active') {
      row.innerHTML = `
        <td>${call.id}</td>
        <td>
          <div class="cell-primary">${call.customer}</div>
          <div class="cell-secondary">${call.location}</div>
        </td>
        <td>${call.vehicle}</td>
        <td>${call.zone}</td>
        <td>${call.driver}</td>
        <td>${call.dispatcher}</td>
        <td>${formatDateTime(call.openedAt)}</td>
        <td><span class="status-chip status-${call.progress}">${callProgressMeta[call.progress]?.label ?? call.progress}</span></td>
        <td>${call.eta}</td>
      `;
    } else if (status === 'canceled') {
      row.innerHTML = `
        <td>${call.id}</td>
        <td>
          <div class="cell-primary">${call.customer}</div>
          <div class="cell-secondary">${call.vehicle}</div>
        </td>
        <td>${call.reason ?? call.notes ?? '—'}</td>
        <td>${call.dispatcher}</td>
        <td>${formatDateTime(call.updatedAt)}</td>
      `;
    } else {
      row.innerHTML = `
        <td>${call.id}</td>
        <td>
          <div class="cell-primary">${call.customer}</div>
          <div class="cell-secondary">${call.location}</div>
        </td>
        <td>${call.vehicle}</td>
        <td>${formatDateTime(call.requestedAt ?? call.openedAt)}</td>
        <td>${formatDateTime(call.scheduledFor ?? call.updatedAt)}</td>
        <td>${call.zone}</td>
        <td>${call.notes}</td>
      `;
    }

    fragment.appendChild(row);
  });

  body.appendChild(fragment);
}

function updateCallCounts(groupedCalls) {
  callCountBadges.forEach((badge) => {
    const key = badge.dataset.callCount;
    badge.textContent = groupedCalls[key]?.length ?? 0;
  });

  if (liveCallCountEl) {
    liveCallCountEl.textContent = groupedCalls.active?.length ?? 0;
  }
}

function renderCallSummary(calls) {
  if (!callSummaryEl) return;

  callSummaryEl.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const counts = {};

  calls.forEach((call) => {
    const key = call.progress in callProgressMeta ? call.progress : 'waiting';
    counts[key] = (counts[key] ?? 0) + 1;
  });

  Object.entries(callProgressMeta).forEach(([key, meta]) => {
    const count = counts[key] ?? 0;
    const chip = document.createElement('div');
    chip.className = `summary-chip ${meta.accent}${count === 0 ? ' muted' : ''}`;
    chip.innerHTML = `
      <span class="chip-count">${count}</span>
      <div class="chip-labels">
        <span class="chip-title">${meta.label}</span>
        <span class="chip-subtitle">${meta.description}</span>
      </div>
    `;
    fragment.appendChild(chip);
  });

  callSummaryEl.appendChild(fragment);
}

function renderDispatchTables() {
  const filteredCalls = dispatchCalls.filter((call) => callMatchesFilters(call, currentDispatchFilters));

  const grouped = {
    active: [],
    canceled: [],
    queued: []
  };

  filteredCalls.forEach((call) => {
    const key = grouped[call.status] ? call.status : 'active';
    grouped[key].push(call);
  });

  Object.entries(grouped).forEach(([status, calls]) => {
    renderCallRows(status, calls);
  });

  updateCallCounts(grouped);
  renderCallSummary(filteredCalls);
}

function setActiveDispatchTab(tabId) {
  activeDispatchTab = tabId;

  dispatchTabs.forEach((tab) => {
    const isActive = tab.dataset.dispatchTab === tabId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  dispatchPanels.forEach((panel) => {
    const isActive = panel.dataset.dispatchPanel === tabId;
    panel.hidden = !isActive;
  });
}

function getUnreadCount(messages) {
  return messages.filter((message) => message.from === 'driver' && !message.read).length;
}

function renderDriverRoster() {
  if (!messagingRosterEl) return;

  messagingRosterEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  driverProfiles.forEach((driver) => {
    const unreadCount = getUnreadCount(driver.messages);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'roster-item';
    button.dataset.driverId = driver.id;
    button.innerHTML = `
      <div class="roster-top">
        <span class="roster-name">${driver.name}</span>
        <span class="roster-status">${driver.status}</span>
      </div>
      <div class="roster-bottom">
        <span class="roster-unit">${driver.unit}</span>
        <span class="roster-meta">Last update · ${driver.lastActive}</span>
      </div>
      ${unreadCount ? `<span class="roster-unread" aria-label="${unreadCount} unread messages">${unreadCount}</span>` : ''}
    `;

    if (driver.id === activeDriverId) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      setActiveDriver(driver.id);
    });

    fragment.appendChild(button);
  });

  messagingRosterEl.appendChild(fragment);
}

function scrollLogToBottom() {
  if (messageLogEl) {
    messageLogEl.scrollTop = messageLogEl.scrollHeight;
  }
}

function markDriverMessagesRead(driver) {
  let updated = false;
  driver.messages.forEach((message) => {
    if (message.from === 'driver' && !message.read) {
      message.read = true;
      updated = true;
    }
  });
  return updated;
}

function renderMessageLog(driver) {
  if (!messageLogEl) return;

  messageLogEl.innerHTML = '';

  if (!driver) {
    const emptyState = document.createElement('div');
    emptyState.className = 'message-empty';
    emptyState.textContent = 'Select a driver to view the conversation.';
    messageLogEl.appendChild(emptyState);
    return;
  }

  const fragment = document.createDocumentFragment();

  driver.messages.forEach((message) => {
    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${message.from}`;
    bubble.innerHTML = `
      <div class="message-body">${message.body}</div>
      <div class="message-meta">${message.timestamp}${message.from === 'driver' && !message.read ? ' · unread' : ''}</div>
    `;
    fragment.appendChild(bubble);
  });

  messageLogEl.appendChild(fragment);
  scrollLogToBottom();
}

function updateMessagingFormState() {
  const hasDriver = Boolean(activeDriverId);
  if (messageInputEl) messageInputEl.disabled = !hasDriver;
  if (messageSubmitButton) messageSubmitButton.disabled = !hasDriver;
  if (markThreadReadButton) markThreadReadButton.disabled = !hasDriver;
}

function setActiveDriver(driverId) {
  activeDriverId = driverId;
  const driver = driverProfiles.find((item) => item.id === driverId) ?? null;

  if (activeThreadNameEl) {
    activeThreadNameEl.textContent = driver ? driver.name : 'Select a driver';
  }
  if (activeThreadStatusEl) {
    activeThreadStatusEl.textContent = driver ? `${driver.status} · ${driver.unit}` : '';
  }

  if (driver) {
    markDriverMessagesRead(driver);
  }

  renderDriverRoster();

  renderMessageLog(driver);
  updateMessagingFormState();
}

function getSurveyStatusLabel(status) {
  switch (status) {
    case 'active':
      return 'Active';
    case 'scheduled':
      return 'Scheduled';
    case 'paused':
      return 'Paused';
    default:
      return status;
  }
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function renderSurveyList() {
  if (!surveyListEl) return;

  surveyListEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  const filtered = surveyTemplates.filter((survey) => {
    const matchesCategory = surveyFilters.category === 'all' || survey.category === surveyFilters.category;
    const matchesStatus = surveyFilters.status === 'all' || survey.status === surveyFilters.status;
    const searchText = normalizeText(survey.title);
    const matchesSearch = !surveyFilters.search || searchText.includes(surveyFilters.search);
    return matchesCategory && matchesStatus && matchesSearch;
  });

  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'survey-empty';
    empty.textContent = 'No surveys match the applied filters.';
    surveyListEl.appendChild(empty);
    return;
  }

  filtered.forEach((survey) => {
    const card = document.createElement('article');
    card.className = `survey-card status-${survey.status}`;
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <header class="survey-header">
        <h3>${survey.title}</h3>
        <span class="survey-status">${getSurveyStatusLabel(survey.status)}</span>
      </header>
      <div class="survey-meta">
        <span class="survey-meta-item"><strong>Category:</strong> ${survey.category}</span>
        <span class="survey-meta-item"><strong>Last Sent:</strong> ${survey.lastSent}</span>
      </div>
      <div class="survey-stats">
        <span><strong>Responses:</strong> ${survey.responses}</span>
        <span><strong>Completion:</strong> ${formatPercent(survey.completionRate)}</span>
      </div>
      <div class="survey-actions">
        <button type="button" class="secondary-action" data-survey-action="toggle" data-survey-id="${survey.id}">${getSurveyActionLabel(survey.status)}</button>
        <button type="button" class="link-action" data-survey-action="preview" data-survey-id="${survey.id}">Preview</button>
      </div>
    `;
    fragment.appendChild(card);
  });

  surveyListEl.appendChild(fragment);
}

function getSurveyActionLabel(status) {
  switch (status) {
    case 'active':
      return 'Pause Sending';
    case 'paused':
      return 'Resume Survey';
    case 'scheduled':
      return 'Activate Now';
    default:
      return 'Update';
  }
}

function toggleSurveyStatus(surveyId) {
  const survey = surveyTemplates.find((item) => item.id === surveyId);
  if (!survey) return;

  if (survey.status === 'active') {
    survey.status = 'paused';
  } else {
    survey.status = 'active';
    const today = new Date();
    survey.lastSent = today.toISOString().slice(0, 10);
  }

  renderSurveyList();
}

function handleSurveyClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const surveyId = target.dataset.surveyId;
  const action = target.dataset.surveyAction;
  if (!surveyId || !action) return;

  if (action === 'toggle') {
    toggleSurveyStatus(surveyId);
  } else if (action === 'preview') {
    target.blur();
    target.setAttribute('data-previewed', 'true');
  }
}

function renderDashboard() {
  renderDashboardMetrics();
  renderDashboardDispatchRows();
  renderImpounds();
  renderReports();
}

function renderDispatchingModule() {
  populateDispatchFilters();
  renderDispatchTables();
  renderDriverRoster();
  renderMessageLog(null);
  updateMessagingFormState();
  renderSurveyList();
}

function initNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = link.dataset.viewTarget;
      if (target === 'dashboard' || target === 'dispatching') {
        setActiveView(target);
      }
    });
  });

  if (goToDispatchButton) {
    goToDispatchButton.addEventListener('click', () => {
      setActiveView('dispatching');
    });
  }
}

function initDashboardEvents() {
  if (statusFilterEl) {
    statusFilterEl.addEventListener('change', (event) => {
      renderDashboardDispatchRows(event.target.value);
    });
  }

  if (refreshBoardButton) {
    refreshBoardButton.addEventListener('click', (event) => {
      const button = event.currentTarget;
      button.disabled = true;
      button.textContent = 'Refreshing…';
      setTimeout(() => {
        renderDashboardDispatchRows(statusFilterEl?.value ?? 'all');
        button.disabled = false;
        button.textContent = 'Refresh';
      }, 600);
    });
  }
}

function initDispatchEvents() {
  dispatchTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.dispatchTab;
      if (tabId) {
        setActiveDispatchTab(tabId);
      }
    });
  });

  if (dispatchFilterForm) {
    dispatchFilterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      currentDispatchFilters = getFiltersFromForm();
      renderDispatchTables();
    });

    dispatchFilterForm.addEventListener('reset', () => {
      setTimeout(() => {
        currentDispatchFilters = {
          customer: '',
          vehicle: '',
          driver: '',
          zone: '',
          startDate: null,
          endDate: null
        };
        renderDispatchTables();
      }, 0);
    });
  }

  if (messageFormEl) {
    messageFormEl.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!activeDriverId || !messageInputEl) return;
      const messageText = messageInputEl.value.trim();
      if (!messageText) return;

      const driver = driverProfiles.find((item) => item.id === activeDriverId);
      if (!driver) return;

      const timestamp = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      driver.messages.push({
        id: generateMessageId(),
        from: 'dispatcher',
        body: messageText,
        timestamp,
        read: true
      });
      driver.lastActive = timestamp;

      messageInputEl.value = '';
      renderMessageLog(driver);
      renderDriverRoster();
    });
  }

  if (markThreadReadButton) {
    markThreadReadButton.addEventListener('click', () => {
      if (!activeDriverId) return;
      const driver = driverProfiles.find((item) => item.id === activeDriverId);
      if (!driver) return;
      if (markDriverMessagesRead(driver)) {
        renderDriverRoster();
        renderMessageLog(driver);
      }
    });
  }

  if (surveyFilterForm) {
    surveyFilterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(surveyFilterForm);
      surveyFilters = {
        category: formData.get('category') ?? 'all',
        status: formData.get('status') ?? 'all',
        search: normalizeText(formData.get('search'))
      };
      renderSurveyList();
    });

    surveyFilterForm.addEventListener('reset', () => {
      setTimeout(() => {
        surveyFilters = {
          category: 'all',
          status: 'all',
          search: ''
        };
        renderSurveyList();
      }, 0);
    });
  }

  if (surveyListEl) {
    surveyListEl.addEventListener('click', handleSurveyClick);
  }
}

function init() {
  setActiveView('dashboard');
  setActiveDispatchTab(activeDispatchTab);
  renderDashboard();
  renderDispatchingModule();
  initNavigation();
  initDashboardEvents();
  initDispatchEvents();
}

document.addEventListener('DOMContentLoaded', init);
