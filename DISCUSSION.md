# Discussion of Additional Improvements

I tackled the anti-patterns and bugs first and then moved on to the improvements. I focused heavily on the backend side of things as it seemed critical that we are able to handle 100,000s of records. I also made sure that the app is compliant with WCAG 2.1 minus some misses that I found after the fact (see Critical Priority below).

After spending ~2 hours improving the advocate search interface, here are the key improvements I'd make, organized by priority. These improvements focus on making the interface more useful for prospective patients while ensuring the system remains performant with a large dataset.

## Critical Priority

1. Add basic Jest tests for core search/filter logic

   - Current lack of tests makes it risky to make further improvements
   - Critical for maintaining reliability as the codebase grows
   - We could consider E2Es or integration tests but we should cover the core logic first

2. Implement sorting UI

   - Backend is ready (untested) but UI implementation is missing
   - Patients need to be able to sort by experience level, location, etc.
   - Would help patients make more informed decisions

3. Clean up mobile responsiveness

   - Current UI breaks on mobile devices
   - Critical as many patients will be searching on mobile devices

4. Improve Core Accessibility (WCAG 2.1 Level AA compliance)

   - Need a way to clear all selected dropdown options in the searchable selectors
   - Add X and hover state to selected specialties to indicate delete functionality

5. Add field-specific search options

   - Current search is too generic
   - Patients should be able to search specifically by name, specialty, or location
   - Would make the search more precise and useful

## High Priority

1. Improve error messaging

   - Current error handling is very basic, just a fallback in case routine API calls fail
   - Need clearer feedback when searches fail or return no results
   - Would help patients understand and refine their searches

2. Format phone numbers properly

   - Currently displayed as raw numbers
   - Need proper formatting for better readability
   - Small change but improves professionalism significantly

3. Add loading states

   - Current loading feedback is minimal
   - Need better visual feedback during searches
   - Would make the interface feel more responsive

4. Trim whitespace

   - It's easy to miss that a space has been inadvertantly entered into the input

## Medium Priority

1. Move to RTK Query

   - Would improve state management
   - Better caching would make the interface feel faster
   - Could reduce unnecessary API calls for repeat search parameters

2. Implement TanStack Table

   - Would provide better table features out of the box
   - Would improve sorting and filtering capabilities
   - Would make the code more maintainable and accessible

3. Add Redis caching for filter options

   - Would improve performance for commonly used filters
   - Important as the dataset grows
   - Mostly for caching frequently accessed filter options (like the list of cities and specialties), but even that feels like premature optimization for such a simple interface

4. Use React-Select
   - It's a highly accessible, widely used library for searchable selects

## Low Priority

1. Add fuzzy search matching

   - Would help patients find advocates even with minor typos
   - Not critical but would improve user experience

2. Add an advocate profile page that can be accessed via click (or link) in the advocate table
   - Not critical at all just would be a nice addition. Maybe we can add a profile picture and a bio for each advocate!

## Final Thoughts

There's definitely room for polish with the UI, I ended up focusing more time on the backend than I thought I would. I ran into an issue with specialties column and searching on the values that took a bit of time (as you can see by the commit history, I had to sneak in that fix after some testing). However, overall I think this is a good start for a functional table that can definitely handle a very large dataset.
