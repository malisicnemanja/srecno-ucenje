
# MIGRATION PLAN - PHASE 2

## Status: PREPARED (Not Executed)

## Types to Migrate:

### locationData → center
- Action: COPY
- Preserve Original: YES
- Estimated Count: 0
- Notes: Transform locations to centers with enhanced data


### experience → legacyContent
- Action: ARCHIVE
- Preserve Original: YES
- Estimated Count: 0
- Notes: Archive travel content, will create new franchisee testimonials


### testimonial → franchiseeTestimonial
- Action: TRANSFORM
- Preserve Original: YES
- Estimated Count: 5
- Notes: Enrich existing testimonials with business metrics


## Pre-Flight Checks:
- [ ] Backup exists
- [ ] New schemas registered
- [ ] No data deleted

## Important:
- This is just a PLAN, not execution
- All original data will be PRESERVED
- New types are ADDITIONS, not replacements
- Execute only after validation in PHASE 3

Generated: 2025-08-04T23:55:56.880Z
