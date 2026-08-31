# Who actually makes an AI chip?

**Representative manuscript sample — checked 31 August 2026**
This is a candidate section for *Who’s Who in AI*, not a complete chapter or a published book.

The short answer is: usually, several companies do.

One company may design the processor. Another manufactures the wafer. Other suppliers provide the memory. A specialist makes the machines the factory needs. A packaging service connects the finished parts. Then a cloud provider installs the system, powers it, cools it and rents out the computing capacity. The name on the chip is real, but it is not the whole production story.

That matters because “makes AI chips” is often used to mean six different jobs. If you know which job a company actually performs, a breathless partnership announcement becomes much easier to read.

## The six jobs hiding inside one headline

| Job | What it means in ordinary language | A sourced example |
|---|---|---|
| **Design** | Decide what the processor should do and how its parts work together. | NVIDIA describes itself as using a **fabless** strategy: it focuses its resources on design while suppliers perform manufacturing stages. “Fabless” does not mean factory-free magic. It means the factories belong to other companies. |
| **Wafer fabrication** | Turn a chip design into physical circuits on a silicon wafer. | NVIDIA’s filing names TSMC and Samsung as foundries that manufacture its wafers. That does not mean every NVIDIA product uses both companies. |
| **Memory** | Supply the fast memory that keeps data close enough for processors to use. | The same filing names SK hynix, Micron and Samsung as memory suppliers. It does not identify which supplier served any particular chatbot conversation. |
| **Manufacturing equipment** | Build the extraordinarily specialized machinery a chip factory needs. | ASML makes lithography systems that use light to create circuit patterns. ASML is neither a chatbot company nor the factory producing the finished wafer. It supplies equipment that helps a factory do that work. |
| **Advanced packaging** | Connect processors, memory and other components into a useful assembly. | TSMC describes its CoWoS service as integrating system-on-chip components with stacks of high-bandwidth memory. Here, “packaging” means precise electronic integration, not a tiny cardboard box with a packing slip. |
| **Cloud operation** | Put computing systems into data centres and provide the power, cooling, networking, software and access needed to use them. | Anthropic names AWS as its primary training and cloud provider for mission-critical workloads and describes using Amazon Trainium chips. “Primary” does not mean “only,” and announced future capacity is not the same as capacity already operating. |

These jobs can overlap. Samsung appears above as both a foundry and a memory supplier. A cloud company can design a processor without owning the factory that fabricates it. A chip designer can also supply networking and software. The useful question is not “Which one box does this company belong in?” It is “What is this company supplying in this particular relationship?”

## Follow one real relationship

NVIDIA’s FY2026 annual filing says it concentrates on design and depends on suppliers for manufacturing. It names TSMC and Samsung for wafers, and SK hynix, Micron and Samsung for memory.

That one disclosure supports a precise statement:

> NVIDIA designs computing products and relies on specialist suppliers for important manufacturing and memory components.

It does **not** support these larger claims:

- TSMC manufactures every NVIDIA chip.
- Samsung and TSMC perform identical jobs.
- the supplier list is exclusive;
- the filing proves who supplied the hardware behind a particular AI answer; or
- the relationships have remained unchanged since the filing period ended on 25 January 2026.

This is the reading habit the book will use throughout: name who gives whom what, then state what the evidence does not prove.

## The people belong to roles, not mythology

Jensen Huang is NVIDIA’s founder, president and CEO. Lisa Su is AMD’s chair and CEO. C.C. Wei is TSMC’s chairman and CEO. Christophe Fouquet is ASML’s president and CEO. These roles matter because the people can direct company strategy and speak for their organizations.

They should not be presented as the sole inventors of everything their companies produce. AI infrastructure is team work carried across research, engineering, manufacturing, operations and supply relationships. The executive card tells you where formal leadership sits; it does not erase the people doing the work.

## Try the headline test

Imagine this fictional headline:

> **Cloud company unveils its own AI accelerator**

What can you safely conclude? The company says it designed an accelerator.

What can you **not** conclude from that headline alone?

- that it owns a semiconductor factory;
- that it manufactures lithography equipment;
- that it makes every memory component;
- that the new chip is already available in every data centre; or
- that it is faster, cheaper or better for your work.

To find out, look for the company’s technical announcement and a current filing or supplier disclosure. Ask:

1. Who designed the processor?
2. Who fabricates the wafers?
3. Who supplies the memory and packaging?
4. Is the capacity announced, installed or available to customers?
5. What exactly was measured before anyone called it “better”?

You do not need to memorize the supply chain. You need to stop one company’s logo from swallowing everyone else’s job.

## Sources for this sample

- [NVIDIA FY2026 Form 10-K — Manufacturing](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm), reporting period ended 25 January 2026.
- [ASML — About ASML](https://www.asml.com/en/company/about-asml), checked 31 August 2026.
- [TSMC 2025 Annual Report](https://investor.tsmc.com/sites/ir/annual-report/2025/2025%20Annual%20Report.E.pdf), CoWoS description on PDF page index 52, printed pages 102–103.
- [Anthropic — Amazon compute announcement](https://www.anthropic.com/news/anthropic-amazon-compute), April 2026; checked 31 August 2026.
- Current role pages for [Jensen Huang](https://nvidianews.nvidia.com/bios/jensen-huang), [Lisa Su](https://www.amd.com/en/corporate/leadership.html), [C.C. Wei](https://www.tsmc.com/english/aboutTSMC/executives) and [Christophe Fouquet](https://www.asml.com/en/company/governance/board-of-management), checked 31 August 2026.

**Recheck before release:** subsequent NVIDIA filings; supplier relationships; all leadership roles; and any claim that describes announced capacity as currently available.
