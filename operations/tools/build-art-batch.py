#!/usr/bin/env python3
"""Prepare episode art prompts from explicitly selected current references.

Existing five positional inputs are retained. --dimensions and --reference-ids
are now required: the old global style and filename-approval guesses are removed.
This prepares prompts only; it neither renders nor admits reuse/publication.
"""
import argparse
import hashlib
import json
import math
import re
from pathlib import Path
from visual_reference_binding import MARKER, make, safe_file

ROOT = Path(__file__).resolve().parents[2]


def build(root, cues_path, timing_path, needed_path, episode, dimensions, reference_ids):
    if not re.fullmatch(r'\d{1,2}', episode):
        raise ValueError('episode must be a one- or two-digit number')
    episode = episode.zfill(2)
    canon = safe_file(root, 'content/episodes/episode-' + episode + '.canon.md')
    canon_text = canon.read_text()
    if not re.search(r'^## cast\[\]\s*$', canon_text, re.M):
        raise ValueError('episode canon has no cast[]; recover intended subjects first')
    cast_match = re.search(r'^## cast\[\]\s*$(.*?)(?=^## |\Z)', canon_text, re.S | re.M)
    people = {m[0]: (m[1], m[2]) for m in re.findall(r'^\|\s*([a-z0-9-]+)\s*\|\s*(.+?)\s*\|\s*([a-z0-9-]+)\s*\|\s*$', cast_match[1], re.M) if m[0] != '---'}
    if not people:
        raise ValueError('episode canon cast[] has no usable subjects')
    cut_file = Path(root) / ('operations/ep' + episode + '-cut-decisions.md')
    covered = set()
    if cut_file.exists():
        covered = {round(int(m)*60 + float(sec), 2) for m, sec in re.findall(r'^\|\s*(\d{1,2}):(\d{2}\.\d{2})\s*\|\s*`?[\w.-]+`?\s*\|', cut_file.read_text(), re.M)}
    requirements = safe_file(root, 'operations/art-requirements.md')
    inputs = [Path(cues_path), Path(timing_path), Path(needed_path)]
    cues, timing, needed = [json.loads(p.read_text()) for p in inputs]
    cues = cues.get('cues') if isinstance(cues, dict) else cues
    if not isinstance(cues, list) or not isinstance(needed, list) or not needed:
        raise ValueError('cues and needed beats must be lists; select at least one beat')
    if not isinstance(timing, (dict, list)):
        raise ValueError('timing map must be an object or list')
    binding, refs = make(root, 'episode-' + episode + '-art-batch', dimensions, reference_ids)
    binding['batch_inputs'] = {key: str(p.resolve().relative_to(Path(root).resolve())) for key, p in zip(('cues','timing','needed'), inputs)}
    binding['episode'] = episode
    if not any(r['role'] == 'master_people_rendering_style_and_heroine_identity' for r in refs):
        raise ValueError('episode batch requires its current people-rendering master')
    ids = {r['id'] for r in refs}
    lines = ['# Episode ' + episode + ' — generation prompt batch', '',
             MARKER + json.dumps(binding, sort_keys=True), '',
             'Output dimensions: %s × %s (explicit destination input, not a universal art rule).' % tuple(dimensions),
             'Status: PREPARED INPUTS ONLY — NOT RENDERED, REVIEWED OR ADMITTED FOR REUSE.', '',
             '## Current shared requirements', requirements.read_text().strip(), '',
             '## Bound episode canon',
             '`content/episodes/episode-' + episode + '.canon.md` SHA256 ' + hashlib.sha256(canon.read_bytes()).hexdigest(),
             'Read the current scene/cast/outfit sections; preserve corporate versus SUNNYVAiLE context.', '',
             '## Selected generation references']
    for ref in refs:
        lines.append('- %s · %s · `%s` · SHA256 %s\n  Scope: %s' % (ref['id'], ref['role'], ref['path'], ref['sha256'], ref['scope']))
    lines += ['', 'Identity and composition must match the intended subject and scene; this binding verifies files, not that semantic judgment.', '', '## Timing inputs']
    for p in inputs:
        lines.append('- `%s` SHA256 %s' % (p.name, hashlib.sha256(p.read_bytes()).hexdigest()))
    seen = set()
    for i, beat in enumerate(needed, 1):
        if not isinstance(beat, dict) or type(beat.get('t')) not in (int, float) or type(beat.get('dur')) not in (int, float):
            raise ValueError('each needed beat requires numeric t and dur')
        if not math.isfinite(beat['t']) or not math.isfinite(beat['dur']) or beat['t'] < 0 or beat['dur'] <= 0 or beat['t'] in seen:
            raise ValueError('beat timing must be unique, nonnegative and have positive duration')
        if round(beat['t'], 2) in covered:
            raise ValueError('beat is already covered in cut decisions; reconcile reuse before commissioning again')
        seen.add(beat['t'])
        selected = beat.get('reference_ids', reference_ids)
        if not isinstance(selected, list) or not selected or any(x not in ids for x in selected):
            raise ValueError('beat references must select bound current IDs')
        if not any(r['id'] in selected and r['role'] == 'master_people_rendering_style_and_heroine_identity' for r in refs):
            raise ValueError('each episode beat requires the current people-rendering master')
        subjects = beat.get('subjects')
        if not isinstance(subjects, list):
            raise ValueError('declare subjects explicitly (empty only for a scene depicting no people)')
        for subject in subjects:
            if not isinstance(subject, dict):
                raise ValueError('each subject must be an explicit identity binding')
            identity = next((r for r in refs if r['id'] == subject.get('identity_reference_id') and r['id'] in selected), None)
            if not identity or identity['role'] not in ('character_identity', 'master_people_rendering_style_and_heroine_identity'):
                raise ValueError('subject requires an explicitly bound eligible identity reference')
            # Canon cast table points to real-person reference folders. Bind an exact
            # source, not the mere existence of an image elsewhere in the cut.
            if identity['role'] == 'master_people_rendering_style_and_heroine_identity' and subject.get('cast_key') == 'heroine':
                continue
            if identity['role'] != 'character_identity':
                raise ValueError('real subject needs its own identity reference, not the heroine master')
            if subject.get('cast_key') not in people:
                raise ValueError('real subject must name its canonical cast_key')
            slug = people[subject['cast_key']][1]
            source = subject.get('likeness_source')
            if not isinstance(source, dict) or not str(source.get('path', '')).startswith('operations/reference/real-people/' + slug + '/'):
                raise ValueError('cast subject requires its exact canonical likeness source')
            image = safe_file(root, source['path'])
            if image.suffix.lower() not in ('.png', '.jpg', '.jpeg', '.webp') or hashlib.sha256(image.read_bytes()).hexdigest() != source.get('sha256'):
                raise ValueError('likeness source missing or changed')
        continuity = beat.get('continuity_reference_ids')
        if not isinstance(continuity, list) or not continuity or any(x not in selected for x in continuity):
            raise ValueError('beat requires explicit bound continuity reference IDs; recover scene authority first')
        for field in ('scene', 'wardrobe', 'continuity_job'):
            if not isinstance(beat.get(field), str) or not beat[field].strip():
                raise ValueError('beat requires explicit ' + field)
        says = beat.get('says')
        if not isinstance(says, list) or not says or any(not isinstance(x, list) or len(x) != 2 or not all(isinstance(y, str) for y in x) for x in says):
            raise ValueError('each beat requires exact speaker/text pairs in says')
        lines += ['', '## Beat %s · time %s · duration %s' % (i, beat['t'], beat['dur']),
                  'Reference IDs: ' + ', '.join(selected),
                  'Scene: ' + beat['scene'], 'Wardrobe: ' + beat['wardrobe'],
                  'Continuity: ' + ', '.join(continuity) + ' — ' + beat['continuity_job'],
                  'Declared subjects and exact likeness sources: ' + json.dumps(subjects, sort_keys=True),
                  'Exact narration:']
        lines.extend('> %s: %s' % tuple(x) for x in says)
        # Cue labels supply timing context only. No src filename becomes an approved reference.
        nearby = [c for c in cues if isinstance(c, dict) and type(c.get('t')) in (int, float)]
        before = sorted([c for c in nearby if c['t'] <= beat['t']], key=lambda c:c['t'])
        after = sorted([c for c in nearby if c['t'] > beat['t']], key=lambda c:c['t'])
        lines.append('Timing context only (not approved image selection):')
        for label, cue in [('before', before[-1] if before else None), ('after', after[0] if after else None)]:
            if cue: lines.append('- %s: %s · %s' % (label, cue['t'], str(cue.get('label', 'unlabelled'))))
        lines.append('Producer must bind the actual scene/identity, required real-person likeness, location, wardrobe, continuity and motion before rendering. Missing authority is a hold; do not infer it from wired or similarly named images.')
    return '\n'.join(lines) + '\n'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ['cues', 'timing', 'needed', 'episode', 'output']:
        parser.add_argument(name)
    parser.add_argument('--dimensions', required=True, help='Explicit output WIDTHxHEIGHT for this destination')
    parser.add_argument('--reference-ids', nargs='+', required=True, help='Selected IDs from the current episode-approved manifest')
    args = parser.parse_args()
    try:
        match = re.fullmatch(r'(\d+)[x×](\d+)', args.dimensions)
        if not match: raise ValueError('dimensions must be WIDTHxHEIGHT')
        text = build(ROOT, args.cues, args.timing, args.needed, args.episode,
                     [int(match[1]), int(match[2])], args.reference_ids)
        # Validate fully before touching an existing output.
        Path(args.output).write_text(text)
    except (ValueError, OSError, KeyError, TypeError) as error:
        parser.exit(1, 'ART BATCH HOLD: ' + str(error) + '\n')
    print('ART BATCH PREPARED: exact reference inputs only; quality and publication are not admitted')


if __name__ == '__main__':
    main()
