<m-summary ticket="SKILL-20">

<m-badge tone="info">ADR 0003</m-badge> <m-badge tone="pass">accepted · 2026-10-13</m-badge>

<m-answer data-field="answer">**Every skill assumes the menger surface, and is itself shown on it; a frontend is rendered in the ticket; where a thing cannot be built into the frame, a screenshot is the fallback.**</m-answer>

</m-summary>

<m-field data-field="context">ought is written in the abstract, so its tickets are text with mermaid and cannot assume a frame that runs components, follows the tracker, asks the owner or cites other tickets. menger has all of that — and SOURCE (<m-ticket ref="SOURCE-1"></m-ticket>) will open a file by URI as that surface.</m-field>

<m-field data-field="decided-shape" label="Decision">A body is HTML and markdown in a frame with the house components, a ticket's own components, live chips, cites, inputs and themes. A skill is written as such a body: filed as a doc on menger and kept as the same file in the repository, its frontmatter hidden by menger and read by a harness. A frontend is rendered in the ticket — the component itself, or the page as a mockup. Where a thing cannot be built into the frame, the ticket carries a screenshot of it running, in both themes, and says what the screenshot cannot show.</m-field>

<m-field data-field="evidence" label="Why">The owner, 2026-10-13 (<m-ticket ref="TICKETING-10"></m-ticket>): *"we want it to be a visual masterpiece. we want diagrams and in the case of frontends, we want the components rendered directly into the surface… if that capability to build html in isn't there, then we default to adding screenshots"* — and, of the skills themselves: *"I would really like it if these skills could contain html markup and really actually be shown inside menger."* The trade-off: this methodology is not portable to a text-only tracker. That is the point. (ought, kept at first for the abstract case, was retired on 2026-10-14.)</m-field>
