#!/usr/bin/env python3
"""Check current generation-reference bindings in art prompt writes.

Uses the same resolver as the batch producer. No global style/dimension sentinels,
filename exemptions, render-quality claim or automatic publication permission.
Native registration/trust is separate from direct fixture verification.
"""
import json
import importlib.util
import re
import sys
from pathlib import Path

base = Path(__file__).resolve().parents[2]
site = base if (base / 'operations/tools/visual_reference_binding.py').is_file() else base / 'Website-homepage'


def deny(reason):
    print(json.dumps({'hookSpecificOutput': {'hookEventName': 'PreToolUse', 'permissionDecision': 'deny',
          'permissionDecisionReason': 'ART PROMPT HOLD: ' + reason + '. Start at operations/reference/README.md; select current generation references, explicit destination and output dimensions. This is not public-use admission.'}}))


def main():
    try: data = json.load(sys.stdin)
    except (ValueError, OSError): return
    if data.get('tool_name') not in ('Write', 'Edit', 'NotebookEdit'): return
    inp = data.get('tool_input') or {}
    filename = str(inp.get('file_path') or '')
    if 'codex-prompts' not in Path(filename).parts or not filename.endswith('.md'): return
    body = str(inp.get('content') or '')
    try:
        if data['tool_name'] != 'Write':
            original = Path(filename).read_text()
            old, new = inp.get('old_string'), inp.get('new_string')
            if not isinstance(old, str) or not old or not isinstance(new, str) or old not in original:
                raise ValueError('cannot validate the resulting prompt from this edit')
            body = original.replace(old, new) if inp.get('replace_all') else original.replace(old, new, 1)
        # This consumer validates episode batches only. Other destinations
        # retain their own authority; do not impose episode identity rules on cards.
        episode_prompt = re.search(r'(?:^|[/_-])ep(?:isode)?[-_]?\d{1,2}(?:[/_.-]|$)', filename, re.I) or 'VISUAL_REFERENCE_BINDING:' in body
        if not episode_prompt: return
        if not re.search(r'\b(generate|render|image|artwork|illustration|frame|storyboard|draw|paint|visual)\b|VISUAL_REFERENCE_BINDING:', body, re.I): return
        sys.path.insert(0, str(site / 'operations/tools'))
        from visual_reference_binding import extract, resolve, safe_file
        binding = extract(body)
        resolve(site, binding)
        inputs = binding.get('batch_inputs')
        if not isinstance(inputs, dict):
            raise ValueError('episode prompt must be generated from the validated batch inputs')
        spec = importlib.util.spec_from_file_location('episode_art_batch', site / 'operations/tools/build-art-batch.py')
        batch = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(batch)
        expected = batch.build(site, *(safe_file(site, inputs[k]) for k in ('cues','timing','needed')), binding['episode'], binding['dimensions'], binding['reference_ids'])
        if body != expected:
            raise ValueError('episode prompt differs from validated current batch; update its inputs and rebuild')
    except (ValueError, OSError, TypeError, ImportError, KeyError) as error:
        deny(str(error))


if __name__ == '__main__':
    main()
