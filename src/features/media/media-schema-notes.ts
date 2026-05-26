export const mediaSchemaNotes = `
Recommended database table: media_assets

Columns:
- id uuid primary key
- quote_id uuid not null references quotes(id) on delete cascade
- zone_id uuid null references zones(id) on delete cascade
- owner_type text not null check owner_type in ('quote', 'zone')
- asset_type text not null
- visibility text not null default 'internal'
- file_path text not null
- thumbnail_path text null
- file_name text not null
- mime_type text not null
- file_size integer not null
- caption text null
- sort_order integer not null default 0
- include_in_pdf boolean not null default false
- created_at timestamptz not null default now()
`;