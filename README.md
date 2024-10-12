# Angular Route Sharding Micro-Frontend

This is a "micro-frontend" app implemented via route sharding.

## Features

*   No module federation or any of the complexity that brings.
*   `application` builder-compatible.
*   SSR-compatible.
*   No community libraries.
*   Minimal performance cost.

## Costs

*   Micro-frontends must be separated by routes.
    *   You can still use module federation to put two MFEs on the same page,
        you just don't need to unless it is useful to do so.
*   Navigating between micro-frontends requires a hard navigation.
*   Requires an additional proxy server deployment in additional to MFE deployments.
*   Route claiming and discovery may benefit from additional tooling.

## Architecture

Micro-frontends want an isolated environment where they can be live independently
of all other apps built at different times with unknown code. Typically, module
federation allows multiple apps to be independently bundled but exist on the same
page and share code. However, browsers already have a mechanism for creating truly
isolated environments between applications: web pages.

Each page load is completely isolated from the ones before and after. This MFE
approach takes advantage of that by "sharding" the application routes between MFEs.
Each MFE "claims" a set of routes in the application. When the user visits routes
within the MFE, it performs normal "soft" navigations between them. When the user
visit a route owned by a different MFE, it performs a hard navigation and loads
that MFE from scratch.

A small proxy server makes this work by knowing which route is owned by which MFE
and then redirecting each request to the relevant server which owns that MFE.

TODO: Diagram

This architecture gives each MFE full control over all the routes they claim with no
risk of interference by other MFEs.

## Local Development

Run the whole stack with `nx run proxy:runAll` and open
[http://localhost:4200/](http://localhost:4200/).

## FAQ

### Is this technically an MFE?

This depends on the definition of "Micro-frontend". Does it require getting multiple,
independently-built web applications to interoperate with each other in a single user
experience? Or does it specifically require getting independently-built JavaScript
code to coexist on the same page? If you choose the latter definition, then no, this
is not an MFE architecture.

However, I choose the former definition. Because the technical solution to any given
problem doesn't matter as long as it solves that problem. Here, the problem is release
independence of multiple web applications which coexist in the same user experience.
The user doesn't think in terms of build times.

"Well, if you can't tell, does it matter?"

### How do I share code between MFEs?

Use a shared library which is built with each MFE.

It is comparatively easy to create shared libraries and then use those libraries
across multiple MFEs. Each application can build its library dependencies and include
its own copy of them. Each MFE gets its own version of that dependency, meaning they
are not tied to a single version or forced to upgrade in lock-step.

If you really want to use module federation to link in a library built at a different
time, that is possible with this architecture. Nothing actively prevents it. This
architecture just makes the need for module federation as a solution significantly
less important and many more use cases can get by without needing to pull on that
particular lever.

### What are the performance implications?

Every navigation between different MFEs is a hard navigation, therefore the browser
needs to effectively start over from scratch. This makes initial page load performance
significantly more important than a typical SPA. SSR is especially important to mitigate
this particular rough edge.

Performance within a single MFE should be effectively unchanged. Because each MFE is just
an independent application, there is no performance cost they need to pay. Internal
navigations work just like any other SPA and have identical performance to a non-MFE app.
It's only cross-MFE navigation which must be hard navigations.

It's worth remembering that all MFE solutions has a performance and reliability cost to
them. Module federation in particular negatively impacts tree shaking and frequently
duplicates dependencies. Those dependencies can be deduplicated, but that just trades
improved performance for reduced reliability, as all MFEs must now share the same version
of that dependency which makes upgrades more difficult. This route sharding architecture
makes it own trade offs in this space, but this approach is comparatively more reliable
than module federation (no shared dependencies at all) without taking on much of a
performance cost for SSR-enabled applications with strong initial page load performance.

### How do we get multiple MFEs to work together?

They link to each other (and maybe write to shared storage).

MFEs by their nature are supposed to be independent applications without tight coupling
between each other. Having one MFE closely coupled or dependent on another is a design
smell. MFEs generally shouldn't share state or have specific knowledge of each other
wherever it can be avoided. This is very similar to RPC microservices which frequently
use independent data stores to avoid unintentional coupling through leaking data.

On the web, MFE state such as "What project am I operating on" should typically be kept
in query parameters where MFEs can link between each other to propagate that state. More
complex data like user authentication tokens or a data cache might be saved to an
IndexedDB store with a common library to read/write to it across multiple MFEs. This
allows one MFE to request some data, store it in the browser, and then the next MFE can
read the same data without having to duplicate the request.

MFE isolation is more of a theoretical ideal than it is a practical goal, but the point
here is that we don't need send references of JS functions from one MFE to another in
order to have a cohesive application. The exact mechanisms for how to handle these
integrations will vary form app to app based on the exact UX requirements.

### How does caching work?

By default, each MFE is effectively cached independently of each other. If there is a
significant amount of shared code/data between MFEs, it is potentially possible to have a
shared CDN, browser cache, or data cache (stored in IndexedDB perhaps) which allows this
data to be reused across MFEs. This example does not go to that extent, but it is entirely
feasible to do so.

## Hacks

There's one notable hack needed to get this approach to work.
[`routerLink` does not support navigating to routes outside the application](https://github.com/angular/angular/issues/24567#issuecomment-877301902),
meaning it will never perform a hard navigation to another MFE.

To make this happen, we add a 404 route handler with a guard which triggers a hard
navigation. This is not really how guards are supposed to work, but it seems to work
well enough.

TODO: Add an actual 404 route.
