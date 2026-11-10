---
name: menger-modification-conventions
description: Use whenever the owner asks for a change to menger that a person will see or touch — a page, a control, a look, a behaviour in the browser — before any code is written. Produces the change as plexus-ui runtime components (svelte/1 components in a bundle, declared by their `uses`, placed by a route, a section or a tag, shipped by a push), or, when any part of it cannot be that, the exception raised to the owner by name before it is built.
---

<m-summary>

<m-answer data-field="answer">**A frontend change to menger is a plexus-ui runtime component, every time. Anything in it that is not one is raised to the owner before it is built: what it is, why it cannot be a component, and the nearest way it could.**</m-answer>

<m-stat value="1">way a frontend change ships: a pushed bundle</m-stat>
<m-stat value="0">exceptions built without being raised</m-stat>

</m-summary>

The owner, 2026-11-10: *"One thing I cannot overstate. I need you to make sure that all frontend changes are plexus-ui runtime components when I'm asking about changing menger. If they aren't then that should be raised."*

<m-field data-field="context" label="What a runtime component is">

menger's whole interface is components the plexus-ui engine draws at run time. A change is one when all of this is true of it:

- **It is a component's source**: a `svelte/1` file in a bundle (`ui/src/<name>.svelte` in menger's own, or one authored into the live bundle or a named one), with its look in its own `<style>` on the theme's tokens.
- **It declares what it calls**: `export const uses = [...]`, every method named, checked at push against the running services. It reaches a service only through the host (`bus`, `live`), as the person signed in.
- **It is placed by data, not by code outside it**: a route in `routes.json`, a section in `slots.json` (or `ui slots set` on the running service), a tag in a body, or another component's bound mark.
- **It ships as a push**: the bundle built by the framework's tool and made live by `ui push`, so every open page swaps to it with no server release for the interface itself.

A change to the theme's tokens, the routes or the sections' defaults is part of the bundle and counts.

</m-field>

<m-cases data-field="decided-shape" label="Is it one?">

| the change | a runtime component? | so |
| -- | -- | -- |
| a new page, panel, control or view | yes: a component and a route or a section | build it |
| a change to how an existing page looks or behaves | yes: an edit to that page's component | build it |
| something shown inside a ticket's or a document's body | yes: a bundle component placed by its tag (native), or an authored one (framed, reads only) | build it; say which of the two it is |
| a new method a component needs from a service | the component is; the method is a backend change of its own | build both, say so, and ship the service before the push that uses it |
| HTML, script or style written into the shell, the page's frame or the server | **no** | raise it |
| a change to the engine, the compiler, the host or the contract (the framework itself) | **no** | raise it |
| a change to the page's content security policy, or anything loaded from another origin | **no** | raise it |
| a page served by a route in the server, a static file, a separate web app or a tool with its own interface | **no** | raise it |
| logic about what a person may see or do, put in the browser | **no**: that is the service's | raise it, and put it in the service |

</m-cases>

<m-field data-field="detail" label="Raising it">

Raise before building, not in the report afterwards.

1. **Say it in the conversation, first line**: "this part is not a plexus-ui runtime component", naming the part.
2. **Say why it cannot be one**, in a sentence that is about this change (what the component cannot reach, draw or decide from where it runs).
3. **Give the nearest component-shaped way**, even if it is worse, and what it would cost.
4. **Put the same on the ticket** and mark it for the owner, as [asking](../asking/SKILL.md) says. Carry on with every part that is a component; leave the part that is not until the owner answers.

A mixed change is split: the component part proceeds, the rest waits. Never fold an exception into a component change so that it ships unnoticed.

</m-field>

<m-field data-field="edges" label="Must not do">

- Build a frontend change as anything but a component because it is quicker.
- Edit the framework's checkout to make a component possible; that is a framework change, raised and released as one.
- Reach a service from the page by any path but the host's (`bus`, `live`), or call a method the component's `uses` does not name.
- Describe an exception only in the final summary, or only in a commit message.
- Treat "the owner asked for the outcome" as leave for the exception: he asked for the outcome as components unless he says otherwise for that change.

</m-field>

<m-field data-field="done-when" label="Done when">

- Every file the change touched for the interface is a component's source, the routes, the sections or the theme.
- Each new or changed component names its `uses`, and the push took them.
- It was seen drawn by the engine: a browser case, or the page on the test environment.
- Anything else in the change was raised before it was built, is on its ticket for the owner, and the reply to the owner names it.

</m-field>
