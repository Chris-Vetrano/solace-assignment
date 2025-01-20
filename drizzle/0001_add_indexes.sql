CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create combined text search index for general search
CREATE INDEX advocates_text_search_idx ON advocates 
USING gin ((first_name || ' ' || last_name || ' ' || city || ' ' || degree) gin_trgm_ops);

-- Specialized GIN index for specialties search and filtering
CREATE INDEX advocates_specialties_search_idx ON advocates 
USING gin((payload) jsonb_path_ops);