# Researchers found passwords in public AI work files

**A study of technical records posted on GitHub and Hugging Face found that some carried passwords and other private details. This is a lesson about sharing the complete file behind an AI task—not evidence that ordinary private chats suddenly became public.**

## The news in one breath

On August 10, 2026, Alexander Panfilov and seven co-authors shared a study before academic review. They examined raw AI work files that developers and researchers had posted on GitHub and Hugging Face so others could inspect or replay tasks. During their tests, they moved hidden data from those files into a weaker model from the same company and recovered private details. This concerns people publishing raw technical files; it does not show ordinary private chats became public. Share the checked result, not the raw work file.

## Before today

An AI work file can contain the instructions, answers and technical information used to continue a task—not only the conversation shown on screen. Developers and researchers sometimes post these files so others can inspect or replay their work.

The answer is the report you meant to send; the work file is the project folder behind it. The folder is not public until somebody posts it, but then everything inside travels with it.

## What actually happened

Some AI companies return a sealed piece of information with an answer so their system can continue the work later. The person using the tool cannot normally read it.

During the test period, the researchers took this sealed material from public work files and gave it to a weaker model made by the same company. That model sometimes made the material readable. The researchers compared what they recovered with the visible conversation.

The authors say they reported this route to the affected companies and that the same attacks stopped working afterward.

## What the evidence found

Panfilov and colleagues examined 6,708 public AI work files. They report that 328 files—about 4.9%—contained at least one real password, access key or other private item.

After removing duplicates and practice examples involving made-up characters, they counted 704 separate private items in genuine users’ sessions. One file can contain several items, so this is not 704 affected files. Most appeared somewhere in the visible conversation; 64 appeared only in the recovered material.

## What this does—and does not—mean

These are the authors’ findings from a paper that has not received independent academic review. Company documentation confirms that sealed information can travel between steps; it does not independently confirm the attack or results. The paper found a real problem in public technical work files during its tests. It did not find that every work file contains private details, that ordinary private chats became public or that the same attack still works today.

## Where you might encounter this

At work, a coding assistant might use a temporary website password while diagnosing a problem, then omit it from the final answer. Publishing its complete technical record could still carry more than your colleague needs.

Outside work, a home-made travel assistant might connect to email or booking information. Share the finished itinerary, not its complete work file. The study does not show that sending an ordinary chat link creates this problem.

## What to do with this

Share the checked answer or make a new file containing only what others should receive. A clean-looking conversation does not prove the complete technical file contains nothing else.

If a public work file may have carried a password or access key, remove access and replace the credential. Deleting the file is not enough because other people may already have copied it.

## Sources and watch point

**Sources checked August 13, 2026:** Panfilov and colleagues, *Stealing Reasoning Traces from Proprietary LLM APIs*; current Anthropic, Google and OpenAI documentation about carrying hidden reasoning information between steps. LAiDIES will revisit this story if the paper changes, an affected company publishes a detailed response, another team reproduces the result or the reported attack starts working again.
