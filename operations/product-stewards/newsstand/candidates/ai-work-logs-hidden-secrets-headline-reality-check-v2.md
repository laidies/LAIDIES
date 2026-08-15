THE DAILY • AUGUST 15, 2026

# No, this study did not find your private AI chats online

*It did not find that ordinary private chats were silently published. Researchers studied complete behind-the-scenes files that developers and researchers had deliberately posted publicly so other people could inspect or reuse their AI work. Some files contained passwords and other sensitive information that was not visible in the chat.*

If the headline made you wonder whether everything you have told ChatGPT or
Claude is now loose on the internet, here is the important correction: the
researchers did not go into people's private chat accounts. They went to public
websites where developers and researchers had uploaded complete files from
their AI work. A real file-sharing problem had begun to sound like an every-chat
emergency. It is not—but some people do need to change what they publish.

## What people actually shared

Imagine a developer uses an AI tool to help fix a piece of software. On screen,
she sees her instructions and the AI's answer. Behind that neat conversation,
the software may create a fuller file so the work can pause or continue. That
file can hold the conversation **plus** information the software carried while
doing the job. Some parts may look like unreadable computer code. A developer
might post it on GitHub or Hugging Face so other people can study or reuse the
work.

The mistake is assuming that a clean-looking conversation means the entire file
is clean.

## What the study found

The researchers examined 6,708 publicly posted AI-work files. They report
finding at least one real sensitive item in 328 of them—4.9% of the files they
checked.

In files from genuine user work, they counted 704 separate sensitive items,
including passwords and digital keys that can let software enter an account.
Sixty-four were absent from the conversation visible on screen.

The researchers also report that, during their tests, some of the unreadable
material could be handed to a related AI model and coaxed back into readable
information.

This was an August 10 preprint, not a peer-reviewed final paper. The scan was
targeted, and an AI system helped label possible privacy problems. The
researchers could not prove the exact origin of every item. They say the attacks
stopped working after they alerted the affected companies; LAiDIES has not
independently confirmed that every system is now fixed.

## Does this affect you?

1. **You use a private AI chat.** This study did not show that simply chatting
   privately posts your conversation online.
2. **You copy an answer you chose to share.** That is not the same as publishing
   the complete file. Check the answer itself for private details.
3. **Someone asks you for a complete support or troubleshooting file.** Ask
   what it contains and where it will go. Use an official private support route,
   not a public forum. If you cannot tell what is inside, do not post it publicly.
4. **You publish complete AI-work files for other people to inspect or reuse.**
   This is the group directly affected. Create a new sharing copy containing
   only approved information. Deleting a password from the visible conversation
   does not prove the full file is clean.

At work, a software team should release a purpose-built example—not the original
file created during the job. At home, copying a checked holiday itinerary into
the family chat is different. If a help forum asks for the AI tool's complete
file, you have crossed into the third step and should pause.

## The LAiDIES read

This is not a story about AI secretly publishing everyone's conversations. It
is a story about people deliberately publishing a bigger file than they
realized.

Share the finished result, not the backstage production file. If a complete
file containing passwords or digital access keys was already public, remove it
and replace them so the old ones no longer work.

## Cocktail Party version

Researchers found secrets in some complete AI-work files that developers had
posted publicly. They did **not** find that ordinary private chats were silently
put online. The screen can look clean while the bigger file is not.

## Sources and correction note

- Panfilov et al., “Stealing Reasoning Traces from Proprietary LLM APIs,”
  arXiv:2608.09867: https://arxiv.org/abs/2608.09867
- Provider background: Anthropic, Google and OpenAI documentation on the extra
  information their developer systems can carry between steps.

If the paper, provider records or independent reproduction evidence changes
materially, LAiDIES will publish a dated follow-up and link both stories.
