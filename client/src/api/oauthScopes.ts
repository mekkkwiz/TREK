// Human-readable scope definitions for the OAuth consent page.
// Must stay in sync with server/src/mcp/scopes.ts

export interface ScopeInfo {
  label: string
  description: string
  group: string
}

export const SCOPE_GROUPS: Record<string, ScopeInfo> = {
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
}

export const ALL_SCOPES = Object.keys(SCOPE_GROUPS)

// Group all scopes for the client registration form
export const SCOPE_GROUP_NAMES = [...new Set(Object.values(SCOPE_GROUPS).map(s => s.group))]

export function getScopesByGroup(): Record<string, Array<{ scope: string } & ScopeInfo>> {
  const groups: Record<string, Array<{ scope: string } & ScopeInfo>> = {}
  for (const [scope, info] of Object.entries(SCOPE_GROUPS)) {
    if (!groups[info.group]) groups[info.group] = []
    groups[info.group].push({ scope, ...info })
  }
  return groups
}
