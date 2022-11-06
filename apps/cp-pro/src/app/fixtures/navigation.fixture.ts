import { NavigationNodeModel } from '../models';


const ManagementFixture: NavigationNodeModel = {
  name: 'management',
  label: 'Projektverwaltung',
  icon: 'home',
  children: [
    {
      name: 'addresses',
      label: 'Adressen',
      icon: 'contact_mail',
    },
    {
      name: 'inquiries',
      label: 'Anfragen',
      icon: 'quiz',
    },
    {
      name: 'projects',
      label: 'Projekte',
      icon: 'business_center',
    },
    {
      name: 'tenders',
      label: 'Angebote',
      icon: 'approval_delegation',
    },
    {
      name: 'invoices',
      label: 'Rechnungen',
      icon: 'receipt',
    },
  ],
};

const BookkeepingFixture: NavigationNodeModel = {
  name: 'bookkeeping',
  label: 'Buchhaltung',
  icon: 'table',
  children: [
    {
      name: 'invoices',
      label: 'Rechnungen',
      icon: 'receipt',
    },
    {
      name: 'credit-notes',
      label: 'Gutschriften',
      icon: 'monetization_on',
    },
    {
      name: 'regular-invoices',
      label: 'Regelmäßige Rechnungen',
      icon: 'event_repeat',
    },
    {
      name: 'open-items-customer',
      label: 'Offene Posten Kunden',
      icon: 'pending_actions',
    },
    {
      name: 'dunning-list',
      label: 'Mahnliste',
      icon: 'assignment_late',
    },
  ],
};

export const NavigationFixture: NavigationNodeModel = {
  name: '',
  label: 'Hauptnavigation',
  children: [
    ManagementFixture,
    BookkeepingFixture,
  ]
};
