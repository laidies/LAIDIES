# THE BREAKING

## Kimi K3’s weights are out. “Open” does not mean it runs on your laptop.

**The short version:** Moonshot AI has released the full Kimi K3 model weights,
turning a hosted product into something well-resourced developers can also
deploy and modify. It is a meaningful access change—not a free frontier model
for every personal computer.

### What happened

Moonshot published K3's model files, deployment instructions and license on
Hugging Face. K3 is a 2.8-trillion-parameter mixture-of-experts model that uses
104 billion parameters at a time, accepts text and images, and supports up to
one million tokens of context.

The hosted version remains available through Kimi and Moonshot's API. The API
lists K3 at $3 per million input tokens and $15 per million output tokens, with
$0.30 cache hits. Thinking is always on and `max` is the default effort.

### What “open weights” actually means

The weights are the learned settings inside the model. Publishing them is like
publishing the recipe instead of requiring everyone to order from one
restaurant.

But this recipe is sized for an industrial kitchen. Downloading the files does
not supply the specialist hardware, storage, power, serving software or
security work needed to run a 2.8-trillion-parameter model well. Open weights
give organizations more control; they do not make K3 a normal laptop app.

The license is broad, but it is not condition-free. It allows use, modification
and deployment while adding separate commercial terms for certain
model-as-a-service businesses above $20 million in annual revenue and
attribution requirements for very large products.

### Why it matters

This changes the sensible question from “Is K3 as good as Fable or Sol?” to
“Who can now control a capable model, and what does that control cost?”

For developers and organizations with serious infrastructure, K3 is a real
test candidate for long coding jobs, research agents, visual documents and
work that benefits from local deployment or data control. For most readers,
the practical product is still the hosted service.

It also sharpens the safety debate. A preliminary joint NIST and UK AISI
assessment found K3 below the latest U.S. frontier models on its selective
cyber tests, above the prior open-weight comparator, and willing to assist with
offensive cyber tasks in the test setup. That is evidence of meaningful
capability and weaker safeguards—not proof that K3 is either harmless or a
runaway “cyber superweapon.”

### What should you do?

- If you already compare coding or research agents, test K3 on your own tasks
  and measure total cost, time and failure rate—not just token price.
- If data control is the goal, evaluate the license, hardware, security and
  governance work before treating self-hosting as the cheaper choice.
- If you want capable local AI on a personal computer, wait for credible
  smaller versions, quantizations and independent hardware tests.
- If your current tool works and you have no access or control problem, this
  release does not require a switch.

### What we still do not know

We need independent measurements of real serving cost, speed, hardware
footprint, long-context reliability, safety after weight release and quality
under equivalent agent harnesses. Moonshot's benchmark table is evidence from
the vendor; it is not the final verdict on real work.

**Watch next:** independent deployment tests, smaller derivatives, safety
testing of the released weights and any concrete government rule that changes
who can use them.

