-- Add layout column to modules table
ALTER TABLE modules ADD COLUMN IF NOT EXISTS layout JSONB DEFAULT '{}';

-- Update modules with proper layouts
UPDATE modules SET layout = jsonb_build_object(
  'type', 'default',
  'actions', jsonb_build_array()
) WHERE slug = 'nexagpt';

UPDATE modules SET layout = jsonb_build_object(
  'type', 'agro',
  'actions', jsonb_build_array(
    jsonb_build_object('type', 'upload', 'label', 'Upload photo', 'icon', 'upload'),
    jsonb_build_object('type', 'camera', 'label', 'Take photo', 'icon', 'camera')
  )
) WHERE slug = 'agro';

UPDATE modules SET layout = jsonb_build_object(
  'type', 'code',
  'actions', jsonb_build_array(
    jsonb_build_object('type', 'syntax', 'label', 'Syntax highlight', 'icon', 'code')
  )
) WHERE slug = 'code';

UPDATE modules SET layout = jsonb_build_object(
  'type', 'weather',
  'actions', jsonb_build_array(
    jsonb_build_object('type', 'location', 'label', 'Get location', 'icon', 'map-pin')
  )
) WHERE slug = 'weather';

UPDATE modules SET layout = jsonb_build_object(
  'type', 'health',
  'actions', jsonb_build_array(
    jsonb_build_object('type', 'upload', 'label', 'Upload image', 'icon', 'upload'),
    jsonb_build_object('type', 'camera', 'label', 'Take photo', 'icon', 'camera')
  )
) WHERE slug = 'health';

-- Add language preferences to users table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'uz';

-- Add rename functionality to conversations
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS custom_title VARCHAR(255);
