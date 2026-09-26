# The voice on your next restaurant or repair call may be GPT-Live-1.

## The story

OpenAI released GPT-Live-1 to developers through its API on September 10. The same day, Yelp said it had integrated the voice model into Yelp Host, which answers restaurant calls, and Hatch, which handles calls for service businesses such as repair companies.

This is where someone who never opens an API may encounter the release: while making a reservation, changing a food order or arranging an appointment by phone. It does not mean every restaurant, repair company or ChatGPT account changed. Yelp did not disclose which callers, locations or customers have received the new integration.

A front-end voice layer is the part that listens and speaks while a separate backend checks information and completes tasks. OpenAI calls listening and speaking at the same time full duplex. GPT-Live-1 can keep listening when a caller pauses, interrupts or changes direction. A separate backend system still checks business information, applies rules and uses tools. OpenAI’s documentation says the application—not the voice model—owns permissions, confirmations and the lasting record of a task.

## The LAiDIES read

Compared with a traditional voice system that passes speech through separate listening, reasoning and speaking stages, GPT-Live-1 is meant to keep the conversation moving more naturally. Imagine changing a reservation from four people to five while the voice is still replying. The voice layer can handle the interruption; the restaurant’s availability data and booking tool still determine whether a table is recorded.

Yelp says early production testing showed better call handling and fewer transfers, and that callers spoke in fuller sentences. Those are company-reported observations. The release gives no sample size, test method, rollout geography or independent assessment, so it does not establish how often the system completes a reservation or appointment correctly.

Developers can access GPT-Live-1 as a paid API. OpenAI says the voice layer costs $0.05 per minute; backend models and tools are billed separately. That is not necessarily a fee charged to the caller. The model is best suited to conversations with pauses, interruptions or background noise. It may be unnecessary for a simple menu lookup or email, where a human or simpler system already works.

## What this means for you

A smoother voice can make a call easier, but fluency is not a booking record. At the end of a restaurant call, repeat the date, time and party size and ask for the confirmation. For a repair appointment, check the address, service requested and arrival window. If the system cannot confirm the record, ask for a person.

The next useful evidence is independent testing and a disclosed rollout: which calls use GPT-Live-1, how transaction accuracy is measured and how often the confirmed record matches what the caller said.
