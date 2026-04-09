// ---------------------------------------------------------------------------
// OAuth 2.1 scope definitions for TREK MCP
// ---------------------------------------------------------------------------

export const SCOPES = {
  TRIPS_READ:          'trips:read',
  TRIPS_WRITE:         'trips:write',
  TRIPS_DELETE:        'trips:delete',
  PLACES_READ:         'places:read',
  PLACES_WRITE:        'places:write',
  PACKING_READ:        'packing:read',
  PACKING_WRITE:       'packing:write',
  BUDGET_READ:         'budget:read',
  BUDGET_WRITE:        'budget:write',
  RESERVATIONS_READ:   'reservations:read',
  RESERVATIONS_WRITE:  'reservations:write',
  COLLAB_READ:         'collab:read',
  COLLAB_WRITE:        'collab:write',
  NOTIFICATIONS_READ:  'notifications:read',
  NOTIFICATIONS_WRITE: 'notifications:write',
  VACAY_READ:          'vacay:read',
  VACAY_WRITE:         'vacay:write',
  MEDIA_READ:          'media:read',
} as const;

export type Scope = typeof SCOPES[keyof typeof SCOPES];

export const ALL_SCOPES: Scope[] = Object.values(SCOPES) as Scope[];

export interface ScopeInfo {
  label: string;
  description: string;
  group: string;
}

export const SCOPE_INFO: Record<Scope, ScopeInfo> = {
  'trips:read':          { label: 'View trips & itineraries',   description: 'Read trips, days, day notes, members, and share links',                    group: 'Trips' },
  'trips:write':         { label: 'Edit trips & itineraries',   description: 'Create and update trips, days, notes, and manage members',                  group: 'Trips' },
  'trips:delete':        { label: 'Delete trips',               description: 'Permanently delete entire trips — this action is irreversible',              group: 'Trips' },
  'places:read':         { label: 'View places & map data',     description: 'Read places, day assignments, tags, categories, and visited countries',      group: 'Places' },
  'places:write':        { label: 'Manage places',              description: 'Create, update, and delete places, assignments, tags, and atlas entries',    group: 'Places' },
  'packing:read':        { label: 'View packing lists',         description: 'Read packing items, bags, and category assignees',                          group: 'Packing' },
  'packing:write':       { label: 'Manage packing lists',       description: 'Add, update, delete, toggle, and reorder packing items and bags',            group: 'Packing' },
  'budget:read':         { label: 'View budget',                description: 'Read budget items and expense breakdown',                                    group: 'Budget' },
  'budget:write':        { label: 'Manage budget',              description: 'Create, update, and delete budget items',                                    group: 'Budget' },
  'reservations:read':   { label: 'View reservations',          description: 'Read reservations and accommodation details',                                group: 'Reservations' },
  'reservations:write':  { label: 'Manage reservations',        description: 'Create, update, delete, and reorder reservations',                          group: 'Reservations' },
  'collab:read':         { label: 'View collaboration',         description: 'Read collab notes, polls, messages, and to-do items',                       group: 'Collaboration' },
  'collab:write':        { label: 'Manage collaboration',       description: 'Create, update, and delete collab notes, todos, polls, and messages',        group: 'Collaboration' },
  'notifications:read':  { label: 'View notifications',         description: 'Read in-app notifications and unread counts',                               group: 'Notifications' },
  'notifications:write': { label: 'Manage notifications',       description: 'Mark notifications as read and respond to them',                            group: 'Notifications' },
  'vacay:read':          { label: 'View vacation plans',        description: 'Read vacation planning data, entries, and stats',                           group: 'Vacation' },
  'vacay:write':         { label: 'Manage vacation plans',      description: 'Create and manage vacation entries, holidays, and team plans',              group: 'Vacation' },
  'media:read':          { label: 'Maps & weather data',        description: 'Search locations, resolve map URLs, and fetch weather forecasts',           group: 'Media' },
};

// ---------------------------------------------------------------------------
// Scope enforcement helpers
// null scopes = static trek_ token = full access
// ---------------------------------------------------------------------------

/** trips:read OR trips:write OR trips:delete all grant read access to trips */
export function canReadTrips(scopes: string[] | null): boolean {
  if (!scopes) return true;
  return scopes.some(s => s === 'trips:read' || s === 'trips:write' || s === 'trips:delete');
}

/** group:write grants write access; for trips canReadTrips handles read */
export function canWrite(scopes: string[] | null, group: string): boolean {
  if (!scopes) return true;
  return scopes.includes(`${group}:write`);
}

/** group:read OR group:write grant read access */
export function canRead(scopes: string[] | null, group: string): boolean {
  if (!scopes) return true;
  return scopes.some(s => s === `${group}:read` || s === `${group}:write`);
}

/** trips:delete is a separate scope from trips:write */
export function canDeleteTrips(scopes: string[] | null): boolean {
  if (!scopes) return true;
  return scopes.includes('trips:delete');
}

export function validateScopes(requestedScopes: string[]): { valid: boolean; invalid: string[] } {
  const invalid = requestedScopes.filter(s => !ALL_SCOPES.includes(s as Scope));
  return { valid: invalid.length === 0, invalid };
}
